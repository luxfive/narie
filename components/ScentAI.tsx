import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, Wind, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { getScentRecommendation } from '../services/geminiService';
import { AIRecommendation, LoadingState, Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS_EN, PRODUCTS_VI } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';

// Custom Mascot Component: "Bé Nari" - A cute flame with smiling eyes
const CuteMascot = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Flame Body - Filled with current text color (usually Amber) */}
    <path 
      d="M12 2C12 2 4 10 4 16C4 20.4 7.6 24 12 24C16.4 24 20 20.4 20 16C20 10 12 2 12 2Z" 
      fill="currentColor" 
    />
    
    {/* Face Features - Using a dark tone to contrast with the light flame body */}
    <g transform="translate(0, 1)">
      {/* Smiling Eyes (Arc shape) */}
      <path d="M8.5 15C8.5 15 9 14.5 9.5 15" stroke="#4A3525" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 15C14.5 15 15 14.5 15.5 15" stroke="#4A3525" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Smile */}
      <path d="M10 17.5C10 17.5 11 18.5 12 18.5C13 18.5 14 17.5 14 17.5" stroke="#4A3525" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Blush Cheeks */}
      <circle cx="7.5" cy="16.5" r="1" fill="#E29578" opacity="0.6" />
      <circle cx="16.5" cy="16.5" r="1" fill="#E29578" opacity="0.6" />
    </g>
  </svg>
);

