import React from 'react';
import { Modal } from 'antd';
import type { Product } from '../../types';

interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onEdit?: (product: Product) => void;
}

const ProductDetailsModal: React.FC<Props> = ({ open, product, onClose, onEdit }) => {
  if (!product) return null;

  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

  return (
    <Modal open={open} onCancel={onClose} footer={null} title={product.name} width={720}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16 }}>
        <div>
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={product.name}
              style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
            />
          ) : (
            <div style={{ width: '100%', height: 200, background: '#f3f4f6', borderRadius: 8 }} />
          )}
        </div>
        <div>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>السعر:</strong> {product.price}</p>
          {product.salePrice != null && <p><strong>السعر بعد الخصم:</strong> {product.salePrice}</p>}
          <p><strong>المخزون:</strong> {product.stockQuantity}</p>
          <p><strong>الحالة:</strong> {product.status}</p>
          <p style={{ marginTop: 8 }}>{product.description}</p>

          {onEdit && (
            <button
              className="btn btn-primary btn-sm"
              style={{ marginTop: 12 }}
              onClick={() => onEdit(product)}
            >
              تعديل
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;



