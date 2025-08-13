import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  ShoppingCartIcon,
  TagIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CogIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

// Custom Veterinary Icons
const PawIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.5 12c1.38 0 2.5-1.12 2.5-2.5S9.88 7 8.5 7 6 8.12 6 9.5s1.12 2.5 2.5 2.5zm7 0c1.38 0 2.5-1.12 2.5-2.5S16.88 7 15.5 7 13 8.12 13 9.5s1.12 2.5 2.5 2.5zm-10-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm13 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6.5 6c2.5 0 4.5-2 4.5-4.5 0-.83-.23-1.6-.6-2.28-.15-.27-.43-.47-.77-.47s-.62.2-.77.47c-.37.68-.6 1.45-.6 2.28 0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25c0-.83-.23-1.6-.6-2.28-.15-.27-.43-.47-.77-.47s-.62.2-.77.47c-.37.68-.6 1.45-.6 2.28C7.5 14 9.5 16 12 16z"/>
  </svg>
);

const Sidebar: React.FC = () => {
  const menuItems = [
    { 
      to: '/dashboard', 
      icon: HomeIcon, 
      label: 'لوحة التحكم',
      englishLabel: 'Dashboard'
    },
    { 
      to: '/products', 
      icon: ShoppingBagIcon, 
      label: 'المنتجات',
      englishLabel: 'Products'
    },
    { 
      to: '/categories', 
      icon: TagIcon, 
      label: 'الفئات',
      englishLabel: 'Categories'
    },
    { 
      to: '/orders', 
      icon: ShoppingCartIcon, 
      label: 'الطلبات',
      englishLabel: 'Orders'
    },
    // { 
    //   to: '/appointments', 
    //   icon: CalendarIcon, 
    //   label: 'المواعيد',
    //   englishLabel: 'Appointments'
    // },
    // { 
    //   to: '/users', 
    //   icon: UsersIcon, 
    //   label: 'المستخدمين',
    //   englishLabel: 'Users'
    // },
    // { 
    //   to: '/team', 
    //   icon: UserGroupIcon, 
    //   label: 'الفريق الطبي',
    //   englishLabel: 'Medical Team'
    // },
    // { 
    //   to: '/blog', 
    //   icon: DocumentTextIcon, 
    //   label: 'المدونة',
    //   englishLabel: 'Blog'
    // },
    // { 
    //   to: '/settings', 
    //   icon: CogIcon, 
    //   label: 'الإعدادات',
    //   englishLabel: 'Settings'
    // },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="logo">
          <HeartIcon className="logo-icon" />
          <div className="logo-text">
            <h2>Elite Vet</h2>
            <p>المركز البيطري المتخصص</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.to}>
                <NavLink 
                  to={item.to} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <IconComponent className="nav-icon" />
                  <span className="nav-label">
                    <span className="arabic">{item.label}</span>
                    <span className="english">{item.englishLabel}</span>
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Decorative Elements */}
      <div className="sidebar-footer">
        <div className="paw-prints">
          <PawIcon className="paw-print paw-1" />
          <PawIcon className="paw-print paw-2" />
          <PawIcon className="paw-print paw-3" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
 