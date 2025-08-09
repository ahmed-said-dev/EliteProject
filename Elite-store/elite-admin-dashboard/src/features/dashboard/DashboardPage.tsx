import React from 'react';
import { 
  ShoppingBagIcon, 
  UsersIcon, 
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { 
  useDashboardStats, 
  useRecentOrders, 
  useTopProducts, 
  useLowStockProducts 
} from './hooks';

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => (
  <div className="card stats-card">
    <div className="card-body">
      <div className="stats-content">
        <div className="stats-info">
          <h3 className="stats-title">{title}</h3>
          <p className="stats-value">{value}</p>
          {trend && (
            <div className={`stats-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
              <ArrowTrendingUpIcon className="w-4 h-4" />
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        <div className={`stats-icon ${color}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  </div>
);

// Quick Actions Component
const QuickActions: React.FC = () => (
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">إجراءات سريعة</h3>
    </div>
    <div className="card-body">
      <div className="quick-actions-grid">
        <button className="quick-action-btn">
          <ShoppingBagIcon className="w-6 h-6" />
          <span>إضافة منتج جديد</span>
        </button>
        <button className="quick-action-btn">
          <UsersIcon className="w-6 h-6" />
          <span>إضافة مستخدم</span>
        </button>
        <button className="quick-action-btn">
          <ShoppingCartIcon className="w-6 h-6" />
          <span>عرض الطلبات</span>
        </button>
        <button className="quick-action-btn">
          <CurrencyDollarIcon className="w-6 h-6" />
          <span>تقارير المبيعات</span>
        </button>
      </div>
    </div>
  </div>
);

// Recent Orders Component
const RecentOrders: React.FC = () => {
  const { data: orders, isLoading, error } = useRecentOrders(5);

  if (isLoading) return <div className="skeleton" style={{ height: '200px' }}></div>;
  if (error) return <div className="error-message">خطأ في تحميل الطلبات الحديثة</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">الطلبات الحديثة</h3>
      </div>
      <div className="card-body">
        {orders && orders.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>العميل</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.user?.firstName} {order.user?.lastName}</td>
                    <td>${order.totalAmount}</td>
                    <td>
                      <span className={`badge ${order.status === 'completed' ? 'badge-success' : 
                        order.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString('ar-EG')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-secondary">لا توجد طلبات حديثة</p>
        )}
      </div>
    </div>
  );
};

// Top Products Component
const TopProducts: React.FC = () => {
  const { data: products, isLoading, error } = useTopProducts(5);

  if (isLoading) return <div className="skeleton" style={{ height: '200px' }}></div>;
  if (error) return <div className="error-message">خطأ في تحميل المنتجات الأكثر مبيعاً</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">المنتجات الأكثر مبيعاً</h3>
      </div>
      <div className="card-body">
        {products && products.length > 0 ? (
          <div className="products-list">
            {products.map((product, index) => (
              <div key={product.id} className="product-item">
                <div className="product-rank">#{index + 1}</div>
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">${product.price}</p>
                </div>
                <div className="product-sales">
                  <span className="sales-count">{product.salesCount} مبيعات</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-secondary">لا توجد بيانات مبيعات</p>
        )}
      </div>
    </div>
  );
};

// Low Stock Alert Component
const LowStockAlert: React.FC = () => {
  const { data: products, isLoading, error } = useLowStockProducts(5);

  if (isLoading) return <div className="skeleton" style={{ height: '150px' }}></div>;
  if (error) return <div className="error-message">خطأ في تحميل المنتجات منخفضة المخزون</div>;

  if (!products || products.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">تنبيهات المخزون</h3>
        </div>
        <div className="card-body">
          <p className="text-center text-success">جميع المنتجات متوفرة في المخزون</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card alert-card">
      <div className="card-header">
        <h3 className="card-title">
          <ExclamationTriangleIcon className="w-5 h-5 text-warning inline ml-2" />
          تنبيهات المخزون
        </h3>
      </div>
      <div className="card-body">
        <div className="alert-list">
          {products.map((product) => (
            <div key={product.id} className="alert-item">
              <div className="alert-info">
                <h4 className="alert-title">{product.name}</h4>
                <p className="alert-description">
                  متبقي: {product.stockQuantity} وحدة فقط
                </p>
              </div>
              <span className="badge badge-warning">مخزون منخفض</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DashboardPage: React.FC = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">لوحة التحكم</h1>
        <p className="page-subtitle">مرحباً بك في لوحة تحكم المركز البيطري</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '120px' }}></div>
          ))
        ) : statsError ? (
          <div className="col-span-full error-message">خطأ في تحميل الإحصائيات</div>
        ) : stats ? (
          <>
            <StatsCard
              title="إجمالي المنتجات"
              value={stats.totalProducts}
              icon={ShoppingBagIcon}
              color="purple"
            />
            <StatsCard
              title="إجمالي الطلبات"
              value={stats.totalOrders}
              icon={ShoppingCartIcon}
              color="blue"
            />
            <StatsCard
              title="إجمالي المستخدمين"
              value={stats.totalUsers}
              icon={UsersIcon}
              color="green"
            />
            <StatsCard
              title="إجمالي الإيرادات"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              icon={CurrencyDollarIcon}
              color="yellow"
            />
          </>
        ) : null}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-left">
          <RecentOrders />
          <TopProducts />
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          <QuickActions />
          <LowStockAlert />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
 