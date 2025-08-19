import React, { useEffect, useMemo, useState } from 'react';
import { Tag, Select } from 'antd';
import { fetchOrders, updateOrderStatus, updatePaymentStatus, type OrderDto } from './service';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [paymentFilter, setPaymentFilter] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [editingPayment, setEditingPayment] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      setEditingStatus(null);
      setEditingPayment(null);
      const res = await fetchOrders({ status: statusFilter || undefined, paymentStatus: paymentFilter || undefined });
      setOrders(res as any);
    } catch (e: any) {
      setError(e?.message || 'فشل تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter, paymentFilter]);

  // إضافة event listener لإغلاق التحرير عند الضغط خارج المنطقة
  useEffect(() => {
    const handleClickOutside = () => {
      setEditingStatus(null);
      setEditingPayment(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onChangeStatus = async (id: string, status: string) => {
    setUpdateLoading(id);
    try {
      await updateOrderStatus(id, status);
      await load();
      setEditingStatus(null);
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdateLoading(null);
    }
  };

  const onChangePayment = async (id: string, paymentStatus: string) => {
    setUpdateLoading(id);
    try {
      await updatePaymentStatus(id, paymentStatus);
      await load();
      setEditingPayment(null);
    } catch (error) {
      console.error('Error updating payment status:', error);
    } finally {
      setUpdateLoading(null);
    }
  };

  const handleViewDetails = (order: OrderDto) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setEditingStatus(null);
    setEditingPayment(null);
  };

  const rows = useMemo(() => orders, [orders]);

  // Helper functions للألوان والنصوص
  const getStatusTagColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'gold';
      case 'confirmed':
        return 'blue';
      case 'processing':
        return 'purple';
      case 'shipped':
        return 'cyan';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      case 'refunded':
        return 'volcano';
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
        return 'gold';
      case 'paid':
        return 'green';
      case 'failed':
        return 'red';
      case 'refunded':
        return 'volcano';
      case 'partially_refunded':
        return 'orange';
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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">إدارة الطلبات</h1>
        <p className="page-subtitle">إدارة طلبات العملاء والفواتير</p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="flex gap-3 mb-4">
            <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">كل الحالات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="confirmed">مؤكد</option>
              <option value="processing">جارٍ المعالجة</option>
              <option value="shipped">تم الشحن</option>
              <option value="delivered">تم التسليم</option>
              <option value="cancelled">ملغي</option>
              <option value="refunded">تم الاسترداد</option>
            </select>
            <select className="form-input" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
              <option value="">حالة الدفع</option>
              <option value="pending">في انتظار الدفع</option>
              <option value="paid">مدفوع</option>
              <option value="failed">فشل الدفع</option>
              <option value="refunded">تم الاسترداد</option>
              <option value="partially_refunded">استرداد جزئي</option>
            </select>
            <button className="btn btn-primary" onClick={load} disabled={loading}>تحديث</button>
          </div>

          {loading && <div className="text-center py-8">جاري التحميل...</div>}
          {error && <div className="text-center text-red-600 py-4">{error}</div>}

          {!loading && !error && (
            <div className="overflow-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>الرقم</th>
                    <th>العميل</th>
                    <th>التليفون</th>
                    <th>الإجمالي</th>
                    <th>حالة الطلب</th>
                    <th>حالة الدفع</th>
                    <th>تاريخ الإنشاء</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((o, idx) => (
                    <tr key={o.id}>
                      <td>{idx + 1}</td>
                      <td>{o.orderNumber}</td>
                      <td>{o.customerFirstName} {o.customerLastName}<div className="text-xs text-gray-500">{o.customerEmail}</div></td>
                      <td>
                        <div className="text-sm">
                          {o.customerPhone ? (
                            <a 
                              href={`tel:${o.customerPhone}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="اضغط للاتصال"
                            >
                              {o.customerPhone}
                            </a>
                          ) : (
                            <span className="text-gray-400">غير متوفر</span>
                          )}
                        </div>
                      </td>
                      <td>{Number(o.total).toFixed(2)}</td>
                      <td>
                        {editingStatus === o.id ? (
                          <Select
                            value={o.status}
                            onChange={(value) => onChangeStatus(o.id, value)}
                            loading={updateLoading === o.id}
                            style={{ width: 150 }}
                            onBlur={() => setEditingStatus(null)}
                            autoFocus
                            placeholder="اختر الحالة"
                            onClick={(e) => e.stopPropagation()}
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
                            color={getStatusTagColor(o.status)}
                            style={{ 
                              cursor: 'pointer', 
                              userSelect: 'none',
                              transition: 'all 0.3s ease'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingStatus(o.id);
                            }}
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
                            {getStatusText(o.status)}
                          </Tag>
                        )}
                      </td>
                      <td>
                        {editingPayment === o.id ? (
                          <Select
                            value={o.paymentStatus}
                            onChange={(value) => onChangePayment(o.id, value)}
                            loading={updateLoading === o.id}
                            style={{ width: 150 }}
                            onBlur={() => setEditingPayment(null)}
                            autoFocus
                            placeholder="اختر الحالة"
                            onClick={(e) => e.stopPropagation()}
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
                            color={getPaymentStatusTagColor(o.paymentStatus)}
                            style={{ 
                              cursor: 'pointer', 
                              userSelect: 'none',
                              transition: 'all 0.3s ease'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPayment(o.id);
                            }}
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
                            {getPaymentStatusText(o.paymentStatus)}
                          </Tag>
                        )}
                      </td>
                      <td>{new Date(o.createdAt).toLocaleString()}</td>
                      <td>
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => handleViewDetails(o)}
                        >
                          تفاصيل الطلب
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <OrderDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        onStatusChange={onChangeStatus}
        onPaymentStatusChange={onChangePayment}
      />
    </div>
  );
};

export default OrdersPage;
 