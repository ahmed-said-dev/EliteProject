import React, { useState } from 'react';
import { useAuth } from '@/context/SaleorAuthContext';
import { useSaleorOrders, formatPrice, getOrderStatusText, getPaymentStatusText, getFulfillmentStatusText } from '@/hooks/useSaleorOrders';
import styles from './CustomerDashboard.module.css';

interface DashboardTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: 'fa-chart-line' },
    { id: 'orders', label: 'طلباتي', icon: 'fa-shopping-bag' },
    { id: 'profile', label: 'الملف الشخصي', icon: 'fa-user' },
  ];

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <i className={`fas ${tab.icon}`}></i>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

const OverviewTab: React.FC = () => {
  const { orders } = useSaleorOrders();
  
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'FULFILLED').length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total.gross.amount, 0);
  const pendingOrders = orders.filter(order => order.status === 'UNFULFILLED').length;

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className={styles.statInfo}>
            <h3>{totalOrders}</h3>
            <p>إجمالي الطلبات</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className={styles.statInfo}>
            <h3>{completedOrders}</h3>
            <p>طلبات مكتملة</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className={styles.statInfo}>
            <h3>{formatPrice(totalSpent)}</h3>
            <p>إجمالي المشتريات</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-clock"></i>
          </div>
          <div className={styles.statInfo}>
            <h3>{pendingOrders}</h3>
            <p>طلبات قيد الانتظار</p>
          </div>
        </div>
      </div>

      <div className={styles.recentOrdersSection}>
        <h3>آخر الطلبات</h3>
        {orders.slice(0, 3).map((order) => (
          <div key={order.id} className={styles.recentOrderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderId}>#{order.id.slice(-8)}</span>
              <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                {getOrderStatusText(order.status)}
              </span>
            </div>
            <div className={styles.orderInfo}>
              <span>{formatPrice(order.total, order.currency_code)}</span>
              <span>{new Date(order.created_at).toLocaleDateString('ar-EG')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersTab: React.FC = () => {
  const { orders, loading, error } = useSaleorOrders();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>جاري تحميل الطلبات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <i className="fas fa-exclamation-triangle"></i>
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <i className="fas fa-shopping-bag"></i>
        <h3>لا توجد طلبات بعد</h3>
        <p>لم تقم بأي عمليات شراء حتى الآن</p>
        <a href="/products" className={styles.shopButton}>
          تسوق الآن
        </a>
      </div>
    );
  }

  return (
    <div className={styles.ordersContainer}>
      <h3>جميع طلباتك ({orders.length})</h3>
      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.orderMeta}>
                <span className={styles.orderId}>طلب #{order.number || order.id.slice(-8)}</span>
                <span className={styles.orderDate}>
                  {new Date(order.created).toLocaleDateString('ar-EG')}
                </span>
              </div>
              <div className={styles.orderStatuses}>
                <span className={`${styles.status} ${styles[order.status]}`}>
                  {getOrderStatusText(order.status)}
                </span>
                <span className={`${styles.status} ${styles[order.paymentStatus]}`}>
                  {getPaymentStatusText(order.paymentStatus)}
                </span>
              </div>
            </div>

            <div className={styles.orderItems}>
              {order.lines.slice(0, 2).map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  {item.variant.product.thumbnail && (
                    <img 
                      src={item.variant.product.thumbnail.url} 
                      alt={item.variant.product.name}
                      className={styles.itemImage}
                    />
                  )}
                  <div className={styles.itemInfo}>
                    <h4>{item.variant.name}</h4>
                    <p>الكمية: {item.quantity}</p>
                    <span className={styles.itemPrice}>
                      {formatPrice(item.totalPrice.gross.amount, item.totalPrice.gross.currency)}
                    </span>
                  </div>
                </div>
              ))}
              {order.lines.length > 2 && (
                <p className={styles.moreItems}>
                  + {order.lines.length - 2} منتجات أخرى
                </p>
              )}
            </div>

            <div className={styles.orderFooter}>
              <div className={styles.orderTotal}>
                <strong>المجموع: {formatPrice(order.total.gross.amount, order.total.gross.currency)}</strong>
              </div>
              <button className={styles.viewOrderBtn}>
                عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileTab: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <i className="fas fa-user"></i>
        </div>
        <div className={styles.userInfo}>
          <h2>{user.first_name} {user.last_name}</h2>
          <p>{user.email}</p>
          {user.phone && <p>{user.phone}</p>}
        </div>
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.detailGroup}>
          <label>الاسم الأول</label>
          <input type="text" value={user.first_name} readOnly />
        </div>
        
        <div className={styles.detailGroup}>
          <label>الاسم الأخير</label>
          <input type="text" value={user.last_name} readOnly />
        </div>
        
        <div className={styles.detailGroup}>
          <label>البريد الإلكتروني</label>
          <input type="email" value={user.email} readOnly />
        </div>
        
        {user.phone && (
          <div className={styles.detailGroup}>
            <label>رقم الهاتف</label>
            <input type="tel" value={user.phone} readOnly />
          </div>
        )}
        
        <div className={styles.detailGroup}>
          <label>تاريخ التسجيل</label>
          <input 
            type="text" 
            value={new Date(user.created_at).toLocaleDateString('ar-EG')} 
            readOnly 
          />
        </div>
      </div>

      <div className={styles.profileActions}>
        <button className={styles.editBtn}>
          <i className="fas fa-edit"></i>
          تعديل الملف الشخصي
        </button>
        <button className={styles.logoutBtn} onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { user } = useAuth();

  if (!user) {
    return (
      <div className={styles.accessDenied}>
        <i className="fas fa-lock"></i>
        <h2>يجب تسجيل الدخول أولاً</h2>
        <p>الرجاء تسجيل الدخول للوصول إلى لوحة التحكم</p>
        <a href="/login" className={styles.loginBtn}>
          تسجيل الدخول
        </a>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'orders':
        return <OrdersTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1>مرحباً، {user.first_name}!</h1>
        <p>إدارة حسابك وطلباتك من هنا</p>
      </div>
      
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CustomerDashboard;