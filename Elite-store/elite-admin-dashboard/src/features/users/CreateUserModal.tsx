import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { apiService } from '../../services/api';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const CreateUserModal: React.FC<Props> = ({ open, onClose, onCreated }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await apiService.post('/auth/register', {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || undefined,
        address: values.address || undefined,
        city: values.city || undefined,
        country: values.country || undefined,
      });
      message.success('تم إنشاء المستخدم بنجاح');
      onCreated && onCreated();
      onClose();
      form.resetFields();
    } catch (e: any) {
      if (e?.message) message.error(e.message);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} onOk={handleOk} title="إضافة مستخدم">
      <Form layout="vertical" form={form}>
        <Form.Item label="الاسم الأول" name="firstName" rules={[{ required: true, message: 'الاسم الأول مطلوب' }]}>
          <Input placeholder="محمد" />
        </Form.Item>
        <Form.Item label="الاسم الأخير" name="lastName" rules={[{ required: true, message: 'الاسم الأخير مطلوب' }]}>
          <Input placeholder="أحمد" />
        </Form.Item>
        <Form.Item label="البريد الإلكتروني" name="email" rules={[{ required: true, type: 'email', message: 'أدخل بريد إلكتروني صحيح' }]}>
          <Input placeholder="user@example.com" />
        </Form.Item>
        <Form.Item label="كلمة المرور" name="password" rules={[{ required: true, min: 6, message: 'كلمة المرور (6 أحرف على الأقل)' }]}>
          <Input.Password placeholder="******" />
        </Form.Item>
        <Form.Item label="التليفون" name="phone">
          <Input placeholder="+201234567890" />
        </Form.Item>
        <Form.Item label="العنوان" name="address">
          <Input placeholder="العنوان" />
        </Form.Item>
        <Form.Item label="المدينة" name="city">
          <Input placeholder="القاهرة" />
        </Form.Item>
        <Form.Item label="البلد" name="country">
          <Select
            showSearch
            allowClear
            placeholder="اختر البلد"
            options={[
              { label: 'مصر', value: 'Egypt' },
              { label: 'السعودية', value: 'Saudi Arabia' },
              { label: 'الإمارات', value: 'United Arab Emirates' },
              { label: 'الجزائر', value: 'Algeria' },
              { label: 'المغرب', value: 'Morocco' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;



