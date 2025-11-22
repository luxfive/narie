import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StoryModalProps {
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ onClose }) => {
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white/80 backdrop-blur-3xl w-full max-w-2xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden animate-fade-in-up p-8 md:p-12">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/50 rounded-full hover:bg-white transition-colors group"
        >
            <X className="w-5 h-5 text-stone-800 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="overflow-y-auto max-h-[80vh] pr-2 custom-scrollbar">
            <span className="text-brand-terracotta text-xs font-bold tracking-[0.25em] uppercase block mb-4">{t('nav.story')}</span>
            
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-8 leading-tight">{t('story.full.title')}</h2>
            
            <div className="space-y-6 text-stone-600 font-light text-lg leading-relaxed">
                <p>{t('story.full.p1')}</p>
                <p>{t('story.full.p2')}</p>
                <p>{t('story.full.p3')}</p>
            </div>

             <div className="mt-12 pt-8 border-t border-stone-200">
                <p className="font-serif italic text-stone-500 text-center">"{t('app.quote')}"</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;