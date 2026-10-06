import { Heart, Plus } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import Reveal from './Reveal';

export default function FeaturedMenu({ onProductClick }) {
  const { addToCart, favorites, toggleFavorite } = useCart();
  const featured = products.filter((p) => p.popular).slice(0, 6);

  return (
    <section id="burgers" className="section-padding">
      <div className="container-max">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-black sm:text-4xl">محبوب‌ترین انتخاب‌ها</h2>
          <p className="mt-3 text-sm text-gray md:text-base">
            انتخابت را پیدا کن و طعم واقعی را تجربه کن.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <div
                className="card-dark group flex h-full cursor-pointer flex-col overflow-hidden hover:border-fire-red/20 hover:shadow-[0_8px_40px_rgba(255,59,48,0.08)]"
                onClick={() => onProductClick(product)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-dark-950/70 backdrop-blur-sm transition-colors"
                    aria-label="افزودن به علاقه‌مندی"
                  >
                    <Heart
                      size={18}
                      className={favorites.has(product.id) ? 'fill-fire-red text-fire-red' : 'text-white'}
                    />
                  </button>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-gray">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-fire-orange">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-fire-red px-4 py-2 text-sm font-bold text-white transition-all hover:bg-fire-red-dark active:scale-95"
                    >
                      <Plus size={16} />
                      افزودن به سبد
                    </button>
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
