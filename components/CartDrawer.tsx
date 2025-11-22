import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import CheckoutModal from './CheckoutModal';

const CartDrawer: React.FC = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem } = useCart();
  const { t, formatPrice, currency } = useLanguage();
  const [showCheckout, setShowCheckout] = useState(false);

  // If both drawer and checkout are closed, render nothing.
  if (!isOpen && !showCheckout) return null;

  // Calculate Subtotal
  const subtotal = items.reduce((acc, item) => {
    const price = currency === 'USD' ? item.product.price : item.product.priceVND;
    return acc + (price * item.quantity);
  }, 0);

  // Shipping Logic
  // Threshold: $50 or 1.000.000 VND
  const freeShippingThreshold = currency === 'USD' ? 50 : 1000000;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : (currency === 'USD' ? 5 : 35000);
  
  // Final Total
  const finalTotal = subtotal + shippingCost;

  const handleCheckout = () => {
    toggleCart(); // Close drawer
    setShowCheckout(true); // Open modal (defaults to Step 1)
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
            onClick={toggleCart}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-fade-in border-l border-stone-200">
            
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-stone-800" />
                <h2 className="text-lg font-serif font-bold text-stone-900">{t('cart.title')}</h2>
                <span className="bg-stone-100 text-stone-600 text-xs py-0.5 px-2 rounded-full font-bold">{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2 text-stone-500 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p className="text-lg font-light">{t('cart.empty')}</p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 px-6 py-2 bg-stone-900 text-white text-sm rounded-full hover:bg-stone-800 transition-colors"
                  >
                    {t('nav.shop')}
                  </button>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif font-medium text-stone-900">{product.name}</h3>
                          <p className="text-xs text-stone-500">{t('product.category.' + product.category)}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(product.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center border border-stone-200 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 hover:bg-stone-100 rounded-full"
                          >
                            <Minus className="w-3 h-3 text-stone-600" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{quantity}</span>
                          <button 
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 hover:bg-stone-100 rounded-full"
                          >
                            <Plus className="w-3 h-3 text-stone-600" />
                          </button>
                        </div>
                        <p className="font-medium text-stone-900 text-sm">
                          {formatPrice(
                            (currency === 'USD' ? product.price : product.priceVND) * quantity, 
                            (currency === 'USD' ? product.price : product.priceVND) * quantity
                          ).replace('₫', '') + (currency === 'VND' ? '₫' : '')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-100 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-600">{t('cart.subtotal')}</span>
                  <span className="font-medium text-stone-900">
                    {formatPrice(subtotal, subtotal)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-600">{t('product.tab.shipping')}</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-700' : 'text-stone-900'}`}>
                    {shippingCost === 0 ? 'Free' : formatPrice(shippingCost, shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-lg font-serif font-bold text-stone-900 pt-3 border-t border-stone-200">
                  <span>{t('checkout.total')}</span>
                  <span>{formatPrice(finalTotal, finalTotal)}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 mt-2 bg-stone-900 text-white font-medium tracking-wide rounded-full hover:bg-stone-800 transition-all shadow-lg"
                >
                  {t('cart.checkout')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
};

export default CartDrawer;