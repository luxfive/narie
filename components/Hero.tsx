import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-[95vh] w-full overflow-hidden bg-brand-bg">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1602523833573-8926b9b80759?q=80&w=2574&auto=format&fit=crop" 
          alt="Minimalist candle ambiance" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center">
        <span className="text-stone-100 font-sans tracking-[0.3em] text-sm uppercase mb-6 animate-fade-in-up opacity-90">
          {t('hero.tagline')}
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-tight mb-8 drop-shadow-lg max-w-5xl">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-stone-200 mb-12 max-w-2xl leading-relaxed font-light font-sans tracking-wide">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <a 
            href="#collections"
            className="group bg-brand-bg text-brand-dark px-10 py-4 flex items-center gap-3 hover:bg-white transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl font-medium tracking-wide"
          >
            {t('hero.cta_shop')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
           <a 
            href="#scent-ai"
            className="group bg-white/10 backdrop-blur-xl border border-white/30 text-white px-10 py-4 flex items-center gap-3 hover:bg-white/20 transition-all duration-500 rounded-full font-medium tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-stone-200" />
            {t('hero.cta_ai')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;