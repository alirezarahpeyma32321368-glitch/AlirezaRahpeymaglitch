import Reveal from './Reveal';

const stats = [
  { value: '۱۰+ سال تجربه' },
  { value: '۵۰ هزار+ سفارش' },
  { value: '۴.۹ از ۵ امتیاز مشتریان' },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black sm:text-4xl">داستان ما</h2>
          <p className="mt-5 text-sm leading-8 text-gray md:text-base">
            MERCADO FASTFOOD با یک هدف ساده شروع شد؛ اینکه یک غذای سریع، فقط سریع نباشد، بلکه خوش‌طعم، تازه و باکیفیت باشد.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card-dark p-8 text-center">
                <p className="text-xl font-black text-gradient-fire md:text-2xl">{s.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
