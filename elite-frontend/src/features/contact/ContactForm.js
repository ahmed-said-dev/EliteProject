import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic will be implemented here
    console.log('Contact form submitted:', formData);
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
        <label htmlFor="subject" className="block text-gray-700 mb-2">الموضوع</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-gray-700 mb-2">الرسالة</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
          required
        ></textarea>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        إرسال الرسالة
      </Button>
    </form>
  );
}
