import React, { useState } from 'react';
import { Select, Card, Row, Col, Statistic, Spin, Alert, Button, DatePicker } from 'antd';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import {
  useSalesByPeriod,
  useTopCustomers,
  useSalesByCategory,
  useOrderStatusDistribution,
  usePaymentMethodDistribution,
  useSalesGrowth,
  useMonthlyRevenue
} from './hooks';

const { RangePicker } = DatePicker;

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0', '#ffb347'];

const ReportsPage: React.FC = () => {
  const [salesPeriod, setSalesPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [salesDays, setSalesDays] = useState(30);

  // Fetch data using hooks
  const { data: salesData, isLoading: salesLoading, error: salesError } = useSalesByPeriod(salesPeriod, salesDays);
  const { data: topCustomers, isLoading: customersLoading } = useTopCustomers(10);
  const { data: categoryData, isLoading: categoryLoading } = useSalesByCategory();
  const { data: statusData, isLoading: statusLoading } = useOrderStatusDistribution();
  const { data: paymentData, isLoading: paymentLoading } = usePaymentMethodDistribution();
  const { data: growthData, isLoading: growthLoading } = useSalesGrowth();
  const { data: monthlyRevenue, isLoading: revenueLoading } = useMonthlyRevenue();

  // Prepare monthly revenue chart data
  const monthlyRevenueData = monthlyRevenue?.map((revenue, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (monthlyRevenue.length - 1 - index));
    return {
      month: date.toLocaleDateString('ar-EG', { month: 'short', year: 'numeric' }),
      revenue: revenue
    };
  }) || [];

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  if (salesError) {
    return <Alert message="خطأ في تحميل البيانات" type="error" showIcon />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">تقارير المبيعات والتحليلات</h1>
        <p className="page-subtitle">تحليل شامل لأداء المتجر والمبيعات</p>
      </div>

      {/* Growth Statistics */}
      {growthData && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="مبيعات الشهر الحالي"
                value={growthData.currentMonth.sales}
                formatter={formatCurrency}
                prefix={<CurrencyDollarIcon className="w-5 h-5" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="طلبات الشهر الحالي"
                value={growthData.currentMonth.orders}
                prefix={<ShoppingCartIcon className="w-5 h-5" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="نمو المبيعات"
                value={growthData.growth.sales}
                suffix="%"
                valueStyle={{ color: growthData.growth.sales >= 0 ? '#3f8600' : '#cf1322' }}
                prefix={growthData.growth.sales >= 0 ? 
                  <ArrowTrendingUpIcon className="w-5 h-5" /> : 
                  <ArrowTrendingDownIcon className="w-5 h-5" />
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="نمو الطلبات"
                value={growthData.growth.orders}
                suffix="%"
                valueStyle={{ color: growthData.growth.orders >= 0 ? '#3f8600' : '#cf1322' }}
                prefix={growthData.growth.orders >= 0 ? 
                  <ArrowTrendingUpIcon className="w-5 h-5" /> : 
                  <ArrowTrendingDownIcon className="w-5 h-5" />
                }
              />
            </Card>
          </Col>
        </Row>
      )}

      <Row gutter={[16, 16]}>
        {/* Sales Chart */}
        <Col xs={24} lg={16}>
          <Card 
            title="مبيعات حسب الفترة"
            loading={salesLoading}
            extra={
              <div style={{ display: 'flex', gap: 8 }}>
                <Select
                  value={salesPeriod}
                  onChange={setSalesPeriod}
                  style={{ width: 120 }}
                  options={[
                    { label: 'يومي', value: 'daily' },
                    { label: 'أسبوعي', value: 'weekly' },
                    { label: 'شهري', value: 'monthly' },
                  ]}
                />
                <Select
                  value={salesDays}
                  onChange={setSalesDays}
                  style={{ width: 100 }}
                  options={[
                    { label: '7 أيام', value: 7 },
                    { label: '30 يوم', value: 30 },
                    { label: '90 يوم', value: 90 },
                  ]}
                />
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value, name) => [name === 'sales' ? formatCurrency(Number(value)) : value, name === 'sales' ? 'المبيعات' : 'الطلبات']} />
                <Legend />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="المبيعات" />
                <Area type="monotone" dataKey="orders" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="عدد الطلبات" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Monthly Revenue */}
        <Col xs={24} lg={8}>
          <Card title="الإيرادات الشهرية" loading={revenueLoading}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'الإيرادات']} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Sales by Category */}
        <Col xs={24} lg={12}>
          <Card title="المبيعات حسب الفئة" loading={categoryLoading}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData?.slice(0, 8) || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'المبيعات']} />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Order Status Distribution */}
        <Col xs={24} lg={12}>
          <Card title="توزيع حالات الطلبات" loading={statusLoading}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ label, percentage }) => `${label}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="label"
                >
                  {(statusData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Payment Methods */}
        <Col xs={24} lg={12}>
          <Card title="طرق الدفع" loading={paymentLoading}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ label, percentage }) => `${label}: ${percentage}%`}
                  outerRadius={80}
                  fill="#82ca9d"
                  dataKey="count"
                  nameKey="label"
                >
                  {(paymentData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Top Customers */}
        <Col xs={24} lg={12}>
          <Card title="أفضل العملاء" loading={customersLoading}>
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {topCustomers?.map((customer, index) => (
                <div key={customer.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '12px 0',
                  borderBottom: index < topCustomers.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>#{index + 1} {customer.name}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>{customer.email}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>{customer.orderCount} طلب</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                    {formatCurrency(customer.totalSpent)}
                  </div>
                </div>
              ))}
              {(!topCustomers || topCustomers.length === 0) && (
                <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  لا توجد بيانات عملاء
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportsPage;
