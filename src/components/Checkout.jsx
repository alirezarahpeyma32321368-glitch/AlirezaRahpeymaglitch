import { useState, useEffect } from 'react';
import { X, CheckCircle2, CreditCard, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function Checkout({ open, onClose }) {
  const { items, cartTotal, deliveryFee, finalTotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [payment, setPayment] = useState('online');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postal: '',
  });

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else {
      document.body.style.overflow = '';
      setSubmitted(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = 'FB-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(new Intl.NumberFormat('fa-IR').format(parseInt(num.slice(3))));
    setSubmitted(true);
    clearCart();
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={handleClose} />

      {submitted ? (
        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-dark-800 p-8 text-center animate-scale-in">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-fire-red/15">
            <CheckCircle2 size={48} className="text-fire-red" />
          </div>
          <h2 className="text-2xl font-black">سفارش شما با موفقیت ثبت شد</h2>
          <p className="mt-3 text-sm text-gray">غذای شما در حال آماده‌سازی است.</p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-dark-700 p-4">
            <p className="text-xs text-gray">شماره سفارش</p>
            <p className="mt-1 text-xl font-black text-fire-orange">#{orderNumber}</p>
          </div>
          <button onClick={handleClose} className="btn-primary mt-6 w-full">
            بازگشت به صفحه اصلی
          </button>
        </div>
      ) : (
        <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-dark-800 p-6 animate-scale-in">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black">تکمیل سفارش</h2>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray transition-colors hover:bg-white/10 hover:text-white"
              aria-label="بستن"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-light">نام و نام خانوادگی</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="نام و نام خانوادگی"
                className="input-dark"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-light">شماره موبایل</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="input-dark"
                dir="ltr"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-light">آدرس</label>
              <textarea
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="آدرس کامل"
                rows={2}
                className="input-dark resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-light">شهر</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="شهر"
                  className="input-dark"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-light">کد پستی</label>
                <input
                  type="text"
                  required
                  value={form.postal}
                  onChange={(e) => setForm({ ...form, postal: e.target.value })}
                  placeholder="کد پستی"
                  className="input-dark"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Payment */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-light">روش پرداخت</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPayment('online')}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-colors ${
                    payment === 'online'
                      ? 'border-fire-red bg-fire-red/10 text-fire-red'
                      : 'border-white/10 bg-dark-700 text-gray hover:text-white'
                  }`}
                >
                  <CreditCard size={18} />
                  پرداخت آنلاین
                </button>
                <button
                  type="button"
                  onClick={() => setPayment('cod')}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-colors ${
                    payment === 'cod'
                      ? 'border-fire-red bg-fire-red/10 text-fire-red'
                      : 'border-white/10 bg-dark-700 text-gray hover:text-white'
                  }`}
                >
                  <Truck size={18} />
                  پرداخت در محل
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-white/10 bg-dark-700 p-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray">
                  <span>جمع سفارش</span>
                  <span className="text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray">
                  <span>هزینه ارسال</span>
                  <span className="text-white">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-1.5 font-bold">
                  <span>مبلغ نهایی</span>
                  <span className="text-fire-orange">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              ثبت سفارش
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
