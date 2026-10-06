import { useState, useMemo, useRef } from 'react';
import { Search, Heart, Plus, SlidersHorizontal } from 'lucide-react';
import { products, categories, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import Reveal from './Reveal';

const sortOptions = [
  { value: 'popular', label: 'محبوب‌ترین' },
  { value: 'cheap', label: 'ارزان‌ترین' },
  { value: 'expensive', label: 'گران‌ترین' },
];

export default function MenuFilter({ onProductClick }) {
  const { addToCart, favorites, toggleFavorite } = useCart();
  const [activeCat, setActiveCat] = useState('همه');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const searchRef = useRef(null);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCat !== 'همه') result = result.filter((p) => p.category === activeCat);
    if (search.trim()) {
      const q = search.trim();
      result = result.filter(
        (p) => p.name.includes(q) || p.description.includes(q),
      );
    }
    result = [...result].sort((a, b) => {
      if (sortBy === 'cheap') return a.price - b.price;
      if (sortBy === 'expensive') return b.price - a.price;
      return b.rating - a.rating;
    });
    return result;
  }, [activeCat, search, sortBy]);

  return (
    <section id="menu" className="section-padding">
      <div className="container-max">
        <Reveal className="mb-8 text-center">
          <h2 className="text-3xl font-black sm:text-4xl">منوی کامل ما</h2>
          <p className="mt-3 text-sm text-gray md:text-base">
            غذای مورد نظر خود را پیدا کنید و سفارش دهید
          </p>
        </Reveal>

        {/* Search + Sort */}
        <Reveal className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="غذای مورد نظر خود را جستجو کنید..."
              className="input-dark pr-11"
            />
          </div>
          <div className="relative sm:w-44">
            <SlidersHorizontal size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-dark cursor-pointer appearance-none pr-11"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-dark-800">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </Reveal>

        {/* Category Filter */}
        <Reveal className="mb-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                activeCat === cat
                  ? 'bg-fire-red text-white shadow-[0_0_20px_rgba(255,59,48,0.3)]'
                  : 'border border-white/10 bg-dark-800 text-gray hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray">
            <p className="text-lg">نتیجه‌ای یافت نشد</p>
            <p className="mt-2 text-sm">کلمه دیگری را جستجو کنید</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 80}>
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
                    <span className="absolute top-3 right-3 rounded-full bg-dark-950/70 px-3 py-1 text-xs font-bold text-gray-light backdrop-blur-sm">
                      {product.category}
                    </span>
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
        )}
      </div>
    </section>
  );
}
