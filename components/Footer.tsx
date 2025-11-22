import React from 'react';
import { Flame, Instagram, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-stone-100 mb-6">
              <Flame className="w-5 h-5" />
              <span className="text-xl font-serif font-bold tracking-wider">NARIE</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-6">{t('footer.shop')}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.links.all')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.links.sig')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.links.seasonal')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.links.access')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.links.story')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.links.sus')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.links.stock')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.links.contact')}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-6">{t('footer.newsletter')}</h4>
            <p className="text-sm mb-4">{t('footer.newsletter_desc')}</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-stone-800 border border-stone-700 p-3 text-white focus:outline-none focus:border-stone-500"
              />
              <button className="bg-stone-100 text-stone-900 py-3 font-medium hover:bg-white transition-colors">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024 Narie Candle Co. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">{t('footer.links.privacy')}</a>
            <a href="#" className="hover:text-white">{t('footer.links.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;