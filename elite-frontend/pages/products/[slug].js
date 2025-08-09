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
import { useLanguage } from '@/context/LanguageContext';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useLanguage();
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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
    if (!selectedVariant) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart(selectedVariant.id, quantity);
      // Show success message or notification here
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Show error message here
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (amount, currency) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
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
    return { amount, currency: 'EGP' }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-purple-600 mb-4" />
          <p className="text-gray-600">جاري تحميل المنتج...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">المنتج غير موجود</h1>
          <p className="text-gray-600 mb-8">عذراً، لم نتمكن من العثور على هذا المنتج</p>
          <Link href="/products" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            العودة للمنتجات
          </Link>
        </div>
      </div>
    );
  }

  const price = getProductPrice();
  const mainImage = product?.images?.[selectedImageIndex]?.url || product?.thumbnail?.url || '/placeholder-product.jpg';

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner 
        title={product.name}
        breadcrumbs={[
          { label: 'الرئيسية', href: '/' },
          { label: 'المنتجات', href: '/products' },
          { label: product.name, href: '#' }
        ]}
      />

      <div className="container mx-auto px-4 pt-16 pb-20">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          العودة
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
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
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-purple-600 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
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
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <div className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
                {product.category.name}
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className="text-yellow-400 text-lg"
                  />
                ))}
              </div>
              <span className="text-gray-600">(25 تقييم)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(price.amount, price.currency)}
              </span>
              {product.isAvailableForPurchase ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  متوفر
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  غير متوفر
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-3">
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

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailableForPurchase || isAddingToCart}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    جاري الإضافة...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    أضف للسلة
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-300 hover:border-red-300 hover:text-red-600'
                }`}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>

            {/* Collections / Tags */}
            {!isUuid && product.collections && product.collections.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">المجموعات:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.collections.map((collection) => (
                    <span
                      key={collection.id}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {collection.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {isUuid && product?.tags && product.tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">الوسوم:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
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
                          <div className="text-purple-600 font-bold mt-1">{new Intl.NumberFormat('ar-EG').format(r.salePrice ?? r.price)} ج.م</div>
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