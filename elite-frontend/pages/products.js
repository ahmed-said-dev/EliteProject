import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { ProductCard } from '@/features/products/ProductCard';
import PageBanner from '@/components/PageBanner/PageBanner';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'food', name: 'طعام الحيوانات' },
    { id: 'medicine', name: 'الأدوية' },
    { id: 'accessories', name: 'الإكسسوارات' },
    { id: 'hygiene', name: 'النظافة' }
  ];

  const products = [
    {
      id: 1,
      name: 'طعام القطط الفاخر',
      description: 'طعام صحي متكامل للقطط مع فيتامينات إضافية',
      price: 75,
      category: 'food',
      image: '/images/products/cat-food.jpg'
    },
    {
      id: 2,
      name: 'طعام الكلاب المتميز',
      description: 'طعام عالي البروتين للكلاب النشطة',
      price: 85,
      category: 'food',
      image: '/images/products/dog-food.jpg'
    },
    {
      id: 3,
      name: 'فيتامينات متكاملة',
      description: 'مكملات غذائية شاملة للحيوانات الأليفة',
      price: 120,
      category: 'medicine',
      image: '/images/products/vitamins.jpg'
    },
    {
      id: 4,
      name: 'شامبو للحيوانات الأليفة',
      description: 'شامبو لطيف للبشرة مع مكونات طبيعية',
      price: 45,
      category: 'hygiene',
      image: '/images/products/shampoo.jpg'
    },
    {
      id: 5,
      name: 'طوق مع بطاقة تعريف',
      description: 'طوق مريح مع بطاقة تعريف قابلة للتخصيص',
      price: 35,
      category: 'accessories',
      image: '/images/products/collar.jpg'
    },
    {
      id: 6,
      name: 'سرير للحيوانات الأليفة',
      description: 'سرير مريح ودافئ لحيوانك الأليف',
      price: 150,
      category: 'accessories',
      image: '/images/products/bed.jpg'
    }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <main>
      <PageBanner 
        title="Our Products"
        backgroundImage="/images/banner/bnr1.webp"
      />
      <Section bgColor="bg-purple-600" className="text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">منتجاتنا</h1>
          <p className="text-xl max-w-2xl mx-auto">
            مجموعة متكاملة من المنتجات عالية الجودة لرعاية حيوانك الأليف
          </p>
        </div>
      </Section>

      <Section>
        {/* Categories Filter */}
        <div className="flex justify-center mb-12 space-x-4 space-x-reverse">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section bgColor="bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">لم تجد ما تبحث عنه؟</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            تواصل معنا وسنساعدك في العثور على المنتج المناسب لحيوانك الأليف
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            تواصل معنا
          </button>
        </div>
      </Section>
    </main>
  );
}
