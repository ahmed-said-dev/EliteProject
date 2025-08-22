import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Product, Category } from '../../types';
import { productsService } from '../products/service';

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  onAttach: (productIds: string[]) => Promise<void>;
  onDetach: (productIds: string[]) => Promise<void>;
}

const CategoryProductsModal: React.FC<Props> = ({ open, onClose, category, onAttach, onDetach }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!open) return;
      setLoading(true);
      try {
        const res = await productsService.getProducts();
        setProducts(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [open]);

  const columns: ColumnsType<Product> = useMemo(() => [
    { title: 'المنتج', dataIndex: 'name', key: 'name' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'السعر', dataIndex: 'price', key: 'price', render: (v: number) => Number(v).toFixed(2) + ' ر.س' },
    { title: 'الحالة', dataIndex: 'status', key: 'status' },
  ], []);

  const handleAttach = async () => {
    await onAttach(selectedRowKeys as string[]);
    setSelectedRowKeys([]);
  };

  const handleDetach = async () => {
    await onDetach(selectedRowKeys as string[]);
    setSelectedRowKeys([]);
  };

  return (
    <Modal open={open} onCancel={onClose} onOk={handleAttach} okText="ربط المحدد" title={`ربط المنتجات بالفئة: ${category?.name || ''}`}
      footer={[
        <Button key="detach" danger onClick={handleDetach} disabled={!selectedRowKeys.length}>فصل المحدد</Button>,
        <Button key="cancel" onClick={onClose}>إلغاء</Button>,
        <Button key="attach" type="primary" onClick={handleAttach} disabled={!selectedRowKeys.length}>ربط المحدد</Button>,
      ]}
    >
      <Table
        rowKey={(r) => r.id}
        loading={loading}
        columns={columns}
        dataSource={products}
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        pagination={{ pageSize: 10 }}
      />
    </Modal>
  );
};

export default CategoryProductsModal;








