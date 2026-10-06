import { Leaf, Flame, Truck, Clock } from 'lucide-react';
import Reveal from './Reveal';

const features = [
  { icon: Leaf, title: 'مواد اولیه تازه', desc: 'هر روز با مواد تازه آماده می‌کنیم.' },
  { icon: Flame, title: 'پخت حرفه‌ای', desc: 'طعم واقعی گریل و فر را تجربه کنید.' },
  { icon: Truck, title: 'ارسال سریع', desc: 'غذای شما داغ و سریع به دستتان می‌رسد.' },
  { icon: Clock, title: 'تازه و سفارشی', desc: 'هر سفارش درست بعد از ثبت شما آماده می‌شود.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-black sm:text-4xl">چرا فایر برگر؟</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="card-dark h-full p-6 text-center hover:border-fire-red/20">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-fire-red/10 text-fire-red">
                  <f.icon size={26} />
                </div>
                <h3 className="text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
