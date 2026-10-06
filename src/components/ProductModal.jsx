import { useState, useEffect } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { formatPrice, extras } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra],
    );
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalPrice = (product.price + extrasTotal) * quantity;

  const handleAdd = () => {
    addToCart(product, quantity, selectedExtras);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-dark-800 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-dark-950/70 text-white backdrop-blur-sm transition-colors hover:bg-fire-red"
          aria-label="بستن"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-56 overflow-hidden md:h-auto">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent md:bg-gradient-to-l" />
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-xl font-black md:text-2xl">{product.name}</h2>
            <p className="mt-2 text-sm leading-6 text-gray">{product.description}</p>

            {/* Ingredients */}
            <div className="mt-4">
              <h3 className="text-sm font-bold text-gray-light">مواد تشکیل‌دهنده:</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="rounded-full bg-dark-700 px-3 py-1 text-xs text-gray-light">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="mt-5">
              <h3 className="text-sm font-bold text-gray-light">گزینه‌های اضافه:</h3>
              <div className="mt-2 space-y-2">
                {extras.map((extra) => (
                  <label
                    key={extra.id}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-dark-700 px-4 py-2.5 transition-colors hover:border-white/20"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                          selectedExtras.some((e) => e.id === extra.id)
                            ? 'border-fire-red bg-fire-red'
                            : 'border-white/30'
                        }`}
                      >
                        {selectedExtras.some((e) => e.id === extra.id) && <Check size={14} className="text-white" />}
                      </span>
                      <span className="text-sm">{extra.name}</span>
                    </span>
                    <span className="text-xs font-bold text-fire-orange">+{formatPrice(extra.price)}</span>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedExtras.some((e) => e.id === extra.id)}
                      onChange={() => toggleExtra(extra)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity + Price + Button */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-dark-700 px-2 py-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                  aria-label="کاهش"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold">{new Intl.NumberFormat('fa-IR').format(quantity)}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                  aria-label="افزایش"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm font-bold text-fire-orange">{formatPrice(totalPrice)}</span>
            </div>

            <button onClick={handleAdd} className="btn-primary mt-5 w-full">
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
