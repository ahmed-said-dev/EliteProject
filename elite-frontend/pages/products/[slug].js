import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faShoppingCart, 
  faStar, 
  faStarHalfAlt,
  faArrowLeft,
  faShare,
  faCheck,
  faTimes,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

import { useSaleorProduct } from '@/hooks/useSaleorProducts';
import { useStoreProduct } from '@/hooks/useStoreProduct';
import { useCart } from '@/context/SaleorCartContext';
import { useUnifiedCart } from '@/context/UnifiedCartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/currency';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const { addToCart: addToSaleorCart } = useCart();
  const { addToCart: addToUnifiedCart, isInCart, getCartItem } = useUnifiedCart();
  
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Decide data source: if slug looks like UUID (backend id), use store backend; else use Saleor by slug
  const isUuid = typeof slug === 'string' && /^[0-9a-fA-F-]{32,36}$/.test(slug)
  const { product: storeProduct, related, loading: loadingStore, error: errorStore } = useStoreProduct(isUuid ? slug : undefined)
  const { product: saleorProduct, loading: loadingSaleor, error: errorSaleor } = useSaleorProduct(!isUuid ? slug : undefined);
  const product = isUuid ? storeProduct : saleorProduct;
  const loading = isUuid ? loadingStore : loadingSaleor;
  const error = isUuid ? errorStore : errorSaleor;

  // Set default variant when product loads
  React.useEffect(() => {
    if (product && product.variants && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product, selectedVariant]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      if (isUuid) {
        // Add to unified cart for Elite Store Backend products
        await addToUnifiedCart({
          name: product.name,
          price: product.price || 0,
          salePrice: product.salePrice,
          image: mainImage,
          source: 'elite-store',
          productId: product.id,
          stockQuantity: product.stockQuantity,
          maxQuantity: product.stockQuantity,
          sku: product.sku,
          category: product.category ? {
            id: product.category.id,
            name: product.category.name
          } : undefined,
        }, quantity);
        console.log('تم إضافة المنتج إلى السلة بنجاح');
      } else {
        // Add to Saleor cart for Saleor products
        if (!selectedVariant) return;
        await addToSaleorCart(selectedVariant.id, quantity);
        console.log('تم إضافة المنتج إلى السلة بنجاح');
      }
      
      // Show success state
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Show error message here
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (amount, currency) => {
    return formatCurrency(amount, 'ar');
  };

    const getProductPrice = () => {
    if (!product) return { amount: 0, currency: 'USD' }
    // Saleor pricing
    if (!isUuid) {
      if (selectedVariant && selectedVariant.pricing?.price) {
        return selectedVariant.pricing.price.gross
      }
      if (product?.pricing?.priceRange?.start) {
        return product.pricing.priceRange.start.gross
      }
      return { amount: 0, currency: 'USD' }
    }
    // Store backend pricing
    const amount = (product.salePrice ?? product.price ?? 0)
    return { amount, currency: 'SAR' }
  }

  const getOriginalPrice = () => {
    if (!product || !isUuid) return null
    if (product.salePrice && product.price && product.salePrice !== product.price) {
      return { amount: product.price, currency: 'SAR' }
    }
    return null
  }

  const getDiscountPercentage = () => {
    if (!product || !isUuid) return 0
    if (product.salePrice && product.price && product.salePrice !== product.price) {
      return Math.round(((product.price - product.salePrice) / product.price) * 100)
    }
    return 0
  }

  const isProductAvailable = () => {
    if (!product) return false
    if (isUuid) {
      return product.status === 'active' && product.stockQuantity > 0
    }
    return product.isAvailableForPurchase
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-purple-600 mb-4" />
          <p className="text-gray-600">{t('productDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('productDetail.notFound')}</h1>
          <p className="text-gray-600 mb-8">{t('productDetail.notFoundDesc')}</p>
          <Link href="/products" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            {t('productDetail.backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  const price = getProductPrice();
  const originalPrice = getOriginalPrice();
  const discountPercentage = getDiscountPercentage();
  const isAvailable = isProductAvailable();
  const mainImage = product?.images?.[selectedImageIndex]?.url || product?.thumbnail?.url || '/placeholder-product.jpg';

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-50 via-white to-indigo-50" style={{ paddingBottom: '100px' }} dir={dir}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-violet-200/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-300/25 rounded-full blur-lg animate-bounce delay-500"></div>
        
        {/* Pet-themed decorative SVG patterns */}
        <div className="absolute top-32 right-32 opacity-5">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M30 45c8.284 0 15-6.716 15-15s-6.716-15-15-15-15 6.716-15 15 6.716 15 15 15z" fill="currentColor" className="text-purple-600"/>
            <circle cx="22" cy="22" r="3" fill="currentColor" className="text-purple-800"/>
            <circle cx="38" cy="22" r="3" fill="currentColor" className="text-purple-800"/>
            <path d="M30 32c3 0 5-2 5-4h-10c0 2 2 4 5 4z" fill="currentColor" className="text-purple-800"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-20 opacity-5 rotate-12">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path d="M25 40c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12z" fill="currentColor" className="text-indigo-600"/>
            <ellipse cx="19" cy="20" rx="2" ry="3" fill="currentColor" className="text-indigo-800"/>
            <ellipse cx="31" cy="20" rx="2" ry="3" fill="currentColor" className="text-indigo-800"/>
          </svg>
        </div>
      </div>

      <PageBanner 
        title={product.name}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/' },
          { label: 'المنتجات', href: '/products' },
          { label: product.name, href: '#' }
        ]}
      />

      <div className="container mx-auto px-4 pt-24 pb-28 relative z-10">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors mt-10"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          العودة
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden shadow-2xl border border-purple-100/50 backdrop-blur-sm relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {product?.images && product.images.length > 0 ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-product.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                  <div className="text-center text-purple-600">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-semibold">صورة المنتج</p>
                    <p className="text-sm opacity-70">غير متوفرة</p>
                  </div>
                </div>
              )}
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product?.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      selectedImageIndex === index 
                        ? 'border-purple-600 shadow-xl shadow-purple-200/50 ring-2 ring-purple-200/50' 
                        : 'border-purple-200/50 hover:border-purple-400/70 shadow-lg hover:shadow-purple-100/50'
                    } backdrop-blur-sm`}
                  >
                    <Image
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-violet-500/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-200/50 relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-300/30 via-indigo-300/20 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-300/30 via-purple-300/20 to-transparent rounded-tr-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/10 via-indigo-200/10 to-violet-200/10 rounded-full blur-3xl"></div>
            {/* Category */}
            {product.category && (
              <div className="relative z-10">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                {product.category.name}
                </span>
              </div>
            )}

            {/* Product Name */}
            <div className="relative z-10">
              <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent leading-tight tracking-tight">
              {product.name}
            </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mt-3"></div>
            </div>

            {/* Rating */}
            <div className="relative z-10 flex items-center gap-4 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-200/50 shadow-sm">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className="text-yellow-500 text-xl drop-shadow-sm hover:scale-110 transition-transform cursor-pointer"
                  />
                ))}
              </div>
              <span className="text-gray-700 font-medium bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                ⭐ (25 تقييم)
              </span>
            </div>

                        {/* Price */}
            <div className="relative z-10 flex items-center justify-between bg-gradient-to-r from-white/70 via-purple-50/50 to-indigo-50/50 backdrop-blur-sm p-6 rounded-2xl border border-purple-300/30 shadow-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {formatPrice(price.amount, price.currency)}
                  </span>
                  {originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(originalPrice.amount, originalPrice.currency)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">شامل الضريبة</span>
                  {isUuid && product.stockQuantity && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      متوفر {product.stockQuantity} قطعة
                    </span>
                  )}
                </div>
              </div>
              {isAvailable ? (
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></div>
                  متوفر
                </span>
              ) : (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-200 rounded-full"></div>
                  غير متوفر
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <div className="relative z-10 space-y-3">
                <h3 className="font-semibold text-gray-900">الخيارات المتاحة:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky Add to Cart Section */}
            <div className="relative z-10 sticky top-4 bg-gradient-to-r from-white/90 via-purple-50/80 to-indigo-50/80 backdrop-blur-lg p-6 rounded-2xl border border-purple-300/50 shadow-xl">
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border-2 border-purple-200 rounded-xl bg-white/70 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-purple-50 transition-colors text-purple-600 font-bold"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-bold text-gray-800 bg-purple-50/50">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-purple-50 transition-colors text-purple-600 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable || isAddingToCart}
                  className={`flex-1 px-6 py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 disabled:hover:scale-100 text-lg ${
                    addedToCart
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-green-300/50'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-300/50'
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="text-xl" />
                      جاري الإضافة...
                    </>
                  ) : addedToCart ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} className="text-xl" />
                      تم الإضافة بنجاح!
                    </>
                  ) : !isAvailable ? (
                    <>
                      <FontAwesomeIcon icon={faTimes} className="text-xl" />
                      غير متوفر
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                      أضف للسلة - {formatPrice(price.amount, price.currency)}
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-4 py-4 rounded-xl border-2 transition-all shadow-sm ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-600 shadow-red-200/50'
                      : 'border-gray-300 hover:border-red-300 hover:text-red-600 bg-white/70 hover:bg-red-50/50'
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-xl" />
                </button>
              </div>
            </div>

            {/* Description */}
            {(product.description || product.shortDescription) && (
              <div className="relative z-10 bg-gradient-to-r from-white/60 via-purple-50/40 to-indigo-50/40 backdrop-blur-sm p-6 rounded-2xl border border-purple-300/30 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></span>
                  وصف المنتج
                </h3>
                {product.shortDescription && (
                  <div className="mb-4 p-4 bg-white/70 rounded-xl border border-purple-100/50">
                    <p className="text-purple-800 font-medium text-lg leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                )}
                {product.description && (
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Product Details Section */}
            {isUuid && (
              <div className="relative z-10 bg-gradient-to-r from-white/60 via-purple-50/40 to-violet-50/40 backdrop-blur-sm p-6 rounded-2xl border border-purple-300/30 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-purple-600 to-violet-600 rounded-full"></span>
                  تفاصيل المنتج
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.sku && (
                    <div className="bg-white/70 p-3 rounded-xl">
                      <span className="text-sm text-gray-600 block">رقم المنتج</span>
                      <span className="font-bold text-gray-800">{product.sku}</span>
                    </div>
                  )}
                  {product.category && (
                    <div className="bg-white/70 p-3 rounded-xl">
                      <span className="text-sm text-gray-600 block">التصنيف</span>
                      <span className="font-bold text-purple-700">{product.category.name}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="bg-white/70 p-3 rounded-xl">
                      <span className="text-sm text-gray-600 block">الوزن</span>
                      <span className="font-bold text-gray-800">{product.weight} كيلو</span>
                    </div>
                  )}
                  {product.viewsCount && (
                    <div className="bg-white/70 p-3 rounded-xl">
                      <span className="text-sm text-gray-600 block">المشاهدات</span>
                      <span className="font-bold text-gray-800">{product.viewsCount}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Collections / Tags */}
            {!isUuid && product.collections && product.collections.length > 0 && (
              <div className="relative z-10 space-y-2">
                <h3 className="font-semibold text-gray-900">المجموعات:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.collections.map((collection) => (
                    <span
                      key={collection.id}
                      className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                    >
                      {collection.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {isUuid && product?.tags && product.tags.length > 0 && (
              <div className="relative z-10 space-y-2">
                <h3 className="font-semibold text-gray-900">الوسوم:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related products (Store backend) */}
            {isUuid && Array.isArray(related) && related.length > 0 && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">منتجات ذات صلة</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/products/${r.id}`}
                      className="group bg-white rounded-xl p-3 border border-gray-100 hover:border-purple-300 shadow-sm hover:shadow-lg transition-all"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-50">
                        {r.images?.[0]?.url && (
                          <img src={r.images[0].url} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">{r.name}</div>
                        {typeof r.price === 'number' && (
                          <div className="text-purple-600 font-bold mt-1">{formatCurrency(r.salePrice ?? r.price, 'ar')}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href
                    });
                  }
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FontAwesomeIcon icon={faShare} />
                مشاركة المنتج
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}