const ScentAI: React.FC = () => {
  const [mood, setMood] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const { t, language, formatPrice } = useLanguage();
  const { addItem } = useCart();
  
  const products = language === 'vi' ? PRODUCTS_VI : PRODUCTS_EN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setStatus(LoadingState.LOADING);
    setRecommendation(null);
    setRecommendedProduct(null);

    // Prepare minimal inventory for AI context
    const inventory = products
      .filter(p => p.category !== 'accessory')
      .map(p => ({
        id: p.id,
        name: p.name,
        notes: p.scentNotes
      }));

    try {
      const result = await getScentRecommendation(mood, language, inventory);
      setRecommendation(result);
      
      if (result.recommendedProductId) {
        const match = products.find(p => p.id === result.recommendedProductId);
        if (match) {
          setRecommendedProduct(match);
        }
      }
      
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="scent-ai" className="py-24 bg-stone-900 text-stone-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-900/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Input */}
          <div className="w-full lg:w-1/2 relative">
            <div className="flex items-center gap-2 text-amber-200 mb-4">
              <CuteMascot className="w-8 h-8" />
              <span className="uppercase tracking-widest text-sm font-medium">{t('ai.tagline')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-stone-100 to-stone-400">
              {t('ai.title').split(',').map((part, i) => (
                <React.Fragment key={i}>
                  {part}{i === 0 ? ',' : ''} {i === 0 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-stone-400 text-lg mb-10 max-w-lg">
              {t('ai.subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-md group">
              <div className="relative overflow-hidden rounded-2xl bg-stone-800/30 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-stone-800/40 hover:shadow-amber-900/10">
                <textarea
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder={t('ai.placeholder')}
                  className="w-full bg-transparent border-none p-6 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-0 transition-all resize-none h-40 z-10 relative"
                />
                
                {/* Glass Reflection Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-4 right-4 z-20">
                   <button 
                    type="submit"
                    disabled={status === LoadingState.LOADING || !mood}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-stone-100 px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                  >
                    {status === LoadingState.LOADING ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('ai.button.loading')}
                      </>
                    ) : (
                      <>
                        {t('ai.button.idle')}
                        <Wind className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
              {status === LoadingState.ERROR && (
                <p className="text-red-400 mt-4 text-sm ml-2">{t('ai.error')}</p>
              )}
            </form>
          </div>

          {/* Right Side: Output Display */}
          <div className="w-full lg:w-1/2 min-h-[400px] flex justify-center perspective-1000">
            {status === LoadingState.SUCCESS && recommendation ? (
              <div className="flex flex-col gap-6 w-full max-w-md">
                  <div className="w-full bg-gradient-to-br from-stone-800/60 to-stone-900/60 backdrop-blur-3xl border border-white/10 p-8 md:p-12 animate-fade-in-up rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden">
                    
                    {/* Glass Highlight */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                    <span className="text-amber-400 text-xs tracking-[0.2em] uppercase block mb-4 text-center relative z-10">{t('ai.result.concept')}</span>
                    <h3 className="text-3xl font-serif text-center mb-2 relative z-10 text-white drop-shadow-sm">{recommendation.candleName}</h3>
                    <div className="flex justify-center gap-2 mb-6 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${i < recommendation.intensityLevel ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-stone-700/50'}`}></div>
                      ))}
                    </div>
                    
                    <div className="space-y-6 relative z-10">
                      <div>
                        <p className="text-stone-200 italic text-center leading-relaxed border-t border-b border-white/10 py-6 font-light">
                          "{recommendation.description}"
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs text-stone-500 uppercase tracking-widest mb-3 text-center">{t('ai.result.notes')}</h4>
                        <div className="flex flex-wrap justify-center gap-3">
                          {recommendation.scentProfile.map((note, index) => (
                            <span key={index} className="bg-white/5 text-stone-200 px-4 py-1.5 text-sm rounded-full border border-white/10 backdrop-blur-sm shadow-sm">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-900/10 p-5 rounded-xl border border-amber-500/20 backdrop-blur-sm">
                          <p className="text-amber-100/90 text-sm text-center">
                            <span className="font-bold text-amber-200 block mb-1">{t('ai.result.why')}</span>
                            {recommendation.moodMatch}
                          </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recommended Product Card */}
                  {recommendedProduct && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl animate-fade-in-up animation-delay-200 flex items-center gap-4 relative overflow-hidden hover:bg-white/10 transition-all">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-white/10">
                             <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                <span className="text-[10px] uppercase tracking-widest text-amber-200">{t('ai.recommendation')}</span>
                            </div>
                            <h4 className="text-lg font-serif font-bold text-white truncate">{recommendedProduct.name}</h4>
                            <p className="text-stone-400 text-sm">{formatPrice(recommendedProduct.price, recommendedProduct.priceVND)}</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <button 
                                onClick={() => handleAddToCart(recommendedProduct)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${isAdded ? 'bg-green-500 text-white' : 'bg-white text-stone-900 hover:scale-110'}`}
                                title={t('product.addToCart')}
                            >
                                {isAdded ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                            </button>
                             <button 
                                onClick={() => setShowDetailModal(true)}
                                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
                                title={t('product.quickView')}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                  )}

                  <button 
                      onClick={() => {
                        setMood('');
                        setStatus(LoadingState.IDLE);
                        setRecommendation(null);
                        setRecommendedProduct(null);
                      }}
                      className="flex items-center justify-center gap-2 text-stone-400 hover:text-white text-sm mt-2 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      {t('ai.result.again')}
                  </button>
              </div>
            ) : (
              // Empty State / Placeholder with Glass Effect
              <div className={`w-full max-w-md aspect-square border border-white/5 bg-stone-800/20 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-stone-600 transition-all duration-500 ${status === LoadingState.LOADING ? 'opacity-50 scale-95' : 'opacity-100 hover:bg-stone-800/30'}`}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-stone-700/20 to-stone-800/20 flex items-center justify-center mb-6 shadow-inner border border-white/5 relative">
                   {/* Cute Mascot Placeholder */}
                   <CuteMascot className="w-14 h-14 text-stone-500/50" />
                </div>
                <p className="text-lg font-serif opacity-50 tracking-wide">{t('ai.empty.text')}</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {showDetailModal && recommendedProduct && (
        <ProductDetailModal 
            product={recommendedProduct} 
            onClose={() => setShowDetailModal(false)} 
        />
      )}
    </section>
  );
};

export default ScentAI;