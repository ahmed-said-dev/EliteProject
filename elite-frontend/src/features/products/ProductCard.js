import { Button } from '@/components/ui/button';

export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 hover:shadow-purple-200/25 hover:transform hover:-translate-y-2">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-gray-800 hover:text-purple-600 transition-colors">{product.name}</h3>
        <p className="text-gray-600 mb-4 h-12 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{product.price} ريال</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all"
          >
            اطلب الآن
          </Button>
        </div>
      </div>
    </div>
  );
}
