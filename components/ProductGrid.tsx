import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';
import { PRODUCTS_EN, PRODUCTS_VI, SeasonalProduct } from '../data/products';

type FilterType = 'candles' | 'oils' | 'accessories';
type CollectionType = 'limited' | 'signature';

const ProductGrid: React.FC = () => {
  const { t, language, formatPrice } = useLanguage();
  const { addItem } = useCart();
  const products = language === 'vi' ? PRODUCTS_VI : PRODUCTS_EN;
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  
  // Collection Tab State (Top Section)
  const [activeCollection, setActiveCollection] = useState<CollectionType>('limited');
  
  // Shop Essentials Filter State (Bottom Section)
  const [activeFilter, setActiveFilter] = useState<FilterType>('candles');

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  // Logic for Top Section (Featured Collections)
  const showcaseProducts = products.filter(p => p.category === activeCollection);

  // Logic for Bottom Section (Essentials)
  let essentialProducts: SeasonalProduct[] = [];
  if (activeFilter === 'candles') {
     // Show all candles (Signature + Limited + Seasonal)
     essentialProducts = products.filter(p => p.category === 'signature' || p.category === 'limited' || p.category === 'seasonal');
  } else if (activeFilter === 'oils') {
     essentialProducts = products.filter(p => p.category === 'essential_oil');
  } else if (activeFilter === 'accessories') {
     essentialProducts = products.filter(p => p.category === 'accessory');
  }

  const ProductCard: React.FC<{ product: SeasonalProduct }> = ({ product }) => (
    <div 
      className="group cursor-pointer flex flex-col outline-none animate-fade-in" 
      onClick={() => setSelectedProduct(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedProduct(product);
        }
      }}
    >
      {/* Image Card - Ultra Clean */}
      <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] mb-6 shadow-sm bg-white group-focus:ring-2 group-focus:ring-brand-dark group-focus:ring-offset-4 transition-all">
          <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500"></div>
        
        {/* Quick Action Buttons - Appear on hover */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
           {/* Quick View */}
           <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 bg-white/90 backdrop-blur-md text-stone-800 py-3 rounded-full font-medium text-sm hover:bg-white transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {t('product.quickView')}
          </button>

          {/* Quick Add */}
          <button
            onClick={(e) => handleAddToCart(e, product)}
            disabled={addedProductId === product.id}
            className={`flex-1 py-3 rounded-full font-medium text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
              addedProductId === product.id 
              ? 'bg-brand-olive text-white' 
              : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {addedProductId === product.id ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
            {addedProductId === product.id ? '' : '+'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-2">
        <h3 className="font-serif text-xl text-stone-900">{product.name}</h3>
        <p className="text-stone-500 text-sm line-clamp-1 font-light">{product.description}</p>
        <div className="pt-2 flex items-center justify-center gap-2">
           <span className="font-medium text-stone-900">{formatPrice(product.price, product.priceVND)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="collections" className="py-24 px-6 bg-stone-50">
      <div className="container mx-auto">
        
        {/* PART 1: FEATURED COLLECTIONS TAB SYSTEM */}
        <div id="featured-collection" className="mb-32 scroll-mt-28">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-stone-500 text-xs font-bold tracking-[0.25em] uppercase block mb-6">{t('products.section.featured')}</span>
            
            {/* Collection Tabs */}
            <div className="flex justify-center gap-8 mb-10 border-b border-stone-200 pb-4 max-w-2xl mx-auto">
                <button 
                    onClick={() => setActiveCollection('limited')}
                    className={`text-2xl md:text-4xl font-serif transition-colors duration-300 ${activeCollection === 'limited' ? 'text-brand-dark border-b-2 border-brand-dark pb-4 -mb-4.5' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    {t('collection.limited.title')}
                </button>
                <span className="text-3xl text-stone-300 font-serif italic">&</span>
                <button 
                    onClick={() => setActiveCollection('signature')}
                    className={`text-2xl md:text-4xl font-serif transition-colors duration-300 ${activeCollection === 'signature' ? 'text-brand-dark border-b-2 border-brand-dark pb-4 -mb-4.5' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    {t('collection.signature.title')}
                </button>
            </div>

            <p className="text-stone-500 max-w-xl mx-auto text-lg font-light min-h-[3.5rem]">
                {activeCollection === 'limited' ? t('collection.limited.desc') : t('collection.signature.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {showcaseProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 mb-24"></div>

        {/* PART 2: SHOP ESSENTIALS (Tabbed) */}
        <div id="shop-all" className="scroll-mt-28">
           <div className="flex flex-col items-center mb-12 animate-fade-in-up">
            <span className="text-stone-500 text-xs font-bold tracking-[0.25em] uppercase block mb-3">{t('nav.shopAll')}</span>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-10">{t('products.section.main')}</h2>
            
            {/* Essential Tabs */}
            <div className="flex gap-2 p-1 bg-stone-200/50 rounded-full backdrop-blur-sm">
                <button 
                    onClick={() => setActiveFilter('candles')}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${activeFilter === 'candles' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                >
                    {t('filter.candles')}
                </button>
                <button 
                    onClick={() => setActiveFilter('oils')}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${activeFilter === 'oils' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                >
                    {t('filter.oils')}
                </button>
                 <button 
                    onClick={() => setActiveFilter('accessories')}
                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${activeFilter === 'accessories' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                >
                    {t('filter.accessories')}
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {essentialProducts.length > 0 ? (
              essentialProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
                <div className="col-span-full text-center py-12 text-stone-400 italic">
                    No products found in this category.
                </div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};

export default ProductGrid;