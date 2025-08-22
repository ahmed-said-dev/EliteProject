import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faArrowLeft, 
  faCreditCard,
  faShieldAlt,
  faTruck,
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/context/LanguageContext';
import { useUnifiedCart } from '@/context/UnifiedCartContext';
import { useNotifications } from '@/context/NotificationContext';
import { eliteApi } from '@/lib/eliteApi';
import { formatCurrency } from '@/lib/currency';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const { state, getCartTotal, getCartCount, clearCart } = useUnifiedCart();
  const { addNotification } = useNotifications();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingCountry: 'Egypt',
    billingAddress: '',
    billingCity: '',
    billingCountry: 'Egypt',
    notes: '',
    paymentMethod: 'cash_on_delivery'
  });

  const formatPrice = (price: number) => formatCurrency(price, isRTL ? 'ar' : 'en');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.items.filter(item => item.source === 'elite-store').length === 0) {
      addNotification({
        type: 'error',
        title: 'خطأ',
        message: 'لا توجد منتجات من متجر Elite في السلة'
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['customerFirstName', 'customerLastName', 'customerEmail', 'customerPhone', 'shippingAddress', 'shippingCity', 'shippingCountry'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      addNotification({
        type: 'error',
        title: 'يرجى تعبئة جميع الحقول المطلوبة',
        message: `حقول مفقودة: ${missingFields.join(', ')}`,
        duration: 5000
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare order items - ensure we only include Elite Store items
      const orderItems = state.items
        .filter(item => item.source === 'elite-store') // Only Elite Store items
        .map(item => ({
          productId: item.productId || item.id,
          productName: item.name,
          productSku: item.sku || `SKU-${item.id}`,
          quantity: item.quantity,
          price: item.salePrice || item.price
        }));

      // Calculate totals for Elite Store items only
      const eliteStoreItems = state.items.filter(item => item.source === 'elite-store');
      const subtotal = eliteStoreItems.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
      const shippingCost = subtotal > 500 ? 0 : 50;
      const taxAmount = subtotal * 0.14;

      const orderData = {
        customerFirstName: formData.customerFirstName,
        customerLastName: formData.customerLastName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        shippingCountry: formData.shippingCountry,
        billingAddress: formData.billingAddress,
        billingCity: formData.billingCity,
        billingCountry: formData.billingCountry,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        items: orderItems,
        shippingCost,
        taxAmount,
        discountAmount: 0
      };

      console.log('🚀 Sending order data to backend:', orderData);
      const order: any = await eliteApi.createOrder(orderData);
      console.log('✅ Order created successfully:', order);
      
      // Clear cart on successful order
      clearCart();
      
      addNotification({
        type: 'success',
        title: 'تم إنشاء الطلب بنجاح!',
        message: `رقم الطلب: ${order?.orderNumber || 'غير متاح'}`,
        duration: 8000
      });

      // Redirect to products page
      router.push('/products');
      
    } catch (error: any) {
      console.error('❌ Order creation failed:', error);
      console.error('❌ Error details:', error.response || error.message);
      addNotification({
        type: 'error',
        title: 'فشل في إنشاء الطلب',
        message: error.message || 'حدث خطأ غير متوقع'
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals for Elite Store items only
  const eliteStoreItems = state.items.filter(item => item.source === 'elite-store');
  const subtotal = eliteStoreItems.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
  const shippingCost = subtotal > 500 ? 0 : 50;
  const taxAmount = subtotal * 0.14;
  const total = subtotal + shippingCost + taxAmount;

  if (eliteStoreItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">السلة فارغة</h2>
          <button
            onClick={() => router.push('/products')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            تصفح المنتجات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/cart')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            العودة للسلة
          </button>
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
            إتمام الطلب
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="text-purple-600" />
                    البيانات الشخصية
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الأول *
                      </label>
                      <input
                        type="text"
                        name="customerFirstName"
                        value={formData.customerFirstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الأخير *
                      </label>
                      <input
                        type="text"
                        name="customerLastName"
                        value={formData.customerLastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faPhone} className="mr-2" />
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTruck} className="text-purple-600" />
                    عنوان الشحن
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      العنوان *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المدينة *
                      </label>
                      <input
                        type="text"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الدولة *
                      </label>
                      <select
                        name="shippingCountry"
                        value={formData.shippingCountry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Egypt">{t('countries.egypt')}</option>
                        <option value="Saudi Arabia">{t('countries.saudi')}</option>
                        <option value="UAE">{t('countries.uae')}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCreditCard} className="text-purple-600" />
                    طريقة الدفع
                  </h3>
                </div>
                <div className="p-6">
                  <div className="border border-gray-200 rounded-xl p-4 bg-green-50">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={formData.paymentMethod === 'cash_on_delivery'}
                        onChange={handleInputChange}
                        className="text-purple-600"
                      />
                      <span className="font-medium">الدفع عند الاستلام</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-2 mr-6">
                      ادفع نقداً عند وصول المنتج إليك
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 overflow-hidden">
                <div className="p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="أي ملاحظات خاصة لطلبك..."
                  />
                </div>
              </div>
            </form>
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
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {eliteStoreItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-bold text-purple-600">
                        {formatPrice((item.salePrice || item.price) * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Calculations */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الشحن</span>
                    <span className="font-bold">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">مجاني</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الضريبة</span>
                    <span className="font-bold">{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-lg font-black">الإجمالي</span>
                    <span className="text-2xl font-black text-purple-600">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                  معاملة آمنة ومحمية
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-4 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-300/50 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  ) : (
                    <FontAwesomeIcon icon={faCreditCard} />
                  )}
                  {loading ? 'جاري الإرسال...' : `تأكيد الطلب - ${formatPrice(total)}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
