import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageBanner from '@/components/PageBanner/PageBanner';
import ProductDetail from '@/components/ProductDetail';
import { productData } from '@/components/ProductsSection/data/productData';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // Obtener datos del producto desde nuestro dataset
      const productId = parseInt(id);
      const foundProduct = productData.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Producto no encontrado, redirigir a la página de productos
        router.push('/products');
      }
      
      setLoading(false);
    }
  }, [id, router]);
  
  // Mostrar un estado de carga mientras se obtienen los datos
  if (loading) {
    return (
      <main>
        <PageBanner 
          title="Loading Product..."
          backgroundImage="/images/banner/bnr1.webp"
        />
        <div className="container mx-auto py-20 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded w-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }
  
  // Si no se encuentra el producto
  if (!product) {
    return (
      <main>
        <PageBanner 
          title="Product Not Found"
          backgroundImage="/images/banner/bnr1.webp"
        />
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Sorry, the product you're looking for could not be found</h2>
          <button 
            onClick={() => router.push('/products')}
            className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
          >
            Browse All Products
          </button>
        </div>
      </main>
    );
  }
  
  return (
    <main>
      <PageBanner 
        title={product.name}
        backgroundImage="/images/banner/bnr1.webp"
      />
      <ProductDetail product={product} />
    </main>
  );
}
