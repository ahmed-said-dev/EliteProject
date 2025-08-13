import React, { useState } from 'react';
import { Modal, Collapse, Table, Tag, Select, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserOutlined, ShoppingCartOutlined, HomeOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined, CreditCardOutlined, FileTextOutlined } from '@ant-design/icons';
import type { OrderDto } from './service';

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  order: OrderDto | null;
  onStatusChange?: (orderId: string, status: string) => Promise<void>;
  onPaymentStatusChange?: (orderId: string, paymentStatus: string) => Promise<void>;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ 
  open, 
  onClose, 
  order, 
  onStatusChange, 
  onPaymentStatusChange 
}) => {
  const [editingStatus, setEditingStatus] = useState(false);
  const [editingPayment, setEditingPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!order) return null;

  // دالة تغيير حالة الطلب
  const handleStatusChange = async (newStatus: string) => {
    if (onStatusChange && order) {
      setLoading(true);
      try {
        await onStatusChange(order.id, newStatus);
        setEditingStatus(false);
      } catch (error) {
        console.error('Error updating order status:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // دالة تغيير حالة الدفع
  const handlePaymentStatusChange = async (newPaymentStatus: string) => {
    if (onPaymentStatusChange && order) {
      setLoading(true);
      try {
        await onPaymentStatusChange(order.id, newPaymentStatus);
        setEditingPayment(false);
      } catch (error) {
        console.error('Error updating payment status:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // بيانات العميل للجدول
  const customerData = [
    {
      key: '1',
      field: (
        <div className="flex items-center gap-2">
          <UserOutlined style={{ color: '#1890ff' }} />
          <span>الاسم الأول</span>
        </div>
      ),
      value: order.customerFirstName,
    },
    {
      key: '2',
      field: (
        <div className="flex items-center gap-2">
          <UserOutlined style={{ color: '#1890ff' }} />
          <span>الاسم الأخير</span>
        </div>
      ),
      value: order.customerLastName,
    },
    {
      key: '3',
      field: (
        <div className="flex items-center gap-2">
          <MailOutlined style={{ color: '#52c41a' }} />
          <span>البريد الإلكتروني</span>
        </div>
      ),
      value: (
        <a 
          href={`mailto:${order.customerEmail}`}
          style={{ color: '#1890ff', textDecoration: 'none' }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          title="اضغط لإرسال ايميل"
        >
          {order.customerEmail}
        </a>
      ),
    },
    {
      key: '4',
      field: (
        <div className="flex items-center gap-2">
          <PhoneOutlined style={{ color: '#faad14' }} />
          <span>رقم التليفون</span>
        </div>
      ),
      value: order.customerPhone ? (
        <a 
          href={`tel:${order.customerPhone}`}
          style={{ color: '#1890ff', textDecoration: 'none' }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          title="اضغط للاتصال"
        >
          <PhoneOutlined style={{ marginLeft: '4px' }} />
          {order.customerPhone}
        </a>
      ) : (
        <span style={{ color: '#999' }}>غير متوفر</span>
      ),
    },
    {
      key: '5',
      field: (
        <div className="flex items-center gap-2">
          <FileTextOutlined style={{ color: '#722ed1' }} />
          <span>رقم الطلب</span>
        </div>
      ),
      value: (
        <Tag color="blue" style={{ fontWeight: 'bold' }}>
          {order.orderNumber}
        </Tag>
      ),
    },
    {
      key: '6',
      field: (
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>تاريخ التسجيل</span>
        </div>
      ),
      value: new Date(order.createdAt).toLocaleDateString('ar-EG'),
    },
  ];

  // أعمدة جدول العميل
  const customerColumns: ColumnsType<any> = [
    {
      title: 'البيان',
      dataIndex: 'field',
      key: 'field',
      width: '40%',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'القيمة',
      dataIndex: 'value',
      key: 'value',
      width: '60%',
    },
  ];

  // بيانات تفاصيل الشحن والعنوان
  const shippingData = [
    {
      key: '1',
      field: (
        <div className="flex items-center gap-2">
          <HomeOutlined style={{ color: '#52c41a' }} />
          <span>عنوان الشحن</span>
        </div>
      ),
      value: order.shippingAddress ? (
        <Tooltip title={order.shippingAddress} placement="topLeft">
          <div style={{ 
            maxWidth: '300px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {order.shippingAddress}
          </div>
        </Tooltip>
      ) : (
        <span style={{ color: '#999' }}>غير متوفر</span>
      ),
    },
    {
      key: '2',
      field: (
        <div className="flex items-center gap-2">
          <FileTextOutlined style={{ color: '#722ed1' }} />
          <span>عنوان الفواتير</span>
        </div>
      ),
      value: order.billingAddress ? (
        <Tooltip title={order.billingAddress} placement="topLeft">
          <div style={{ 
            maxWidth: '300px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {order.billingAddress}
          </div>
        </Tooltip>
      ) : (
        <span style={{ color: '#999' }}>غير متوفر</span>
      ),
    },
    {
      key: '3',
      field: (
        <div className="flex items-center gap-2">
          <EnvironmentOutlined style={{ color: '#fa8c16' }} />
          <span>المدينة</span>
        </div>
      ),
      value: order.city || <span style={{ color: '#999' }}>غير متوفر</span>,
    },
    {
      key: '4',
      field: (
        <div className="flex items-center gap-2">
          <EnvironmentOutlined style={{ color: '#13c2c2' }} />
          <span>المحافظة/الولاية</span>
        </div>
      ),
      value: order.state || <span style={{ color: '#999' }}>غير متوفر</span>,
    },
    {
      key: '5',
      field: (
        <div className="flex items-center gap-2">
          <span>🌍</span>
          <span>البلد</span>
        </div>
      ),
      value: order.country ? (
        <Tag color="geekblue">{order.country}</Tag>
      ) : (
        <span style={{ color: '#999' }}>غير متوفر</span>
      ),
    },
    {
      key: '6',
      field: (
        <div className="flex items-center gap-2">
          <span>📮</span>
          <span>الرمز البريدي</span>
        </div>
      ),
      value: order.postalCode ? (
        <Tag color="cyan">{order.postalCode}</Tag>
      ) : (
        <span style={{ color: '#999' }}>غير متوفر</span>
      ),
    },
    {
      key: '7',
      field: (
        <div className="flex items-center gap-2">
          <CreditCardOutlined style={{ color: '#eb2f96' }} />
          <span>طريقة الدفع</span>
        </div>
      ),
      value: order.paymentMethod ? (
        <Tag color="magenta">{order.paymentMethod}</Tag>
      ) : (
        <span style={{ color: '#999' }}>غير محدد</span>
      ),
    },
    {
      key: '8',
      field: (
        <div className="flex items-center gap-2">
          <FileTextOutlined style={{ color: '#fa541c' }} />
          <span>الملاحظات الإضافية</span>
        </div>
      ),
      value: order.notes ? (
        <div style={{ 
          maxHeight: '120px', 
          overflowY: 'auto', 
          padding: '12px', 
          background: '#f8f9fa', 
          borderRadius: '6px',
          whiteSpace: 'pre-wrap',
          border: '1px solid #e8e8e8',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          {order.notes}
        </div>
      ) : (
        <span style={{ color: '#999', fontStyle: 'italic' }}>لا توجد ملاحظات إضافية</span>
      ),
    },
  ];

  // أعمدة جدول تفاصيل الشحن
  const shippingColumns: ColumnsType<any> = [
    {
      title: 'البيان',
      dataIndex: 'field',
      key: 'field',
      width: '30%',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'التفاصيل',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
    },
  ];

  const customerItems = [
    {
      key: 'customer',
      label: (
        <div className="flex items-center gap-2">
          <UserOutlined />
          <span>تفاصيل العميل</span>
        </div>
      ),
      children: (
        <Table
          columns={customerColumns}
          dataSource={customerData}
          pagination={false}
          size="small"
          bordered
        />
      ),
    },
  ];

  // تفاصيل الشحن والعنوان
  const shippingItems = [
    {
      key: 'shipping',
      label: (
        <div className="flex items-center gap-2">
          <HomeOutlined />
          <span>تفاصيل الشحن والعنوان</span>
        </div>
      ),
      children: (
        <Table
          columns={shippingColumns}
          dataSource={shippingData}
          pagination={false}
          size="small"
          bordered
        />
      ),
    },
  ];

  // بيانات معلومات الطلب الأساسية
  const orderInfoData = [
    {
      key: '1',
      field: 'حالة الطلب',
      value: editingStatus ? (
        <Select
          value={order.status}
          onChange={handleStatusChange}
          loading={loading}
          style={{ width: 150 }}
          onBlur={() => setEditingStatus(false)}
          autoFocus
          placeholder="اختر الحالة"
        >
          <Select.Option value="pending">
            <Tag color="gold">قيد الانتظار</Tag>
          </Select.Option>
          <Select.Option value="confirmed">
            <Tag color="blue">مؤكد</Tag>
          </Select.Option>
          <Select.Option value="processing">
            <Tag color="purple">جارٍ المعالجة</Tag>
          </Select.Option>
          <Select.Option value="shipped">
            <Tag color="cyan">تم الشحن</Tag>
          </Select.Option>
          <Select.Option value="delivered">
            <Tag color="green">تم التسليم</Tag>
          </Select.Option>
          <Select.Option value="cancelled">
            <Tag color="red">ملغي</Tag>
          </Select.Option>
          <Select.Option value="refunded">
            <Tag color="volcano">تم الاسترداد</Tag>
          </Select.Option>
        </Select>
      ) : (
        <Tag 
          color={getStatusTagColor(order.status)}
          style={{ 
            cursor: 'pointer', 
            userSelect: 'none',
            transition: 'all 0.3s ease',
            border: '1px solid transparent'
          }}
          onClick={() => setEditingStatus(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="اضغط لتغيير حالة الطلب"
        >
          {getStatusText(order.status)}
        </Tag>
      ),
    },
    {
      key: '2',
      field: 'حالة الدفع',
      value: editingPayment ? (
        <Select
          value={order.paymentStatus}
          onChange={handlePaymentStatusChange}
          loading={loading}
          style={{ width: 150 }}
          onBlur={() => setEditingPayment(false)}
          autoFocus
          placeholder="اختر الحالة"
        >
          <Select.Option value="pending">
            <Tag color="gold">في انتظار الدفع</Tag>
          </Select.Option>
          <Select.Option value="paid">
            <Tag color="green">مدفوع</Tag>
          </Select.Option>
          <Select.Option value="failed">
            <Tag color="red">فشل الدفع</Tag>
          </Select.Option>
          <Select.Option value="refunded">
            <Tag color="volcano">تم الاسترداد</Tag>
          </Select.Option>
          <Select.Option value="partially_refunded">
            <Tag color="orange">استرداد جزئي</Tag>
          </Select.Option>
        </Select>
      ) : (
        <Tag 
          color={getPaymentStatusTagColor(order.paymentStatus)}
          style={{ 
            cursor: 'pointer', 
            userSelect: 'none',
            transition: 'all 0.3s ease',
            border: '1px solid transparent'
          }}
          onClick={() => setEditingPayment(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          title="اضغط لتغيير حالة الدفع"
        >
          {getPaymentStatusText(order.paymentStatus)}
        </Tag>
      ),
    },
    {
      key: '3',
      field: 'تاريخ إنشاء الطلب',
      value: new Date(order.createdAt).toLocaleString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    },
    ...(order.updatedAt ? [{
      key: '4',
      field: 'آخر تحديث',
      value: new Date(order.updatedAt).toLocaleString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    }] : []),
  ];

  // أعمدة جدول معلومات الطلب
  const orderInfoColumns: ColumnsType<any> = [
    {
      title: 'البيان',
      dataIndex: 'field',
      key: 'field',
      width: '40%',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'القيمة',
      dataIndex: 'value',
      key: 'value',
      width: '60%',
    },
  ];

  // أعمدة جدول العناصر
  const itemsColumns: ColumnsType<any> = [
    {
      title: 'المنتج',
      dataIndex: 'productName',
      key: 'productName',
      width: '30%',
    },
    {
      title: 'الكود',
      dataIndex: 'productSku',
      key: 'productSku',
      width: '20%',
    },
    {
      title: 'الكمية',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '15%',
      align: 'center',
    },
    {
      title: 'السعر',
      dataIndex: 'price',
      key: 'price',
      width: '17.5%',
      align: 'center',
      render: (price) => `${Number(price).toFixed(2)} ج.م`,
    },
    {
      title: 'الإجمالي',
      dataIndex: 'total',
      key: 'total',
      width: '17.5%',
      align: 'center',
      render: (total) => <strong>{Number(total).toFixed(2)} ج.م</strong>,
    },
  ];

  // بيانات ملخص الطلب
  const orderSummaryData = [
    {
      key: '1',
      field: 'المجموع الفرعي',
      value: `${Number(order.subtotal).toFixed(2)} ج.م`,
    },
    ...(order.shippingCost > 0 ? [{
      key: '2',
      field: 'تكلفة الشحن',
      value: `${Number(order.shippingCost).toFixed(2)} ج.م`,
    }] : []),
    ...(order.taxAmount > 0 ? [{
      key: '3',
      field: 'الضرائب',
      value: `${Number(order.taxAmount).toFixed(2)} ج.م`,
    }] : []),
    ...(order.discountAmount > 0 ? [{
      key: '4',
      field: 'الخصم',
      value: (
        <span style={{ color: '#52c41a' }}>
          -{Number(order.discountAmount).toFixed(2)} ج.م
        </span>
      ),
    }] : []),
    {
      key: '5',
      field: 'الإجمالي النهائي',
      value: <strong style={{ fontSize: '16px' }}>{Number(order.total).toFixed(2)} ج.م</strong>,
    },
  ];

  // أعمدة جدول ملخص الطلب
  const summaryColumns: ColumnsType<any> = [
    {
      title: 'البيان',
      dataIndex: 'field',
      key: 'field',
      width: '60%',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'المبلغ',
      dataIndex: 'value',
      key: 'value',
      width: '40%',
      align: 'left',
    },
  ];

  const orderItems = [
    {
      key: 'order',
      label: (
        <div className="flex items-center gap-2">
          <ShoppingCartOutlined />
          <span>تفاصيل الطلب</span>
        </div>
      ),
      children: (
        <div className="space-y-4">
          {/* جدول معلومات الطلب الأساسية */}
          <div>
            <h4 style={{ marginBottom: '12px', fontWeight: 'bold' }}>معلومات الطلب</h4>
            <Table
              columns={orderInfoColumns}
              dataSource={orderInfoData}
              pagination={false}
              size="small"
              bordered
            />
          </div>

          {/* جدول العناصر المطلوبة */}
          <div>
            <h4 style={{ marginBottom: '12px', fontWeight: 'bold' }}>العناصر المطلوبة</h4>
            <Table
              columns={itemsColumns}
              dataSource={order.items?.map((item, index) => ({
                key: item.id || index,
                ...item,
              }))}
              pagination={false}
              size="small"
              bordered
              scroll={{ x: 800 }}
            />
          </div>

          {/* جدول ملخص الطلب */}
          <div>
            <h4 style={{ marginBottom: '12px', fontWeight: 'bold' }}>ملخص الطلب</h4>
            <Table
              columns={summaryColumns}
              dataSource={orderSummaryData}
              pagination={false}
              size="small"
              bordered
              showHeader={false}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ShoppingCartOutlined />
          <span>تفاصيل الطلب رقم: {order.orderNumber}</span>
        </div>
      }
      open={open}
      onCancel={() => {
        setEditingStatus(false);
        setEditingPayment(false);
        onClose();
      }}
      footer={null}
      width={900}
      style={{ top: 20 }}
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      <div className="space-y-4">
        <Collapse
          items={customerItems}
          defaultActiveKey={['customer']}
          size="large"
        />
        <Collapse
          items={shippingItems}
          defaultActiveKey={['shipping']}
          size="large"
        />
        <Collapse
          items={orderItems}
          defaultActiveKey={['order']}
          size="large"
        />
      </div>
    </Modal>
  );
};

// Helper functions for status colors and text
const getStatusTagColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'gold'; // ذهبي للانتظار
    case 'confirmed':
      return 'blue'; // أزرق للمؤكد
    case 'processing':
      return 'purple'; // بنفسجي للمعالجة
    case 'shipped':
      return 'cyan'; // أزرق فاتح للشحن
    case 'delivered':
      return 'green'; // أخضر للتسليم
    case 'cancelled':
      return 'red'; // أحمر للإلغاء
    case 'refunded':
      return 'volcano'; // برتقالي محمر للاسترداد
    default:
      return 'default';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'قيد الانتظار';
    case 'confirmed':
      return 'مؤكد';
    case 'processing':
      return 'جارٍ المعالجة';
    case 'shipped':
      return 'تم الشحن';
    case 'delivered':
      return 'تم التسليم';
    case 'cancelled':
      return 'ملغي';
    case 'refunded':
      return 'تم الاسترداد';
    default:
      return status;
  }
};

const getPaymentStatusTagColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'gold'; // ذهبي للانتظار
    case 'paid':
      return 'green'; // أخضر للمدفوع
    case 'failed':
      return 'red'; // أحمر للفاشل
    case 'refunded':
      return 'volcano'; // برتقالي محمر للمسترد
    case 'partially_refunded':
      return 'orange'; // برتقالي للاسترداد الجزئي
    default:
      return 'default';
  }
};

const getPaymentStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'في انتظار الدفع';
    case 'paid':
      return 'مدفوع';
    case 'failed':
      return 'فشل الدفع';
    case 'refunded':
      return 'تم الاسترداد';
    case 'partially_refunded':
      return 'استرداد جزئي';
    default:
      return status;
  }
};

export default OrderDetailsModal;
