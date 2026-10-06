import { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function Cart({ open, onClose, onCheckout }) {
  const { items, removeFromCart, updateQuantity, cartTotal, deliveryFee, finalTotal } = useCart();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-[65] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute left-0 top-0 flex h-full w-full max-w-md flex-col border-r border-white/10 bg-dark-900 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <ShoppingBag size={22} />
            سبد خرید
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray transition-colors hover:bg-white/10 hover:text-white"
            aria-label="بستن"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag size={48} className="text-white/20" />
            <p className="text-gray">سبد خرید شما خالی است</p>
            <button onClick={onClose} className="btn-outline mt-2">
              مشاهده منو
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-2xl border border-white/5 bg-dark-800 p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-bold">{item.product.name}</h3>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-gray transition-colors hover:text-fire-red"
                        aria-label="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {item.extras.length > 0 && (
                      <p className="mt-1 text-xs text-gray">
                        {item.extras.map((e) => e.name).join('، ')}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 px-1.5 py-1">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-white hover:bg-white/10"
                          aria-label="کاهش"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">
                          {new Intl.NumberFormat('fa-IR').format(item.quantity)}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full text-white hover:bg-white/10"
                          aria-label="افزایش"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-fire-orange">
                        {formatPrice(
                          (item.product.price + item.extras.reduce((s, e) => s + e.price, 0)) * item.quantity,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-white/10 p-5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray">
                  <span>جمع سفارش</span>
                  <span className="text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray">
                  <span>هزینه ارسال</span>
                  <span className="text-white">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-base font-bold">
                  <span>مبلغ نهایی</span>
                  <span className="text-fire-orange">{formatPrice(finalTotal)}</span>
                </div>
              </div>
              <button onClick={onCheckout} className="btn-primary mt-4 w-full">
                ادامه و پرداخت
                <ArrowLeft size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
