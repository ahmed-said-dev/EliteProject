import { Button } from '@/components/ui/Button';

export function PricingCard({ plan }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${
      plan.featured ? 'border-2 border-purple-600 relative' : ''
    }`}>
      {plan.featured && (
        <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
          الأكثر شعبية
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
        <div className="text-purple-600 mb-6">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-gray-600 text-lg">/شهرياً</span>
        </div>

        <div className="space-y-4 mb-8 text-right">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse">
              <i className="fas fa-check-circle text-green-500"></i>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <Button
          variant={plan.featured ? 'primary' : 'outline'}
          className="w-full"
        >
          اشترك الآن
        </Button>
      </div>
    </div>
  );
}
