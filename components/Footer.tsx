import React, { useState } from 'react';
import { Flame, Instagram, Twitter, Facebook, MapPin, Mail, Phone, AtSign, Loader2, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Custom TikTok Icon since it might not be available in all Lucide versions
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || subStatus !== 'idle') return;

    setSubStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <footer id="footer" className="bg-stone-900 text-stone-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-stone-100 mb-6">
              <Flame className="w-5 h-5" />
              <span className="text-xl font-serif font-bold tracking-wider">NARIE</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="TikTok"><TiktokIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Threads"><AtSign className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium mb-6">{t('footer.contact.title')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-stone-600 flex-shrink-0 mt-0.5" />
                <span>{t('footer.contact.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-stone-600 flex-shrink-0" />
                <a href={`mailto:${t('footer.contact.email')}`} className="hover:text-white transition-colors">
                  {t('footer.contact.email')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-stone-600 flex-shrink-0" />
                <a href={`tel:${t('footer.contact.phone').replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                  {t('footer.contact.phone')}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-6">{t('footer.newsletter')}</h4>
            <p className="text-sm mb-4">{t('footer.newsletter_desc')}</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com" 
                disabled={subStatus !== 'idle'}
                required
                className="bg-stone-800 border border-stone-700 p-3 text-white focus:outline-none focus:border-stone-500 disabled:opacity-50 transition-colors"
              />
              <button 
                type="submit"
                disabled={subStatus !== 'idle'}
                className={`py-3 font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  subStatus === 'success' 
                    ? 'bg-green-700 text-white hover:bg-green-600' 
                    : 'bg-stone-100 text-stone-900 hover:bg-white'
                }`}
              >
                {subStatus === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {subStatus === 'success' && <Check className="w-4 h-4" />}
                <span>
                  {subStatus === 'loading' 
                    ? t('footer.subscribing') 
                    : subStatus === 'success' 
                      ? t('footer.subscribe_success') 
                      : t('footer.subscribe')
                  }
                </span>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 Narie Lab Co. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors">{t('footer.links.privacy')}</button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors">{t('footer.links.terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;