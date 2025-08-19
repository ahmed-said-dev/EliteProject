import React, { useEffect } from 'react';
import { Modal, Form, Input, Switch, Select } from 'antd';
import type { Category } from '../../types';

export interface CategoryFormValues {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
  initial?: Partial<Category> | null;
  categories: Category[];
}

const CategoryFormModal: React.FC<Props> = ({ open, onClose, onSubmit, initial, categories }) => {
  const [form] = Form.useForm<CategoryFormValues>();

  useEffect(() => {
    if (initial) {
      form.setFieldsValue({
        name: initial.name || '',
        slug: initial.slug || '',
        description: initial.description || '',
        parentId: initial.parentId,
        isActive: initial.isActive ?? true,
      });
    } else {
      form.resetFields();
    }
  }, [initial, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    await onSubmit(values);
    onClose();
  };

  return (
    <Modal open={open} onCancel={onClose} onOk={handleOk} title={initial?.id ? 'تعديل فئة' : 'إضافة فئة'}>
      <Form form={form} layout="vertical">
        <Form.Item label="الاسم" name="name" rules={[{ required: true, message: 'الاسم مطلوب' }]}>
          <Input placeholder="اسم الفئة" />
        </Form.Item>
        <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Slug مطلوب' }]}>
          <Input placeholder="unique-slug" />
        </Form.Item>
        <Form.Item label="الوصف" name="description">
          <Input.TextArea rows={3} placeholder="وصف مختصر" />
        </Form.Item>
        <Form.Item label="الفئة الأب" name="parentId">
          <Select allowClear placeholder="بدون">
            {categories.filter(c => c.id !== initial?.id).map(c => (
              <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="مفعلة" name="isActive" valuePropName="checked" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryFormModal;



