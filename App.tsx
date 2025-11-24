import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ScentAI from './components/ScentAI';
import Footer from './components/Footer';
import StoryModal from './components/StoryModal';
import CartDrawer from './components/CartDrawer';
import LegalModal from './components/LegalModal';
import { useLanguage } from './context/LanguageContext';
import { ArrowRight, Leaf, Flame, Hand } from 'lucide-react';

function App() {
  const { t } = useLanguage();
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg text-brand-dark">
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">
        <Hero />
        
        {/* Brand Philosophy Section */}
        <section id="about" className="py-32 px-6 bg-white">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-20">
                
                {/* Aesthetic Image Grid */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                  <div className="space-y-4 mt-12">
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                       <img 
                        src="https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop" 
                        alt="Natural Soy Wax" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                     <div className="aspect-square overflow-hidden rounded-2xl">
                       <img 
                        src="https://images.unsplash.com/photo-1608224786204-192c9615790d?q=80&w=800&auto=format&fit=crop" 
                        alt="Wood Wick detail" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-2xl">
                       <img 
                        src="https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=800&auto=format&fit=crop" 
                        alt="Hand pouring process" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                       <img 
                        src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop" 
                        alt="Minimalist home decor" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <span className="text-brand-terracotta text-xs font-bold tracking-[0.25em] uppercase block mb-6 pl-1">
                    {t('app.about.title')}
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark mb-10 leading-tight">
                    {t('app.about.heading')}
                  </h2>
                  <p className="text-stone-600 mb-8 leading-relaxed text-lg font-light">
                    {t('app.about.p1')}
                  </p>
                  
                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-t border-b border-stone-100 py-8">
                    <div className="flex flex-col gap-3">
                      <Leaf className="w-6 h-6 text-brand-olive" />
                      <h4 className="font-serif text-lg">{t('app.feat.safe')}</h4>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Flame className="w-6 h-6 text-brand-terracotta" />
                      <h4 className="font-serif text-lg">{t('app.feat.wood')}</h4>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Hand className="w-6 h-6 text-brand-mineral" />
                      <h4 className="font-serif text-lg">{t('app.feat.hand')}</h4>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowStoryModal(true)}
                    className="group inline-flex items-center gap-3 text-brand-dark font-medium hover:text-brand-terracotta transition-colors tracking-wide"
                  >
                    {t('app.about.cta')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
        </section>

        <ProductGrid />
        
        <ScentAI />

        {/* Director's Note */}
        <section className="py-24 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-terracotta mb-8">{t('director.title')}</h3>
            <p className="text-2xl md:text-4xl font-serif italic text-brand-dark leading-relaxed mb-10 opacity-80">
              "{t('director.text')}"
            </p>
            <div className="w-24 h-px bg-brand-dark/20 mx-auto mb-6"></div>
            <p className="text-sm font-bold text-brand-dark tracking-wider">{t('director.signoff')}</p>
          </div>
        </section>

      </main>
      <Footer onOpenLegal={setActiveLegalModal} />

      {showStoryModal && <StoryModal onClose={() => setShowStoryModal(false)} />}
      {activeLegalModal && <LegalModal type={activeLegalModal} onClose={() => setActiveLegalModal(null)} />}
    </div>
  );
}

export default App;
