import { Instagram, Send, MessageCircle } from 'lucide-react';

const LOGO_URL = 'https://media.base44.com/images/public/6ac55b7d1207d4ba495cf109/b7bc3765e_ChatGPTImage__.png';

const columns = [
  {
    title: 'دسترسی سریع',
    links: ['خانه', 'منو', 'درباره ما', 'تماس با ما'],
  },
  {
    title: 'دسته‌بندی‌ها',
    links: ['برگرها', 'پیتزاها', 'پیش‌غذاها', 'نوشیدنی‌ها', 'دسرها'],
  },
  {
    title: 'خدمات مشتریان',
    links: ['سؤالات متداول', 'پیگیری سفارش', 'قوانین و مقررات', 'حریم خصوصی'],
  },
];

const socials = [
  { icon: Instagram, label: 'اینستاگرام' },
  { icon: Send, label: 'تلگرام' },
  { icon: MessageCircle, label: 'واتساپ' },
];

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-white/10 bg-dark-950 px-5 pb-8 pt-16 md:px-8">
      <div className="container-max">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <img src={LOGO_URL} alt="MERCADO FASTFOOD" className="h-12 rounded-xl bg-white p-1" />
            <p className="mt-3 text-sm text-gray">طعم واقعی، یک گاز تا هیجان</p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-dark-800 text-gray transition-colors hover:border-fire-red hover:text-fire-red"
                >
                  <s.icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-gray-light">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const map = { 'خانه': 'home', 'منو': 'menu', 'درباره ما': 'about', 'تماس با ما': 'contact' };
                        scrollTo(map[link] || 'menu');
                      }}
                      className="text-sm text-gray transition-colors hover:text-white"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray">© ۱۴۰۵ MERCADO FASTFOOD - تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
