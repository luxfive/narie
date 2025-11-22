import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-stone-50/60 backdrop-blur-2xl shadow-lg border-b border-white/20 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className={`p-2 rounded-full transition-all duration-500 ${isScrolled ? 'bg-amber-900/10' : 'bg-white/20 backdrop-blur-sm'}`}>
             <Flame className={`w-5 h-5 ${isScrolled ? 'text-amber-900' : 'text-stone-800'}`} />
          </div>
          <span className={`text-2xl font-serif font-bold tracking-wider transition-colors ${isScrolled ? 'text-stone-900' : 'text-stone-900'}`}>
            NARIE
          </span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium tracking-wide transition-colors ${isScrolled ? 'text-stone-800' : 'text-stone-700'}`}>
          <a href="#" className="hover:text-amber-900 transition-colors relative group">
            {t('nav.shop')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#collections" className="hover:text-amber-900 transition-colors relative group">
            {t('nav.collections')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#scent-ai" className="hover:text-amber-900 transition-colors relative group">
            {t('nav.ai')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="hover:text-amber-900 transition-colors relative group">
            {t('nav.story')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Icons */}
        <div className={`hidden md:flex items-center gap-6 transition-colors ${isScrolled ? 'text-stone-800' : 'text-stone-700'}`}>
          <button 
            onClick={toggleLanguage} 
            className="hover:text-amber-900 transition-colors flex items-center gap-1 font-medium"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs">{language.toUpperCase()}</span>
          </button>
          <button className="hover:text-amber-900 transition-colors">
            <span className="text-sm">{t('nav.login')}</span>
          </button>
          <button className="relative hover:text-amber-900 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-900 rounded-full animate-pulse"></span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
           <button onClick={toggleLanguage} className="text-stone-800 font-medium text-xs flex items-center gap-1">
             {language.toUpperCase()}
           </button>
           <button className="text-stone-800">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-800">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-stone-50/95 backdrop-blur-xl border-b border-stone-200 shadow-lg py-8 px-6 flex flex-col gap-6 text-center animate-fade-in">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-800 font-medium hover:text-amber-900">{t('nav.shopAll')}</a>
          <a href="#collections" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-800 font-medium hover:text-amber-900">{t('nav.collections')}</a>
          <a href="#scent-ai" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-800 font-medium hover:text-amber-900">{t('nav.ai')}</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-800 font-medium hover:text-amber-900">{t('nav.story')}</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;