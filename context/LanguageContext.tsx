import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'vi';
export type Currency = 'USD' | 'VND';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (price: number, priceVND: number) => string;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.shop': 'SHOP',
    'nav.collections': 'SEASONS',
    'nav.ai': 'LITTLE RI',
    'nav.story': 'PHILOSOPHY',
    'nav.login': 'LOGIN',
    'nav.shopAll': 'SHOP ALL',
    'hero.tagline': 'MINIMAL TOUCH, NATURAL SCENT',
    'hero.title': 'Elevate your living space with exquisite, original scents.',
    'hero.subtitle': 'Hand-poured with natural soy wax and wooden wicks. A healing experience for your home.',
    'hero.cta_shop': 'Explore Collection',
    'hero.cta_ai': 'Ask Little Ri',
    'app.about.title': 'ABOUT NARIE',
    'app.about.heading': 'More than a candle, a healing lifestyle.',
    'app.about.p1': 'At Narie, we believe that a scent is not just a fragrance, but a memory, a feeling, and a way to heal the soul. Our candles are crafted with the utmost care, using only the finest sustainable ingredients.',
    'app.about.cta': 'Read our full story',
    'app.feat.safe': '100% Soy Wax',
    'app.feat.wood': 'Natural Wood Wick',
    'app.feat.hand': 'Hand Poured',
    'app.quote': 'In silence, we find our true selves.',
    'director.title': "DIRECTOR'S NOTE",
    'director.text': "We don't just make candles; we craft moments of stillness in a chaotic world. Let the light guide you home.",
    'director.signoff': 'CREATIVE DIRECTOR, NARIE',
    'product.category.signature': 'Signature Collection',
    'product.category.seasonal': 'Seasonal Edition',
    'product.category.limited': 'Limited Edition',
    'product.category.accessory': 'Accessory',
    'product.category.essential_oil': 'Essential Oil',
    'product.quickView': 'Quick View',
    'product.addToCart': 'Add to Bag',
    'product.added': 'Added to Bag',
    'product.tab.description': 'Description',
    'product.tab.details': 'Details',
    'product.tab.shipping': 'Shipping',
    'product.burnTime': 'Burn Time',
    'product.burnTimeValue': 'Approx. 50 hours',
    'product.weight': 'Weight',
    'product.weightValue': '8.5 oz / 240g',
    'product.ingredients': 'Ingredients',
    'product.ingredientsValue': '100% Natural Soy Wax, Premium Fragrance Oils, Crackling Wooden Wick.',
    'product.care': 'Candle Care',
    'product.careValue': 'Trim wick to 1/4 inch before lighting. Keep candle free of any foreign materials including matches and wick trimmings. Only burn the candle on a level, fire resistant surface. Do not burn candle for more than 4 hours at a time.',
    'product.shippingValue': 'Free standard shipping on all orders over $50 / 1.000.000₫. Estimated delivery 3-5 business days.',
    'product.returnsPolicy': 'Return Policy',
    'product.returnsValue': 'We accept returns within 14 days of delivery. The product must be unused and in original packaging.',
    'product.option.title': 'Select Option',
    'product.option.standard': 'Standard Candle',
    'product.option.gift': 'Gift Set (+Box & Card)',
    'products.section.featured': 'FEATURED COLLECTION',
    'products.section.main': 'Shop Essentials',
    'filter.candles': 'Scented Candles',
    'filter.oils': 'Essential Oils',
    'filter.accessories': 'Accessories',
    'collection.limited.title': 'Moonlit Garden',
    'collection.limited.desc': 'A mystical collection inspired by the secrets of a garden at midnight. Deep, floral, and atmospheric scents for quiet introspection.',
    'collection.signature.title': 'The Quiet Seasons',
    'collection.signature.desc': 'Our core collection celebrating the subtle beauty of nature through the four seasons. Grounding, nostalgic, and pure.',
    'ai.tagline': 'MEET LITTLE RI',
    'ai.title': 'Describe your mood, Find your scent.',
    'ai.subtitle': 'Tell us how you feel, where you are, or a memory you cherish. Our AI will curate the perfect scent profile for you.',
    'ai.placeholder': 'e.g., "I want to feel like I\'m reading an old book in a rainy cabin..."',
    'ai.button.idle': 'Curate My Scent',
    'ai.button.loading': 'Analyzing Mood...',
    'ai.error': 'Unable to connect to Little Ri. Please try again.',
    'ai.result.concept': 'YOUR SCENT CONCEPT',
    'ai.result.notes': 'KEY NOTES',
    'ai.result.why': 'WHY THIS MATCHES',
    'ai.result.again': 'Curate Another',
    'ai.empty.text': 'Your personal scent journey begins here.',
    'ai.recommendation': 'Ri Recommends',
    'story.full.title': 'The Narie Journey',
    'story.full.p1': 'Narie was born from a simple desire: to slow down. In the hustle of modern life, we often forget to breathe, to pause, and to appreciate the quiet moments. We started in a small kitchen, experimenting with natural waxes and essential oils, seeking a scent that didn\'t just smell good, but felt good.',
    'story.full.p2': 'Our name comes from the combination of "Natural" and "Reverie". We believe that nature holds the key to our dreams and our healing. Every candle is poured by hand, ensuring that the human touch is never lost in the process. We use only sustainably sourced soy wax and FSC-certified wooden wicks that crackle softly like a tiny fireplace.',
    'story.full.p3': 'Today, Narie is more than a product; it is a community of like-minded souls who value mindfulness, aesthetics, and the power of scent. Thank you for letting us be a part of your home.',
    'cart.title': 'Shopping Bag',
    'cart.empty': 'Your bag is empty.',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Proceed to Checkout',
    'checkout.step1': 'Information',
    'checkout.step2': 'Payment',
    'checkout.billing': 'Shipping Address',
    'checkout.payment': 'Payment Method',
    'checkout.summary': 'Order Summary',
    'checkout.total': 'Total',
    'checkout.next': 'Continue to Payment',
    'checkout.back': 'Back to Information',
    'checkout.submit': 'Place Order',
    'checkout.processing': 'Processing...',
    'checkout.successTitle': 'Thank You!',
    'checkout.successDesc': 'Your order has been confirmed. We have sent a receipt to your email.',
    'checkout.backShop': 'Continue Shopping',
    'checkout.name': 'Full Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone Number',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.cod': 'Cash on Delivery (COD)',
    'checkout.qr': 'Bank Transfer (QR)',
    'checkout.qrDesc': 'Scan QR code with your banking app',
    'footer.desc': 'Artisanal scents for the modern soul. Handcrafted with intention and natural ingredients.',
    'footer.contact.title': 'Contact Us',
    'footer.contact.address': '123 Poetry Lane, District 1, HCMC',
    'footer.contact.email': 'hello@narie.com',
    'footer.contact.phone': '+84 90 123 4567',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter_desc': 'Subscribe to receive updates, access to exclusive deals, and more.',
    'footer.subscribe': 'Subscribe',
    'footer.subscribing': 'Joining...',
    'footer.subscribe_success': 'Subscribed!',
    'footer.rights': 'All rights reserved.',
    'footer.links.privacy': 'Privacy Policy',
    'footer.links.terms': 'Terms of Service',
    
    // LEGAL CONTENT
    'legal.privacy.content': `
      1. INFORMATION COLLECTION
      We collect personal information such as your name, email address, shipping address, and phone number when you place an order or subscribe to our newsletter. We do not store credit card information on our servers.

      2. USE OF INFORMATION
      Your information is used solely for processing orders, improving our website, and communicating with you about your purchase or our products.

      3. COOKIES
      We use cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings.

      4. DATA PROTECTION
      We implement security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.

      5. THIRD-PARTY SERVICES
      We may use third-party services (e.g., payment gateways, shipping providers) who have their own privacy policies. We encourage you to review their policies.
    `,
    'legal.terms.content': `
      1. GENERAL CONDITIONS
      By accessing this website, you agree to be bound by these Terms of Service. We reserve the right to refuse service to anyone for any reason at any time.

      2. PRODUCTS AND PRICING
      Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue a product without notice. We have made every effort to display as accurately as possible the colors and images of our products.

      3. SHIPPING AND RETURNS
      Shipping times are estimates and not guarantees. Our return policy lasts 14 days. If 14 days have gone by since your purchase, unfortunately, we cannot offer you a refund or exchange.

      4. INTELLECTUAL PROPERTY
      All content included on this site, such as text, graphics, logos, images, and software, is the property of Narie Lab Co. and protected by international copyright laws.

      5. GOVERNING LAW
      These Terms of Service shall be governed by and construed in accordance with the laws of Vietnam.
    `
  },
  vi: {
    'nav.shop': 'CỬA HÀNG',
    'nav.collections': 'BỘ SƯU TẬP',
    'nav.ai': 'BÉ RI',
    'nav.story': 'VỀ NARIE',
    'nav.login': 'ĐĂNG NHẬP',
    'nav.shopAll': 'TẤT CẢ SẢN PHẨM',
    'hero.tagline': 'CHẠM TỐI GIẢN, HƯƠNG TỰ NHIÊN',
    'hero.title': 'Nâng tầm không gian sống bằng những mùi hương tinh tế.',
    'hero.subtitle': 'Được làm thủ công với sáp đậu nành tự nhiên và bấc gỗ. Một liệu pháp chữa lành cho ngôi nhà của bạn.',
    'hero.cta_shop': 'Khám Phá Bộ Sưu Tập',
    'hero.cta_ai': 'Hỏi Bé Ri',
    'app.about.title': 'VỀ NARIE',
    'app.about.heading': 'Hơn cả một ngọn nến, là lối sống chữa lành.',
    'app.about.p1': 'Tại Narie, chúng tôi tin rằng mùi hương không chỉ là hương thơm, mà là ký ức, là cảm xúc và là cách để chữa lành tâm hồn. Nến của chúng tôi được chế tác với sự tỉ mỉ cao nhất, sử dụng nguyên liệu bền vững.',
    'app.about.cta': 'Đọc câu chuyện của chúng tôi',
    'app.feat.safe': '100% Sáp Đậu Nành',
    'app.feat.wood': 'Bấc Gỗ Tự Nhiên',
    'app.feat.hand': 'Thủ Công Tỉ Mỉ',
    'app.quote': 'Trong tĩnh lặng, ta tìm thấy chính mình.',
    'director.title': 'LỜI TỰA TỪ GIÁM ĐỐC',
    'director.text': 'Chúng tôi không chỉ làm nến; chúng tôi tạo ra những khoảnh khắc tĩnh lặng giữa thế giới hỗn độn. Hãy để ánh sáng dẫn lối bạn về nhà.',
    'director.signoff': 'GIÁM ĐỐC SÁNG TẠO, NARIE',
    'product.category.signature': 'Bộ Sưu Tập Dấu Ấn',
    'product.category.seasonal': 'Phiên Bản Mùa',
    'product.category.limited': 'Phiên Bản Giới Hạn',
    'product.category.accessory': 'Phụ Kiện',
    'product.category.essential_oil': 'Tinh Dầu',
    'product.quickView': 'Xem Nhanh',
    'product.addToCart': 'Thêm Vào Giỏ',
    'product.added': 'Đã Thêm',
    'product.tab.description': 'Mô Tả',
    'product.tab.details': 'Chi Tiết',
    'product.tab.shipping': 'Giao Hàng',
    'product.burnTime': 'Thời Gian Cháy',
    'product.burnTimeValue': 'Khoảng 50 giờ',
    'product.weight': 'Trọng Lượng',
    'product.weightValue': '8.5 oz / 240g',
    'product.ingredients': 'Thành Phần',
    'product.ingredientsValue': '100% Sáp Đậu Nành Tự Nhiên, Tinh Dầu Cao Cấp, Bấc Gỗ.',
    'product.care': 'Chăm Sóc Nến',
    'product.careValue': 'Cắt bấc còn 0.5cm trước khi đốt. Giữ bề mặt nến sạch sẽ, không để lại vụn bấc hay diêm. Chỉ đốt nến trên bề mặt chịu nhiệt và bằng phẳng. Không đốt quá 4 giờ mỗi lần.',
    'product.shippingValue': 'Miễn phí giao hàng tiêu chuẩn cho đơn hàng trên 1.000.000₫. Thời gian giao hàng dự kiến 3-5 ngày làm việc.',
    'product.returnsPolicy': 'Chính Sách Đổi Trả',
    'product.returnsValue': 'Chúng tôi chấp nhận đổi trả trong vòng 14 ngày kể từ ngày giao hàng. Sản phẩm phải còn nguyên vẹn và chưa qua sử dụng.',
    'product.option.title': 'Chọn Phân Loại',
    'product.option.standard': 'Nến Lẻ',
    'product.option.gift': 'Nến + Hộp Quà (+100k)',
    'products.section.featured': 'BỘ SƯU TẬP NỔI BẬT',
    'products.section.main': 'Thiết Yếu Cho Không Gian',
    'filter.candles': 'Nến Thơm',
    'filter.oils': 'Tinh Dầu',
    'filter.accessories': 'Phụ Kiện',
    'collection.limited.title': 'Khu Vườn Ánh Trăng',
    'collection.limited.desc': 'Một bộ sưu tập huyền bí lấy cảm hứng từ những bí mật của khu vườn lúc nửa đêm. Những mùi hương sâu lắng, nồng nàn và đầy chất thơ.',
    'collection.signature.title': 'The Quiet Seasons',
    'collection.signature.desc': 'Bộ sưu tập cốt lõi tôn vinh vẻ đẹp tinh tế của thiên nhiên qua bốn mùa. Vững chãi, hoài niệm và thuần khiết.',
    'ai.tagline': 'BÉ RI',
    'ai.title': 'Mô tả cảm xúc, Tìm hương của bạn.',
    'ai.subtitle': 'Hãy kể cho chúng tôi cảm giác của bạn, nơi bạn đang ở, hoặc một ký ức bạn trân quý. Bé Ri sẽ chọn ra mùi hương hoàn hảo cho riêng bạn.',
    'ai.placeholder': 'Ví dụ: "Tôi muốn cảm giác như đang đọc sách cũ trong một căn nhà gỗ dưới mưa..."',
    'ai.button.idle': 'Tư Vấn Ngay',
    'ai.button.loading': 'Đang Phân Tích...',
    'ai.error': 'Không thể kết nối với Bé Ri. Vui lòng thử lại.',
    'ai.result.concept': 'CONCEPT MÙI HƯƠNG',
    'ai.result.notes': 'NỐT HƯƠNG CHÍNH',
    'ai.result.why': 'TẠI SAO LẠI PHÙ HỢP',
    'ai.result.again': 'Tư Vấn Lại',
    'ai.empty.text': 'Hành trình mùi hương cá nhân bắt đầu tại đây.',
    'ai.recommendation': 'Bé Ri Gợi Ý',
    'story.full.title': 'Hành Trình Narie',
    'story.full.p1': 'Narie được sinh ra từ một mong muốn đơn giản: sống chậm lại. Trong sự hối hả của cuộc sống hiện đại, chúng ta thường quên thở, quên dừng lại và trân trọng những khoảnh khắc yên tĩnh. Chúng tôi bắt đầu trong một căn bếp nhỏ, thử nghiệm với sáp tự nhiên và tinh dầu, tìm kiếm một mùi hương không chỉ thơm, mà còn mang lại cảm giác dễ chịu.',
    'story.full.p2': 'Tên của chúng tôi bắt nguồn từ sự kết hợp của "Natural" (Tự nhiên) và "Reverie" (Mộng mơ). Chúng tôi tin rằng thiên nhiên nắm giữ chìa khóa cho những giấc mơ và sự chữa lành của chúng ta. Mỗi ngọn nến đều được rót bằng tay, đảm bảo rằng sự ấm áp của con người không bao giờ mất đi. Chúng tôi chỉ sử dụng sáp đậu nành nguồn gốc bền vững và bấc gỗ được chứng nhận FSC, tạo ra tiếng tí tách nhẹ nhàng như một lò sưởi nhỏ.',
    'story.full.p3': 'Hôm nay, Narie không chỉ là một sản phẩm; đó là một cộng đồng của những tâm hồn đồng điệu, những người trân trọng chánh niệm, thẩm mỹ và sức mạnh của mùi hương. Cảm ơn bạn đã để chúng tôi là một phần của ngôi nhà bạn.',
    'cart.title': 'Giỏ Hàng',
    'cart.empty': 'Giỏ hàng của bạn đang trống.',
    'cart.subtotal': 'Tạm tính',
    'cart.checkout': 'Thanh Toán',
    'checkout.step1': 'Thông Tin',
    'checkout.step2': 'Thanh Toán',
    'checkout.billing': 'Địa Chỉ Giao Hàng',
    'checkout.payment': 'Phương Thức Thanh Toán',
    'checkout.summary': 'Đơn Hàng',
    'checkout.total': 'Tổng Cộng',
    'checkout.next': 'Tiếp Tục Thanh Toán',
    'checkout.back': 'Quay Lại',
    'checkout.submit': 'Đặt Hàng',
    'checkout.processing': 'Đang Xử Lý...',
    'checkout.successTitle': 'Cảm Ơn Bạn!',
    'checkout.successDesc': 'Đơn hàng của bạn đã được xác nhận. Chúng tôi đã gửi hóa đơn vào email của bạn.',
    'checkout.backShop': 'Tiếp Tục Mua Sắm',
    'checkout.name': 'Họ Tên',
    'checkout.email': 'Email',
    'checkout.phone': 'Số Điện Thoại',
    'checkout.address': 'Địa Chỉ',
    'checkout.city': 'Thành Phố',
    'checkout.cod': 'Thanh toán khi nhận hàng (COD)',
    'checkout.qr': 'Chuyển khoản ngân hàng (QR)',
    'checkout.qrDesc': 'Quét mã bằng ứng dụng ngân hàng',
    'footer.desc': 'Hương thơm nghệ thuật cho tâm hồn hiện đại. Được chế tác thủ công với sự tận tâm và nguyên liệu tự nhiên.',
    'footer.contact.title': 'Liên Hệ',
    'footer.contact.address': '123 Đường Thơ, Quận 1, TP.HCM',
    'footer.contact.email': 'hello@narie.com',
    'footer.contact.phone': '090 123 4567',
    'footer.newsletter': 'Bản Tin',
    'footer.newsletter_desc': 'Đăng ký để nhận cập nhật, ưu đãi độc quyền và nhiều hơn nữa.',
    'footer.subscribe': 'Đăng Ký',
    'footer.subscribing': 'Đang Xử Lý...',
    'footer.subscribe_success': 'Đã Đăng Ký!',
    'footer.rights': 'Bảo lưu mọi quyền.',
    'footer.links.privacy': 'Chính Sách Riêng Tư',
    'footer.links.terms': 'Điều Khoản Dịch Vụ',

    // LEGAL CONTENT
    'legal.privacy.content': `
      1. THU THẬP THÔNG TIN
      Chúng tôi thu thập thông tin cá nhân như tên, địa chỉ email, địa chỉ giao hàng và số điện thoại khi bạn đặt hàng hoặc đăng ký nhận bản tin. Chúng tôi không lưu trữ thông tin thẻ tín dụng trên máy chủ của mình.

      2. SỬ DỤNG THÔNG TIN
      Thông tin của bạn chỉ được sử dụng để xử lý đơn hàng, cải thiện website và liên lạc với bạn về đơn hàng hoặc sản phẩm của chúng tôi.

      3. COOKIES
      Chúng tôi sử dụng cookies để nâng cao trải nghiệm duyệt web của bạn và phân tích lưu lượng truy cập trang web. Bạn có thể chọn tắt cookies thông qua cài đặt trình duyệt của mình.

      4. BẢO VỆ DỮ LIỆU
      Chúng tôi thực hiện các biện pháp bảo mật để duy trì sự an toàn cho thông tin cá nhân của bạn. Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin nhận dạng cá nhân của bạn cho bên thứ ba.

      5. DỊCH VỤ BÊN THỨ BA
      Chúng tôi có thể sử dụng dịch vụ của bên thứ ba (ví dụ: cổng thanh toán, đơn vị vận chuyển), những bên này có chính sách bảo mật riêng. Chúng tôi khuyến khích bạn xem xét chính sách của họ.
    `,
    'legal.terms.content': `
      1. ĐIỀU KHOẢN CHUNG
      Bằng cách truy cập trang web này, bạn đồng ý bị ràng buộc bởi các Điều khoản Dịch vụ này. Chúng tôi bảo lưu quyền từ chối dịch vụ cho bất kỳ ai vì bất kỳ lý do gì vào bất kỳ lúc nào.

      2. SẢN PHẨM VÀ GIÁ CẢ
      Giá của các sản phẩm có thể thay đổi mà không cần thông báo trước. Chúng tôi bảo lưu quyền sửa đổi hoặc ngừng sản phẩm vào bất kỳ lúc nào. Chúng tôi đã nỗ lực hết sức để hiển thị chính xác nhất có thể màu sắc và hình ảnh của sản phẩm.

      3. GIAO HÀNG VÀ ĐỔI TRẢ
      Thời gian giao hàng là ước tính và không đảm bảo. Chính sách đổi trả của chúng tôi kéo dài 14 ngày. Nếu đã qua 14 ngày kể từ khi bạn mua hàng, rất tiếc chúng tôi không thể hoàn tiền hoặc đổi hàng cho bạn.

      4. SỞ HỮU TRÍ TUỆ
      Tất cả nội dung trên trang web này, chẳng hạn như văn bản, đồ họa, logo, hình ảnh và phần mềm, là tài sản của Narie Lab Co. và được bảo vệ bởi luật bản quyền quốc tế.

      5. LUẬT ÁP DỤNG
      Các Điều khoản Dịch vụ này sẽ được điều chỉnh và giải thích theo luật pháp của Việt Nam.
    `
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Automatically sync currency with language
  useEffect(() => {
    if (language === 'vi') {
      setCurrency('VND');
    } else {
      setCurrency('USD');
    }
  }, [language]);

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'VND' : 'USD');
  };

  const formatPrice = (price: number, priceVND: number) => {
    if (currency === 'USD') {
      return `$${price.toFixed(2)}`;
    } else {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceVND);
    }
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      currency,
      setCurrency,
      toggleCurrency,
      formatPrice,
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};