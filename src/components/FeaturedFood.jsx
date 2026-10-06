import { ArrowLeft } from 'lucide-react';
import Reveal from './Reveal';

export default function FeaturedFood() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pizzas" className="section-padding">
      <div className="container-max grid items-center gap-8 md:grid-cols-2 md:gap-12">
        {/* Image */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7e7491c4e45e?w=1000&q=85&auto=format&fit=crop"
              alt="پیتزای مخصوص MERCADO FASTFOOD"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent" />
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={150}>
          <div className="text-center md:text-right">
            <span className="text-sm font-bold text-fire-orange">پیتزاهای مخصوص</span>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">برای هوس‌های جدی</h2>
            <p className="mt-4 text-sm leading-7 text-gray md:text-base">
              پیتزاهای داغ و تازه با خمیر مخصوص، پنیر کش‌دار و مواد اولیه باکیفیت.
            </p>
            <button onClick={() => scrollTo('menu')} className="btn-primary mt-7">
              مشاهده پیتزاها
              <ArrowLeft size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
