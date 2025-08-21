import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faArrowLeft, 
  faPlus, 
  faMinus, 
  faTrash,
  faShoppingBag,
  faHeart,
  faCreditCard,
  faShieldAlt,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/context/LanguageContext';
import { useUnifiedCart } from '@/context/UnifiedCartContext';
import { formatCurrency } from '@/lib/currency';

const UnifiedCartPage: React.FC = () => {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const { 
    state, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getCartTotal,
    getCartCount 
  } = useUnifiedCart();

  const formatPrice = (price: number) => formatCurrency(price, isRTL ? 'ar' : 'en');

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page using Next.js router
    router.push('/checkout');
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping over 500 EGP
  const taxRate = 0.14; // 14% VAT
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-indigo-200/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-100/10 to-violet-100/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <FontAwesomeIcon 
                icon={faShoppingCart} 
                className="text-5xl text-purple-500"
              />
            </div>
            
            <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
              السلة فارغة
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. تصفح منتجاتنا واختر ما يناسبك!
            </p>
            
            <Link 
              href="/products" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-300/50"
            >
              <FontAwesomeIcon icon={faShoppingBag} />
              تصفح المنتجات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-gradient-to-br from-indigo-200/40 to-transparent rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-violet-200/25 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-purple-300/35 to-transparent rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
              سلة التسوق
            </h1>
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full">
              <span className="text-purple-700 font-bold">
                {getCartCount()} منتج
              </span>
            </div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 overflow-hidden">
              {state.items.map((item) => (
                <div key={item.id} className="border-b border-purple-100/50 last:border-b-0">
                  <div className="p-6 hover:bg-purple-50/30 transition-colors duration-200">
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-white to-purple-50 rounded-2xl overflow-hidden shadow-lg border border-purple-100/50">
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        {item.source === 'elite-store' && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">E</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                              {item.name}
                            </h3>
                            {item.sku && (
                              <p className="text-sm text-gray-500">
                                رقم المنتج: {item.sku}
                              </p>
                            )}
                            {item.category && (
                              <p className="text-sm text-purple-600 font-medium">
                                {item.category.name}
                              </p>
                            )}
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-xl transition-colors duration-200"
                            title="إزالة من السلة"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {item.salePrice && item.salePrice !== item.price ? (
                              <>
                                <span className="text-lg font-bold text-purple-600">
                                  {formatPrice(item.salePrice)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.price)}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-purple-600">
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 rounded-lg bg-white hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-purple-600 transition-colors duration-200"
                            >
                              <FontAwesomeIcon icon={faMinus} className="text-xs" />
                            </button>
                            
                            <span className="w-12 text-center font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                              className="w-8 h-8 rounded-lg bg-white hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-purple-600 transition-colors duration-200"
                            >
                              <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="mt-2 text-right">
                          <span className="text-lg font-black text-gray-800">
                            الإجمالي: {formatPrice((item.salePrice || item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href="/products"
                className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-md hover:bg-white text-purple-600 hover:text-purple-700 px-6 py-3 rounded-2xl font-bold transition-all duration-300 border border-purple-200/50 hover:border-purple-300/50"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                متابعة التسوق
              </Link>
              
              <button
                onClick={clearCart}
                className="flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-6 py-3 rounded-2xl font-bold transition-all duration-300 border border-red-200/50 hover:border-red-300/50"
              >
                <FontAwesomeIcon icon={faTrash} />
                إفراغ السلة
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-200/50 overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
                <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-purple-600" />
                  ملخص الطلب
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {/* Summary Rows */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-bold text-gray-800">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTruck} className="text-purple-500" />
                    الشحن
                  </span>
                  <span className="font-bold text-gray-800">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">مجاني</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">الضريبة (14%)</span>
                  <span className="font-bold text-gray-800">{formatPrice(taxAmount)}</span>
                </div>

                <div className="border-t border-purple-200/50 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-gray-800">الإجمالي</span>
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {subtotal < 500 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200/50">
                    <p className="text-sm text-green-700 text-center">
                      أضف منتجات بقيمة {formatPrice(500 - subtotal)} للحصول على شحن مجاني!
                    </p>
                  </div>
                )}

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                  دفع آمن ومحمي
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={state.loading || state.items.length === 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-4 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-300/50 flex items-center justify-center gap-3"
                >
                  <FontAwesomeIcon icon={faCreditCard} />
                  إتمام الطلب - {formatPrice(total)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedCartPage;
