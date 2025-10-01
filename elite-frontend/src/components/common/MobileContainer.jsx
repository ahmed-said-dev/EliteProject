import React from 'react';

/**
 * مكون حاوي للموبايل - يضمن العرض الكامل على الشاشات الصغيرة
 */
const MobileContainer = ({ 
  children, 
  fullWidth = false, 
  noPadding = false, 
  className = '',
  ...props 
}) => {
  const containerClasses = [
    fullWidth ? 'mobile-full-width' : 'mobile-container',
    noPadding ? 'px-0' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

export default MobileContainer;
