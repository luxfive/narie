import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Flame, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    // Currency will update automatically via useEffect in LanguageContext
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-stone-50/80 backdrop-blur-2xl shadow-lg border-b border-white/20 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - Links to Hero Section */}
        <a 
          href="#hero" 
          onClick={(e) => scrollToSection(e, 'hero')}
          className="flex items-center gap-2 cursor-pointer group"
          aria-label="Narie Candle Home"
        >
          <div className={`p-2 rounded-full transition-all duration-500 ${isScrolled ? 'bg-amber-900/10' : 'bg-white/20 backdrop-blur-sm'}`}>
             <Flame className={`w-5 h-5 ${isScrolled ? 'text-amber-900' : 'text-stone-800'}`} />
          </div>
          <span className={`text-2xl font-serif font-bold tracking-wider transition-colors ${isScrolled ? 'text-stone-900' : 'text-stone-900'}`}>
            NARIE
          </span>
        </a>

        {/* Desktop Menu - Programmatic Scroll */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium tracking-wide transition-colors ${isScrolled ? 'text-stone-800' : 'text-stone-700'}`}>
          <a 
            href="#collections" 
            onClick={(e) => scrollToSection(e, 'collections')}
            className="hover:text-amber-900 transition-colors relative group cursor-pointer"
          >
            {t('nav.shop')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#collections" 
            onClick={(e) => scrollToSection(e, 'collections')}
            className="hover:text-amber-900 transition-colors relative group cursor-pointer"
          >
            {t('nav.collections')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#scent-ai" 
            onClick={(e) => scrollToSection(e, 'scent-ai')}
            className="hover:text-amber-900 transition-colors relative group cursor-pointer"
          >
            {t('nav.ai')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className="hover:text-amber-900 transition-colors relative group cursor-pointer"
          >
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
          <button 
            onClick={toggleCart}
            className="relative hover:text-amber-900 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-900 text-white text-[10px] flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
           <button onClick={toggleLanguage} className="text-stone-800 font-medium text-xs flex items-center gap-1">
             {language.toUpperCase()}
           </button>
           <button onClick={toggleCart} className="text-stone-800 relative">
            <ShoppingBag className="w-5 h-5" />
             {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-900 text-white text-[10px] flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-800">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-stone-50/95 backdrop-blur-xl border-b border-stone-200 shadow-lg py-8 px-6 flex flex-col gap-6 text-center animate-fade-in h-screen">
          <a 
            href="#collections" 
            onClick={(e) => scrollToSection(e, 'collections')} 
            className="text-stone-800 font-medium hover:text-amber-900 cursor-pointer text-xl"
          >
            {t('nav.shop')}
          </a>
          <a 
            href="#collections" 
            onClick={(e) => scrollToSection(e, 'collections')} 
            className="text-stone-800 font-medium hover:text-amber-900 cursor-pointer text-xl"
          >
            {t('nav.collections')}
          </a>
          <a 
            href="#scent-ai" 
            onClick={(e) => scrollToSection(e, 'scent-ai')} 
            className="text-stone-800 font-medium hover:text-amber-900 cursor-pointer text-xl"
          >
            {t('nav.ai')}
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')} 
            className="text-stone-800 font-medium hover:text-amber-900 cursor-pointer text-xl"
          >
            {t('nav.story')}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;