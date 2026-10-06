import { galleryImages } from '../data/products';
import Reveal from './Reveal';

export default function Gallery() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-black sm:text-4xl">یک نگاه به طعم‌های ما</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="p-4 text-sm font-bold">{img.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
