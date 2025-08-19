import React, { useMemo, useState } from 'react';
import { eliteApi, getEliteToken, setEliteToken } from '@/lib/eliteApi';
import { useUnifiedCart } from '@/context/UnifiedCartContext';

type CheckoutState = 'idle' | 'processing' | 'success' | 'error';

const EliteCheckout: React.FC = () => {
  const { state, clearCart, getCartTotal } = useUnifiedCart();
  const [status, setStatus] = useState<CheckoutState>('idle');
  const [error, setError] = useState<string | null>(null);

  const amounts = useMemo(() => {
    const subtotal = getCartTotal();
    const shippingCost = subtotal > 500 ? 0 : 50;
    const taxAmount = subtotal * 0.14;
    const total = subtotal + shippingCost + taxAmount;
    return { subtotal, shippingCost, taxAmount, total };
  }, [getCartTotal]);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingCountry: 'EG',
    notes: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    setStatus('processing');
    setError(null);
    try {
      // Ensure backend auth (login or auto-register)
      let token = getEliteToken();
      if (!token) {
        try {
          const auth = await eliteApi.login(form.email, form.password);
          setEliteToken(auth.accessToken);
          token = auth.accessToken;
        } catch {
          const reg: any = await eliteApi.register({
            email: form.email,
            password: form.password || Math.random().toString(36).slice(2),
            firstName: form.firstName,
            lastName: form.lastName,
          });
          const accessToken = (reg && (reg.accessToken || reg.token || reg.access_token)) as string | undefined;
          if (accessToken) {
            setEliteToken(accessToken);
            token = accessToken;
          }
        }
      }

      // Sync local cart to backend cart
      for (const item of state.items) {
        if (item.source === 'elite-store' && item.productId) {
          await eliteApi.addToCart(item.productId, item.quantity);
        }
      }

      const payload = {
        paymentMethod: 'cash_on_delivery',
        customerFirstName: form.firstName,
        customerLastName: form.lastName,
        customerEmail: form.email,
        customerPhone: form.phone,
        shippingAddress: form.shippingAddress,
        shippingCity: form.shippingCity,
        shippingCountry: form.shippingCountry,
        shippingCost: amounts.shippingCost,
        taxAmount: Math.round(amounts.taxAmount * 100) / 100,
        discountAmount: 0,
        notes: form.notes,
      };

      const order: any = await eliteApi.createOrder(payload);
      await eliteApi.clearCart();
      clearCart();
      setStatus('success');
      // redirect to thank you / orders page
      if (typeof window !== 'undefined') {
        window.location.href = `/orders/${order.id}`;
      }
    } catch (e: any) {
      setError(e?.message || 'حدث خطأ أثناء إنشاء الطلب');
      setStatus('error');
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" placeholder="الاسم الأول" className="border rounded-xl px-4 py-3" onChange={onChange} />
        <input name="lastName" placeholder="اسم العائلة" className="border rounded-xl px-4 py-3" onChange={onChange} />
        <input name="email" type="email" placeholder="البريد الإلكتروني" className="border rounded-xl px-4 py-3" onChange={onChange} />
        <input name="password" type="password" placeholder="كلمة المرور" className="border rounded-xl px-4 py-3" onChange={onChange} />
        <input name="phone" placeholder="رقم الهاتف" className="border rounded-xl px-4 py-3" onChange={onChange} />
        <input name="shippingAddress" placeholder="عنوان الشحن" className="border rounded-xl px-4 py-3 md:col-span-2" onChange={onChange} />
        <input name="shippingCity" placeholder="المدينة" className="border rounded-xl px-4 py-3" onChange={onChange} />
        <input name="shippingCountry" placeholder="الدولة" defaultValue="EG" className="border rounded-xl px-4 py-3" onChange={onChange} />
      </div>

      <textarea name="notes" placeholder="ملاحظات إضافية" className="border rounded-xl px-4 py-3 w-full" onChange={onChange} />

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        onClick={handlePlaceOrder}
        disabled={status === 'processing' || state.items.length === 0}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-4 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {status === 'processing' ? 'جارٍ إنشاء الطلب...' : 'إتمام الطلب - دفع عند الاستلام'}
      </button>
    </div>
  );
};

export default EliteCheckout;


