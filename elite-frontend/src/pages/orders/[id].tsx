import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import eliteApi from '@/lib/eliteApi';

const OrderDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await eliteApi.getOrderById(id);
        setOrder(data);
      } catch (e: any) {
        setError(e?.message || 'فشل في جلب الطلب');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="container mx-auto p-6">جارٍ التحميل...</div>;
  if (error) return <div className="container mx-auto p-6 text-red-600">{error}</div>;
  if (!order) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-black mb-4">الطلب #{order.orderNumber}</h1>
      <div className="mb-2">الحالة: {order.status}</div>
      <div className="mb-2">حالة الدفع: {order.paymentStatus}</div>
      <div className="mb-2">الإجمالي: {order.total}</div>
      <h2 className="text-xl font-bold mt-4 mb-2">المنتجات</h2>
      <ul className="list-disc pl-6">
        {order.items?.map((it: any) => (
          <li key={it.id}>{it.productName} × {it.quantity} - {it.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailPage;


