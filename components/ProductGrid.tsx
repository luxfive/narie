import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ProductDetailModal from './ProductDetailModal';

// Extending Product type locally for color property
interface SeasonalProduct extends Product {
  colorTheme: string;
}

const PRODUCTS_EN: SeasonalProduct[] = [
  {
    id: '1',
    name: 'Spring Bud',
    price: 35,
    description: 'The touch of morning dew on young buds. A promise of new beginnings.',
    scentNotes: ['Grapefruit', 'Green Tea', 'Morning Dew'],
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a6967efd?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-olive'
  },
  {
    id: '2',
    name: 'Summer Breeze',
    price: 35,
    description: 'Cool sea breeze touching the skin. Salt air and driftwood.',
    scentNotes: ['Sea Salt', 'Driftwood', 'Sage'],
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-mineral'
  },
  {
    id: '3',
    name: 'Autumn Sun',
    price: 35,
    description: 'Warm sunlight through turning leaves. Spicy and grounding.',
    scentNotes: ['Cardamom', 'Cedarwood', 'Amber'],
    image: 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-terracotta'
  },
  {
    id: '4',
    name: 'Winter Hearth',
    price: 35,
    description: 'Warmth from a kitchen corner. Comforting firewood and vanilla.',
    scentNotes: ['Firewood', 'Vanilla', 'Clove'],
    image: 'https://images.unsplash.com/photo-1608755717536-faa6a36e817e?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-charcoal'
  },
];

const PRODUCTS_VI: SeasonalProduct[] = [
  {
    id: '1',
    name: 'Mầm Xuân',
    price: 35,
    description: 'Cảm giác sương sớm chạm lên chồi non. Tươi mới và tinh khôi.',
    scentNotes: ['Bưởi Hồng', 'Trà Xanh', 'Sương Mai'],
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a6967efd?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-olive'
  },
  {
    id: '2',
    name: 'Gió Hạ',
    price: 35,
    description: 'Gió biển mát lành chạm vào da thịt. Muối biển và gỗ trôi.',
    scentNotes: ['Muối Biển', 'Gỗ Trôi', 'Xô Thơm'],
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-mineral'
  },
  {
    id: '3',
    name: 'Nắng Thu',
    price: 35,
    description: 'Nắng ấm xuyên qua kẽ lá vàng. Trầm ấm và bình yên.',
    scentNotes: ['Bạch Đậu Khấu', 'Gỗ Tuyết Tùng', 'Hổ Phách'],
    image: 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-terracotta'
  },
  {
    id: '4',
    name: 'Lửa Đông',
    price: 35,
    description: 'Hơi ấm từ góc bếp nhỏ. Củi khô và vani ngọt ngào.',
    scentNotes: ['Củi Khô', 'Vani', 'Đinh Hương'],
    image: 'https://images.unsplash.com/photo-1608755717536-faa6a36e817e?q=80&w=1500&auto=format&fit=crop',
    category: 'signature',
    colorTheme: 'bg-brand-charcoal'
  },
];

const ProductGrid: React.FC = () => {
  const { t, language } = useLanguage();
  const products = language === 'vi' ? PRODUCTS_VI : PRODUCTS_EN;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="collections" className="py-32 bg-brand-bg relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-6">{t('products.title')}</h2>
          <p className="text-stone-600 max-w-xl font-light text-lg">{t('products.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group cursor-pointer flex flex-col" 
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image Card with Color Theme */}
              <div className="relative overflow-hidden rounded-t-[2rem] aspect-[3/4] mb-0">
                 <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              
              {/* Content Card */}
              <div className={`p-6 rounded-b-[2rem] text-white transition-all duration-500 relative overflow-hidden ${product.colorTheme}`}>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                     <Plus className="w-4 h-4 text-white" />
                   </div>
                </div>

                <h3 className="text-2xl font-serif mb-2">{product.name}</h3>
                <div className="w-10 h-0.5 bg-white/40 mb-4"></div>
                <p className="text-sm text-white/80 mb-4 font-light line-clamp-2 min-h-[2.5em]">
                  {product.description}
                </p>
                <div className="flex justify-between items-end">
                   <div className="flex gap-2 text-xs opacity-75">
                      {product.scentNotes.slice(0,2).join(' • ')}
                   </div>
                   <span className="text-lg font-medium font-serif">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
           <a href="#" className="inline-flex items-center gap-2 text-brand-dark uppercase tracking-widest text-xs font-bold border-b border-brand-dark pb-1 hover:text-brand-terracotta hover:border-brand-terracotta transition-colors">
             {t('products.viewAll')} <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Product Detail Modal */}
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