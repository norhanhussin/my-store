import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Navbar
    home:             'Home',
    cart:             'Cart',
    // Hero
    heroTag:          '★ New arrivals just dropped',
    heroTitle1:       'Shop smarter,',
    heroTitle2:       'live',
    heroTitle3:       'better',
    heroSub:          'Curated products from DummyJSON.',
    shopNow:          'Shop now',
    viewColl:         'View collections',
    // Toolbar
    all:              'All',
    products:         'products',
    showing:          'Showing:',
    allProducts:      'All Products',
    currBrowse:       'Currently Browsing:',
    // Cards
    details:          'Details',
    addToCart:        '+ Cart',
    lowStock:         'Low stock',
    // Cart
    yourCart:         'Your Cart',
    items:            'items',
    perItem:          '/ item',
    shipping:         'Shipping',
    free:             'Free',
    total:            'Total',
    checkout:         'Checkout →',
    emptyCart:        'Your cart is empty',
    emptySub:         "Looks like you haven't added anything yet.",
    continueShopping: 'Continue shopping',
    // Product Details
    back:             '← Back',
    addToCartFull:    'Add to cart',
    reviews:          'reviews',
    by:               'by',
    productId:        'Product ID',
    description:      'Description',
    // 404
    notFound:         'Page Not Found',
    notFoundSub:      "This page doesn't exist.",
    goHome:           '← Go Home',
    // Footer
    rights:           'All rights reserved.',
    privacy:          'Privacy',
    terms:            'Terms',
    contact:          'Contact',
  },
  ar: {
    // Navbar
    home:             'الرئيسية',
    cart:             'السلة',
    // Hero
    heroTag:          '★ وصلت منتجات جديدة',
    heroTitle1:       'تسوق بذكاء،',
    heroTitle2:       'عيش',
    heroTitle3:       'أفضل',
    heroSub:          'منتجات مختارة بعناية من DummyJSON.',
    shopNow:          'تسوق الآن',
    viewColl:         'عرض المجموعات',
    // Toolbar
    all:              'الكل',
    products:         'منتج',
    showing:          ':يعرض',
    allProducts:      'كل المنتجات',
    currBrowse:       ':تصفح الآن',
    // Cards
    details:          'التفاصيل',
    addToCart:        '+ السلة',
    lowStock:         'كمية محدودة',
    // Cart
    yourCart:         'سلة التسوق',
    items:            'منتجات',
    perItem:          '/ للقطعة',
    shipping:         'الشحن',
    free:             'مجاني',
    total:            'الإجمالي',
    checkout:         'إتمام الشراء ←',
    emptyCart:        'سلتك فارغة',
    emptySub:         'يبدو أنك لم تضف أي منتجات بعد.',
    continueShopping: 'تابع التسوق',
    // Product Details
    back:             'رجوع ←',
    addToCartFull:    'أضف للسلة',
    reviews:          'تقييم',
    by:               'من',
    productId:        'رقم المنتج',
    description:      'الوصف',
    // 404
    notFound:         'الصفحة غير موجودة',
    notFoundSub:      'هذه الصفحة غير موجودة.',
    goHome:           'الرئيسية ←',
    // Footer
    rights:           'جميع الحقوق محفوظة.',
    privacy:          'الخصوصية',
    terms:            'الشروط',
    contact:          'تواصل معنا',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  const t    = (key) => translations[language][key] || key;
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}