import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedFood from './components/FeaturedFood';
import FeaturedMenu from './components/FeaturedMenu';
import MenuFilter from './components/MenuFilter';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import SpecialOffer from './components/SpecialOffer';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import Checkout from './components/Checkout';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <CartProvider>
      <Header onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <FeaturedFood />
        <FeaturedMenu onProductClick={setSelectedProduct} />
        <MenuFilter onProductClick={setSelectedProduct} />
        <WhyChooseUs />
        <About />
        <SpecialOffer />
        <Reviews />
        <Gallery />
        <Contact />
      </main>
      <Footer />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </CartProvider>
  );
}

export default App;
