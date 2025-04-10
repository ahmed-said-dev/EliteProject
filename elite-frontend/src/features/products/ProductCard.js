import { Button } from '@/components/ui/button';

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 h-12 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-bold">{product.price} ريال</span>
          <Button variant="outline" size="sm">
            اطلب الآن
          </Button>
        </div>
      </div>
    </div>
  );
}
