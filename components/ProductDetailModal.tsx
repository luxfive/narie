import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* iOS Liquid Glass Style Modal */}
      <div className="relative bg-white/70 backdrop-blur-3xl w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/50 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden animate-fade-in-up ring-1 ring-white/60">
        
        {/* Close Button - iOS style circle */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 bg-white/40 backdrop-blur-md rounded-full hover:bg-white/60 transition-colors border border-white/50 shadow-sm group"
        >
          <X className="w-5 h-5 text-stone-800 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-72 md:h-auto bg-stone-100 relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Gradient overlay for subtle depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col h-full overflow-y-auto bg-gradient-to-b from-white/40 to-transparent">
          <div className="mb-3">
             <span className="px-3 py-1 rounded-full bg-stone-900/5 text-[10px] font-bold tracking-widest text-stone-900 uppercase border border-stone-900/5 backdrop-blur-sm">
               {t('product.category.' + product.category) || product.category}
             </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3 tracking-tight">{product.name}</h2>
          <p className="text-2xl font-medium text-stone-800 mb-8">${product.price}.00</p>

          {/* iOS Segmented Control Style Tabs */}
          <div className="flex p-1 bg-stone-200/50 rounded-xl mb-8 backdrop-blur-sm">
            {['description', 'details', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-white text-stone-900 shadow-sm scale-[1.02]' 
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {t(`product.tab.${tab}`)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mb-8 flex-grow min-h-[120px]">
            {activeTab === 'description' && (
              <div className="animate-fade-in">
                <p className="text-stone-600 leading-relaxed mb-6 text-lg font-light">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.scentNotes.map((note, i) => (
                    <span key={i} className="px-4 py-1.5 bg-white/80 text-stone-800 text-sm rounded-full border border-white/60 shadow-sm backdrop-blur-sm">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="space-y-4 text-sm text-stone-600 animate-fade-in">
                <div className="flex justify-between border-b border-stone-900/5 pb-3">
                  <span className="font-semibold text-stone-800">{t('product.burnTime')}</span>
                  <span>{t('product.burnTimeValue')}</span>
                </div>
                <div className="flex justify-between border-b border-stone-900/5 pb-3">
                  <span className="font-semibold text-stone-800">{t('product.weight')}</span>
                  <span>{t('product.weightValue')}</span>
                </div>
                <div className="pt-2">
                  <span className="font-semibold text-stone-800 block mb-2">{t('product.ingredients')}</span>
                  <span className="text-stone-500 leading-relaxed">{t('product.ingredientsValue')}</span>
                </div>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="text-sm text-stone-600 animate-fade-in bg-white/40 p-4 rounded-2xl border border-white/50">
                 <p className="mb-3 font-medium">{t('product.shippingValue')}</p>
                 <p className="italic text-stone-400 text-xs">Returns accepted within 30 days of purchase.</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-auto pt-6 border-t border-stone-900/5">
            <div className="flex gap-4">
              <div className="flex items-center border border-stone-200/80 rounded-full bg-white/50 backdrop-blur-md shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/80 transition-colors rounded-l-full"
                >
                  <Minus className="w-4 h-4 text-stone-600" />
                </button>
                <span className="w-8 text-center font-bold text-stone-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/80 transition-colors rounded-r-full"
                >
                  <Plus className="w-4 h-4 text-stone-600" />
                </button>
              </div>
              <button className="flex-1 bg-stone-900 text-white font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-stone-800 transition-all duration-300 rounded-full shadow-lg hover:shadow-stone-900/20 active:scale-95">
                <ShoppingBag className="w-5 h-5" />
                <span>{t('product.addToCart')} • ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;