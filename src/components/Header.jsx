import { useEffect, useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

const LOGO_URL = 'https://media.base44.com/images/public/6ac55b7d1207d4ba495cf109/b7bc3765e_ChatGPTImage__.png';
import { useCart } from '../context/CartContext';

const navItems = [
  { label: 'خانه', target: 'home' },
  { label: 'منو', target: 'menu' },
  { label: 'برگرها', target: 'burgers' },
  { label: 'پیتزاها', target: 'pizzas' },
  { label: 'درباره ما', target: 'about' },
  { label: 'تماس با ما', target: 'contact' },
];

export default function Header({ onCartClick }) {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.target)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-dark-950/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-max flex h-16 items-center justify-between px-5 md:h-20 md:px-8">
          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="flex items-center">
            <img src={LOGO_URL} alt="MERCADO FASTFOOD" className="h-11 rounded-xl bg-white p-1" />
          </button>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => scrollTo(item.target)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.target
                      ? 'bg-white/10 text-white'
                      : 'text-gray hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => scrollTo('menu')}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-gray transition-colors hover:bg-white/10 hover:text-white sm:flex"
              aria-label="جستجو"
            >
              <Search size={20} />
            </button>
            <button
              onClick={onCartClick}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray transition-colors hover:bg-white/10 hover:text-white"
              aria-label="سبد خرید"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-fire-red px-1 text-[10px] font-bold text-white">
                  {new Intl.NumberFormat('fa-IR').format(cartCount)}
                </span>
              )}
            </button>
            <button onClick={() => scrollTo('menu')} className="btn-primary hidden text-sm md:flex">
              سفارش آنلاین
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="منو"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[80vw] border-l border-white/10 bg-dark-900 p-5 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <img src={LOGO_URL} alt="MERCADO FASTFOOD" className="h-11 rounded-xl bg-white p-1" />
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray hover:bg-white/10"
              aria-label="بستن"
            >
              <X size={22} />
            </button>
          </div>
          <ul className="mt-8 space-y-1">
            {navItems.map((item) => (
              <li key={item.target}>
                <button
                  onClick={() => scrollTo(item.target)}
                  className={`block w-full rounded-xl px-4 py-3 text-right text-base font-medium transition-colors ${
                    activeSection === item.target
                      ? 'bg-fire-red/15 text-fire-red'
                      : 'text-gray hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollTo('menu')}
            className="btn-primary mt-6 w-full"
          >
            سفارش آنلاین
          </button>
        </div>
      </div>
    </>
  );
}
