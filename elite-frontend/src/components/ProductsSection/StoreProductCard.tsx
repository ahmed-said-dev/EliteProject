import React, { useState } from 'react';
import Link from 'next/link';
import { StoreProduct } from '@/hooks/useStoreProducts';
import { resolveAssetUrl } from '@/lib/storeApi';
import { useUnifiedCart } from '@/context/UnifiedCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faEye, faCheck } from '@fortawesome/free-solid-svg-icons';

interface StoreProductCardProps {
  product: StoreProduct;
}

export default function StoreProductCard({ product }: StoreProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { addToCart, isInCart, getCartItem } = useUnifiedCart();
  
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const imageUrl = resolveAssetUrl(primaryImage?.url) || '/placeholder.png';
  
  const price = product.price || 0;
  const salePrice = product.salePrice;
  const hasDiscount = salePrice && salePrice < price;
  const discountPercent = hasDiscount ? Math.round(((price - salePrice) / price) * 100) : 0;
  
  const isProductInCart = isInCart(product.id, 'elite-store');
  const cartItem = getCartItem(product.id, 'elite-store');
  
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    try {
      await addToCart({
        name: product.name,
        price: price,
        salePrice: salePrice,
        image: imageUrl,
        source: 'elite-store',
        productId: product.id,
        stockQuantity: (product as any).stockQuantity,
        maxQuantity: (product as any).stockQuantity,
        sku: (product as any).sku,
        category: product.category ? {
          id: product.category.id,
          name: product.category.name
        } : undefined,
      }, 1);
      
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-purple-100 hover:border-purple-300 hover:shadow-purple-200/25">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          -{discountPercent}%
        </div>
      )}
      
      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100">
        <FontAwesomeIcon icon={faHeart} className="text-sm" />
      </button>
      
      {/* Cart Status Badge */}
      {isProductInCart && (
        <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
          <FontAwesomeIcon icon={faCheck} className="text-xs" />
          في السلة ({cartItem?.quantity})
        </div>
      )}

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-gray-100 relative">
          {imageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors transform translate-y-2 group-hover:translate-y-0 shadow-lg flex items-center gap-2">
              <FontAwesomeIcon icon={faEye} />
              عرض سريع
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.category.name}
          </span>
        )}
        
        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mt-1 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500 mr-1">(4.0)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-purple-600">
                  {salePrice} ج.م
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {price} ج.م
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-purple-600">
                {price} ج.م
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart || !(product as any).stockQuantity || (product as any).stockQuantity <= 0}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
              addedToCart 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : isProductInCart
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white hover:shadow-indigo-300/50'
                : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white hover:shadow-purple-300/50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري الإضافة...
              </>
            ) : addedToCart ? (
              <>
                <FontAwesomeIcon icon={faCheck} />
                تم الإضافة!
              </>
            ) : isProductInCart ? (
              <>
                <FontAwesomeIcon icon={faCheck} />
                في السلة ({cartItem?.quantity})
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faShoppingCart} />
                أضف للسلة
              </>
            )}
          </button>
          
          <Link 
            href={`/products/${product.id}`}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faEye} className="text-sm" />
          </Link>
        </div>
      </div>

      {/* Stock Status */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-xs">
          {(product as any).stockQuantity && (product as any).stockQuantity > 0 ? (
            <span className="text-green-600 font-medium flex items-center gap-1">
              <FontAwesomeIcon icon={faCheck} />
               متوفر ({(product as any).stockQuantity} قطعة)
            </span>
          ) : (
            <span className="text-red-500 font-medium">غير متوفر</span>
          )}
          <span className="text-gray-500">
            {(salePrice || price) >= 500 ? 'شحن مجاني' : 'شحن 50 ج.م'}
          </span>
        </div>
      </div>
    </div>
  );
}

