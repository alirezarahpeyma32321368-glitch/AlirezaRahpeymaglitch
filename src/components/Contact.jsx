import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Reveal from './Reveal';

const info = [
  { icon: MapPin, label: 'آدرس', value: 'تهران، خیابان نمونه، پلاک ۱۲۳' },
  { icon: Phone, label: 'شماره تماس', value: '۰۲۱-۱۲۳۴۵۶۷۸' },
  { icon: Mail, label: 'ایمیل', value: 'info@fireburger.ir' },
];

const hours = ['شنبه تا پنجشنبه: ۱۱ صبح تا ۱۱ شب', 'جمعه: ۱۲ ظهر تا ۱۲ شب'];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', contact: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-black sm:text-4xl">با ما در ارتباط باشید</h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Info */}
          <Reveal>
            <div className="space-y-4">
              {info.map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-dark-800 p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-fire-red/10 text-fire-red">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray">{item.label}</p>
                    <p className="mt-0.5 text-sm font-bold" dir={item.label === 'ایمیل' || item.label === 'شماره تماس' ? 'ltr' : 'rtl'}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-dark-800 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-fire-red/10 text-fire-red">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray">ساعات کاری</p>
                  {hours.map((h) => (
                    <p key={h} className="mt-0.5 text-sm font-bold">{h}</p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/5 bg-dark-800 p-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-light">نام شما</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="نام شما"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-light">ایمیل یا شماره موبایل</label>
                  <input
                    type="text"
                    required
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="ایمیل یا شماره موبایل"
                    className="input-dark"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-light">پیام شما</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="پیام شما"
                    rows={4}
                    className="input-dark resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  {sent ? 'پیام ارسال شد ✓' : 'ارسال پیام'}
                  {!sent && <Send size={18} />}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
