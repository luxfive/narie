import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ScentAI from './components/ScentAI';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';
import { ArrowRight } from 'lucide-react';

function App() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg text-brand-dark">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* About Section */}
        <section id="about" className="py-32 px-6 bg-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-20">
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
                   <img 
                    src="https://images.unsplash.com/photo-1617321290070-8c85676e746b?q=80&w=2000&auto=format&fit=crop" 
                    alt="Narie lifestyle" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-olive/20 rounded-full blur-3xl z-0"></div>
              </div>
              
              <div className="w-full md:w-1/2">
                <span className="text-brand-terracotta text-sm tracking-[0.2em] uppercase font-bold block mb-6">{t('app.about.title')}</span>
                <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-10 leading-tight">
                  {t('hero.tagline')}
                </h2>
                <p className="text-stone-600 mb-8 leading-relaxed text-lg font-light">
                  {t('app.about.p1')}
                </p>
                <p className="text-stone-600 mb-12 leading-relaxed text-lg font-light">
                  {t('app.about.p2')}
                </p>
                <a href="#" className="group inline-flex items-center gap-3 text-brand-dark font-medium hover:text-brand-terracotta transition-colors">
                  {t('app.about.cta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
        </section>

        <ProductGrid />
        
        <ScentAI />

        {/* Blog / Lifestyle Section: Healing Corner */}
        <section className="py-32 px-6 bg-brand-bg">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">{t('blog.title')}</h2>
              <p className="text-stone-500 font-light">{t('blog.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Article 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/2] overflow-hidden rounded-2xl mb-6">
                  <img src="https://images.unsplash.com/photo-1491926626787-62db157af940?q=80&w=1500&auto=format&fit=crop" alt="Balcony" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-brand-terracotta transition-colors">{t('blog.p1.title')}</h3>
                <p className="text-stone-600 font-light leading-relaxed">{t('blog.p1.desc')}</p>
              </div>

              {/* Article 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/2] overflow-hidden rounded-2xl mb-6">
                  <img src="https://images.unsplash.com/photo-1516967865013-50a328285252?q=80&w=1500&auto=format&fit=crop" alt="Evening" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-brand-mineral transition-colors">{t('blog.p2.title')}</h3>
                <p className="text-stone-600 font-light leading-relaxed">{t('blog.p2.desc')}</p>
              </div>

               {/* Article 3 */}
               <div className="group cursor-pointer">
                <div className="aspect-[3/2] overflow-hidden rounded-2xl mb-6">
                  <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1500&auto=format&fit=crop" alt="Community" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-brand-olive transition-colors">{t('blog.p3.title')}</h3>
                <p className="text-stone-600 font-light leading-relaxed">{t('blog.p3.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Director's Note */}
        <section className="py-24 bg-white border-t border-stone-100">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-8">{t('director.title')}</h3>
            <p className="text-2xl md:text-3xl font-serif italic text-brand-dark leading-relaxed mb-10">
              "{t('director.text')}"
            </p>
            <div className="w-16 h-0.5 bg-brand-dark mx-auto mb-6"></div>
            <p className="text-sm font-medium text-brand-dark">{t('director.signoff')}</p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default App;