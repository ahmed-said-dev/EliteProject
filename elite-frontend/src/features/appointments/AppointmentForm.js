import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    petType: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic will be implemented here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-gray-700 mb-2">الاسم</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-gray-700 mb-2">رقم الهاتف</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        />
      </div>

      <div>
        <label htmlFor="petType" className="block text-gray-700 mb-2">نوع الحيوان الأليف</label>
        <select
          id="petType"
          name="petType"
          value={formData.petType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        >
          <option value="">اختر نوع الحيوان</option>
          <option value="dog">كلب</option>
          <option value="cat">قط</option>
          <option value="bird">طائر</option>
          <option value="other">آخر</option>
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-gray-700 mb-2">التاريخ</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        />
      </div>

      <div>
        <label htmlFor="time" className="block text-gray-700 mb-2">الوقت</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        />
      </div>

      <div>
        <label htmlFor="reason" className="block text-gray-700 mb-2">سبب الزيارة</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        ></textarea>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        حجز موعد
      </Button>
    </form>
  );
}
