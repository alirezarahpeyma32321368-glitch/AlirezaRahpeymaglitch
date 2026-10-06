import { Flame, ArrowLeft } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative overflow-hidden pt-16 md:pt-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-fire-red/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-fire-orange/10 blur-[100px]" />
      </div>

      <div className="container-max relative grid items-center gap-8 px-5 py-12 md:grid-cols-2 md:px-8 md:py-20 lg:gap-12 lg:py-28">
        {/* Text */}
        <div className="order-2 text-center md:order-1 md:text-right">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fire-red/30 bg-fire-red/10 px-4 py-1.5 text-sm font-medium text-fire-red">
            <Flame size={16} fill="currentColor" />
            <span>طعم آتشین فایر برگر</span>
          </div>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            طعم آتشین،
            <br />
            <span className="text-gradient-fire">لذت واقعی</span>
          </h1>
          <p className="mt-4 text-lg font-semibold text-gray-light">
            برگر و پیتزای تازه، با طعمی که فراموشش نمی‌کنید
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray md:mx-0">
            با بهترین مواد اولیه، گوشت تازه و سس‌های مخصوص، هر سفارش با عشق و تازه برای شما آماده می‌شود.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <button onClick={() => scrollTo('menu')} className="btn-primary w-full sm:w-auto">
              همین حالا سفارش بده
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => scrollTo('menu')} className="btn-outline w-full sm:w-auto">
              مشاهده منو
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative order-1 md:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-fire-red/30 via-fire-orange/15 to-transparent blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&q=85&auto=format&fit=crop"
              alt="برگر ویژه فایر برگر"
              className="relative z-10 h-full w-full rounded-full object-cover shadow-2xl"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
