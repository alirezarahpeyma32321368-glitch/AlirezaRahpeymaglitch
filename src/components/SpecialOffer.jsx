import { ArrowLeft, Flame } from 'lucide-react';
import Reveal from './Reveal';

export default function SpecialOffer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-fire-red/20">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1400&q=85&auto=format&fit=crop"
              alt="پیشنهاد ویژه فایر برگر"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-dark-950/95 via-dark-950/80 to-dark-950/40" />
            <div className="relative flex min-h-[320px] flex-col justify-center p-8 md:min-h-[400px] md:p-16">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-fire-red/20 px-4 py-1.5 text-sm font-bold text-fire-red">
                <Flame size={16} fill="currentColor" />
                پیشنهاد ویژه
              </div>
              <h2 className="text-4xl font-black sm:text-5xl">دو برابرش کن!</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-gray-light md:text-base">
                برگر دوبل با پنیر بیشتر، گوشت بیشتر و طعمی که نمی‌توانی فراموشش کنی.
              </p>
              <button onClick={() => scrollTo('menu')} className="btn-primary mt-7 w-fit">
                مشاهده پیشنهاد ویژه
                <ArrowLeft size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
