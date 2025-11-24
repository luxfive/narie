import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Truck, ArrowRight, ChevronLeft, QrCode, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface CheckoutModalProps {
  onClose: () => void;
}

type PaymentMethod = 'cod' | 'qr';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { items, clearCart } = useCart();
  const { t, formatPrice, currency } = useLanguage();
  const [step, setStep] = useState<1 | 2>(1); // Always defaults to 1 (Information)
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

   // Helper to calculate price with variant fee
   const calculateItemPrice = (item: typeof items[0]) => {
    const basePrice = currency === 'USD' ? item.product.price : item.product.priceVND;
    const giftFee = item.variant === 'gift' ? (currency === 'USD' ? 5 : 100000) : 0;
    return basePrice + giftFee;
   };

  // 1. Calculate Subtotal
  const subtotal = items.reduce((acc, item) => {
    return acc + (calculateItemPrice(item) * item.quantity);
  }, 0);

  // 2. Calculate Shipping
  const freeShippingThreshold = currency === 'USD' ? 50 : 1000000;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : (currency === 'USD' ? 5 : 35000);
  
  // 3. Calculate Final Total
  const finalTotal = subtotal + shippingCost;

  // Simple form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (formData.name && formData.email && formData.phone && formData.address && formData.city) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSubmitOrder = () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  // Close modal completely after success
  const handleFinish = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
        >
          <X className="w-5 h-5 text-stone-800" />
        </button>

        {isSuccess ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-white relative z-20 animate-fade-in">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">{t('checkout.successTitle')}</h2>
            <p className="text-stone-500 max-w-md mb-8 leading-relaxed">{t('checkout.successDesc')}</p>
            <div className="bg-stone-50 p-6 rounded-2xl mb-8 text-left w-full max-w-sm border border-stone-100">
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-stone-500">Order ID:</span>
                 <span className="font-mono font-medium">#NR-{Math.floor(Math.random() * 10000)}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-stone-500">Total:</span>
                 <span className="font-bold text-stone-900">{formatPrice(finalTotal, finalTotal)}</span>
               </div>
            </div>
            <button 
              onClick={handleFinish}
              className="px-10 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors font-medium"
            >
              {t('checkout.backShop')}
            </button>
          </div>
        ) : (
          <>
            {/* Left: Main Content Area (Form/Payment) */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-white relative flex flex-col">
              
              {/* Progress Header */}
              <div className="flex items-center gap-4 mb-10">
                <div className={`flex items-center gap-2 ${step === 1 ? 'text-stone-900' : 'text-stone-400'}`}>
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'}`}>1</span>
                   <span className="font-serif font-bold text-sm uppercase tracking-wider">{t('checkout.step1')}</span>
                </div>
                <div className="w-10 h-px bg-stone-200"></div>
                <div className={`flex items-center gap-2 ${step === 2 ? 'text-stone-900' : 'text-stone-400'}`}>
                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'}`}>2</span>
                   <span className="font-serif font-bold text-sm uppercase tracking-wider">{t('checkout.step2')}</span>
                </div>
              </div>

              {/* STEP 1: SHIPPING FORM */}
              <div className={`transition-all duration-500 ${step === 1 ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">{t('checkout.billing')}</h2>
                <form id="checkout-form" onSubmit={handleNextStep} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('checkout.name')}</label>
                        <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500 transition-colors"
                        placeholder="Nguyen Van A"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('checkout.phone')}</label>
                        <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500 transition-colors"
                        placeholder="090 123 4567"
                        />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('checkout.email')}</label>
                    <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500 transition-colors"
                        placeholder="email@example.com"
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('checkout.address')}</label>
                    <input 
                        required
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500 transition-colors"
                        placeholder="123 Le Loi"
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('checkout.city')}</label>
                    <input 
                        required
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500 transition-colors"
                        placeholder="Ho Chi Minh City"
                    />
                    </div>
                </form>
              </div>

              {/* STEP 2: PAYMENT */}
              <div className={`transition-all duration-500 h-full flex flex-col ${step === 2 ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">{t('checkout.payment')}</h2>
                
                <div className="space-y-4 mb-8">
                    {/* COD Option */}
                    <div 
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-5 border rounded-xl flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' : 'border-stone-200 hover:border-stone-400'}`}
                    >
                        <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                           <Truck className="w-5 h-5 text-stone-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-stone-900">{t('checkout.cod')}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-stone-900' : 'border-stone-300'}`}>
                            {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full"></div>}
                        </div>
                    </div>

                    {/* QR Option */}
                    <div 
                        onClick={() => setPaymentMethod('qr')}
                        className={`p-5 border rounded-xl flex items-center gap-4 cursor-pointer transition-all ${paymentMethod === 'qr' ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900' : 'border-stone-200 hover:border-stone-400'}`}
                    >
                         <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
                           <QrCode className="w-5 h-5 text-stone-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-stone-900">{t('checkout.qr')}</p>
                            <p className="text-xs text-stone-500">{t('checkout.qrDesc')}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'qr' ? 'border-stone-900' : 'border-stone-300'}`}>
                            {paymentMethod === 'qr' && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full"></div>}
                        </div>
                    </div>
                </div>

                {/* QR Display Area */}
                {paymentMethod === 'qr' && (
                    <div className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 animate-fade-in">
                        <div className="w-32 h-32 bg-stone-100 rounded-lg flex-shrink-0 overflow-hidden border border-stone-300">
                             <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NARIE-PAYMENT-${Math.floor(Math.random()*10000)}`} 
                                alt="Payment QR" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="text-sm space-y-1 flex-1 text-center sm:text-left">
                            <p className="font-bold text-stone-900">Narie Lab Co.</p>
                            <p className="text-stone-600 font-mono">TPBANK: 0901234567</p>
                            <p className="text-stone-500 text-xs mt-2">Scan via Mobile Banking App to pay. <br/> Order will be processed once payment is confirmed.</p>
                        </div>
                    </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-auto pt-8 flex items-center justify-between">
                 {step === 2 ? (
                     <button 
                        type="button" 
                        onClick={handleBackStep}
                        className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium transition-colors"
                     >
                        <ChevronLeft className="w-4 h-4" />
                        {t('checkout.back')}
                     </button>
                 ) : (
                     <div></div> /* Spacer */
                 )}

                 {step === 1 ? (
                    <button 
                        type="submit" 
                        form="checkout-form"
                        className="px-8 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all flex items-center gap-2 shadow-lg"
                    >
                        {t('checkout.next')}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                 ) : (
                    <button 
                        onClick={handleSubmitOrder}
                        disabled={isProcessing}
                        className="px-8 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all flex items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-wait"
                    >
                         {isProcessing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {t('checkout.processing')}
                            </>
                        ) : (
                            <>
                                <CreditCard className="w-4 h-4" />
                                {t('checkout.submit')}
                            </>
                        )}
                    </button>
                 )}
              </div>
            </div>

            {/* Right: Summary (Fixed) */}
            <div className="w-full md:w-2/5 bg-stone-50 p-8 md:p-12 border-l border-stone-100 flex flex-col">
              <h3 className="font-serif font-bold text-xl mb-6 text-stone-900">{t('checkout.summary')}</h3>
              
              <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar max-h-[50vh] md:max-h-none">
                {items.map(({ product, quantity, variant }) => (
                  <div key={`${product.id}-${variant}`} className="flex gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-white border border-stone-200 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-stone-900">{product.name}</p>
                      <p className="text-xs text-stone-500">Qty: {quantity}</p>
                      {variant === 'gift' && (
                         <span className="flex items-center gap-1 text-[10px] text-stone-800 bg-stone-200 px-2 py-0.5 rounded-full mt-1 w-fit">
                            <Gift className="w-3 h-3" />
                            {t('product.option.gift')}
                         </span>
                      )}
                    </div>
                    <p className="font-medium text-sm text-stone-900">
                      {formatPrice(
                        calculateItemPrice({ product, quantity, variant }) * quantity,
                        calculateItemPrice({ product, quantity, variant }) * quantity
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">{t('cart.subtotal')}</span>
                  <span className="font-medium">{formatPrice(subtotal, subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">{t('product.tab.shipping')}</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-700' : 'text-stone-900'}`}>
                    {shippingCost === 0 ? 'Free' : formatPrice(shippingCost, shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-serif font-bold text-stone-900 pt-4 border-t border-stone-200 mt-2">
                  <span>{t('checkout.total')}</span>
                  <span>{formatPrice(finalTotal, finalTotal)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;