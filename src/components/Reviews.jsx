import { Star, Quote } from 'lucide-react';
import Reveal from './Reveal';

const reviews = [
  { text: 'واقعاً یکی از بهترین برگرهایی بود که خوردم. هم تازه بود، هم خیلی خوش‌طعم.', name: 'سارا' },
  { text: 'پیتزا فوق‌العاده بود و خیلی سریع به دستم رسید.', name: 'محمد' },
  { text: 'کیفیت غذا و بسته‌بندی واقعاً عالی بود.', name: 'علی' },
];

export default function Reviews() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-black sm:text-4xl">مشتریان درباره ما چه می‌گویند؟</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card-dark h-full p-6">
                <Quote size={32} className="mb-3 text-fire-red/30" />
                <p className="text-sm leading-7 text-gray-light">{r.text}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-bold">{r.name}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={16} className="fill-fire-orange text-fire-orange" />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
