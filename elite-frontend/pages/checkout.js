import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faTruck,
  faCreditCard,
  faUser,
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { useUnifiedCart } from '@/context/UnifiedCartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNotifications } from '@/context/NotificationContext';
import { eliteApi } from '@/lib/eliteApi';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, getCartTotal, getCartCount, clearCart } = useUnifiedCart();
  const { t } = useLanguage();
  const { addNotification } = useNotifications();
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
    paymentMethod: 'cash_on_delivery',
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const formatPrice = (price, currency = 'EGP') => {
    return `${Math.round(price)} ج.م`;
  };

  // Calculate totals for Elite Store items only
  const eliteStoreItems = state.items.filter(item => item.source === 'elite-store');
  const subtotal = eliteStoreItems.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
  const shippingCost = subtotal > 500 ? 0 : 50;
  const taxRate = 0.14;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if we have Elite Store items
    const eliteStoreItems = state.items.filter(item => item.source === 'elite-store');
    if (eliteStoreItems.length === 0) {
      addNotification({
        type: 'error',
        title: 'خطأ',
        message: 'لا توجد منتجات من متجر Elite في السلة'
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['customerFirstName', 'customerLastName', 'customerEmail', 'customerPhone', 'shippingAddress', 'shippingCity', 'shippingCountry'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      addNotification({
        type: 'error',
        title: 'يرجى تعبئة جميع الحقول المطلوبة',
        message: `حقول مفقودة: ${missingFields.join(', ')}`,
        duration: 5000
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order items - ensure we only include Elite Store items
      const orderItems = eliteStoreItems.map(item => ({
        productId: item.productId || item.id,
        productName: item.name,
        productSku: item.sku || `SKU-${item.id}`,
        quantity: item.quantity,
        price: item.salePrice || item.price
      }));

      // Calculate totals for Elite Store items only
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
        billingAddress: formData.billingAddress || formData.shippingAddress,
        billingCity: formData.billingCity || formData.shippingCity,
        billingCountry: formData.billingCountry || formData.shippingCountry,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        items: orderItems,
        shippingCost,
        taxAmount,
        discountAmount: 0
      };

      console.log('🚀 Sending order data to backend:', orderData);
      const order = await eliteApi.createOrder(orderData);
      console.log('✅ Order created successfully:', order);
      
      // Clear cart on successful order
      clearCart();
      
      addNotification({
        type: 'success',
        title: 'تم إنشاء الطلب بنجاح!',
        message: `رقم الطلب: ${order?.orderNumber || 'غير متاح'}`,
        duration: 8000
      });

      // Set order complete state
      setOrderComplete(true);
      
    } catch (error) {
      console.error('❌ Order creation failed:', error);
      addNotification({
        type: 'error',
        title: 'فشل في إنشاء الطلب',
        message: error.message || 'حدث خطأ غير متوقع'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect to cart if empty or no Elite Store items
  if (eliteStoreItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <PageBanner
          title="إتمام الطلب"
          breadcrumbs={[
            { label: 'الرئيسية', url: '/' },
            { label: 'السلة', url: '/cart' },
            { label: 'إتمام الطلب', url: '/checkout' }
          ]}
        />
        
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-5xl text-red-500" />
            </div>
            <h2 className="text-3xl font-black mb-4 text-gray-800">السلة فارغة</h2>
            <p className="text-gray-600 mb-8">لا يمكنك إتمام الطلب بدون منتجات في السلة</p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              تصفح المنتجات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Order completion page
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <PageBanner
          title="تم إتمام الطلب بنجاح"
          backgroundImage="https://images.pexels.com/photos/4498651/pexels-photo-4498651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-green-500" />
            </div>
            
            <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
              تم إتمام طلبك بنجاح!
            </h1>
            
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-green-200/50 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">تفاصيل الطلب</h3>
              <div className="space-y-3 text-right">
                <div className="flex justify-between">
                  <span className="text-gray-600">رقم الطلب:</span>
                  <span className="font-bold text-green-600">#ORD-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي الطلب:</span>
                  <span className="font-bold text-gray-800">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">طريقة الدفع:</span>
                  <span className="font-bold text-gray-800">
                    {formData.paymentMethod === 'cash_on_delivery' ? 'الدفع عند الاستلام' : 'بطاقة ائتمان'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">وقت التسليم المتوقع:</span>
                  <span className="font-bold text-gray-800">2-3 أيام عمل</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200/50 mb-8">
              <p className="text-yellow-800 text-lg font-medium">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                سيتم التواصل معك خلال 24 ساعة لتأكيد الطلب وترتيب التسليم
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300"
              >
                متابعة التسوق
              </Link>
              <Link 
                href="/"
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-8 py-3 rounded-xl font-bold transition-all duration-300"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <PageBanner
        title="إتمام الطلب"
        breadcrumbs={[
          { label: 'الرئيسية', url: '/' },
          { label: 'السلة', url: '/cart' },
          { label: 'إتمام الطلب', url: '/checkout' }
        ]}
        backgroundImage="https://images.pexels.com/photos/4498651/pexels-photo-4498651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 p-6">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faUser} className="text-purple-600" />
                المعلومات الشخصية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الأول *</label>
                  <input
                    type="text"
                    name="customerFirstName"
                    value={formData.customerFirstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="أدخل الاسم الأول"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الأخير *</label>
                  <input
                    type="text"
                    name="customerLastName"
                    value={formData.customerLastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="أدخل الاسم الأخير"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="example@domain.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 p-6">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-purple-600" />
                عنوان التسليم
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">العنوان التفصيلي *</label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="أدخل العنوان التفصيلي..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">المدينة *</label>
                    <input
                      type="text"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="القاهرة"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">البلد *</label>
                    <select
                      name="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Egypt">مصر</option>
                      <option value="Saudi">السعودية</option>
                      <option value="UAE">الإمارات</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 p-6">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faCreditCard} className="text-purple-600" />
                طريقة الدفع
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-purple-50 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={handleInputChange}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faTruck} className="text-green-600" />
                    <span className="font-medium">الدفع عند الاستلام</span>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-purple-50 cursor-pointer opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleInputChange}
                    disabled
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCreditCard} className="text-blue-600" />
                    <span className="font-medium">بطاقة ائتمان (قريباً)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200/30 p-6">
              <h3 className="text-xl font-black text-gray-800 mb-6">ملاحظات إضافية</h3>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="أي ملاحظات أو طلبات خاصة (اختياري)..."
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-200/50 overflow-hidden sticky top-8">
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
                <h3 className="text-xl font-black text-gray-800">ملخص الطلب</h3>
              </div>

              <div className="p-6 space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {eliteStoreItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-800 truncate">
                          {item.name}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">
                            الكمية: {item.quantity}
                          </span>
                          <span className="text-sm font-bold text-purple-600">
                            {formatPrice((item.salePrice || item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
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
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-gray-800">الإجمالي</span>
                      <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                  دفع آمن ومحمي
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-4 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-300/50 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      تأكيد الطلب - {formatPrice(total)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
