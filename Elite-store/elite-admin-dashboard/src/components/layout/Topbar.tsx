import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  BellIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const Topbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle">
          <Bars3Icon className="w-6 h-6" />
        </button>
        
        <div className="breadcrumb">
          <h1>مرحباً بك في لوحة التحكم</h1>
          <p>Elite Veterinary Center Dashboard</p>
        </div>
      </div>

      <div className="topbar-right">
        {/* Notifications */}
        <button className="notification-btn">
          <BellIcon className="w-6 h-6" />
          <span className="notification-badge">3</span>
        </button>

        {/* User Menu */}
        <div className="user-menu">
          <div className="user-info">
            <div className="user-avatar">
              <UserCircleIcon className="w-8 h-8" />
            </div>
            <div className="user-details">
              <span className="user-name">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="logout-btn"
            title="تسجيل الخروج"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
 