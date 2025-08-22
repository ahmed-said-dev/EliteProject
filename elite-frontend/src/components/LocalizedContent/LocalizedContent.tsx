import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/currency';

interface LocalizedContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component that provides localization context to its children
 */
export const LocalizedContent: React.FC<LocalizedContentProps> = ({ 
  children, 
  className = '' 
}) => {
  const { isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  return (
    <div 
      className={`${className} ${textAlign}`.trim()} 
      dir={dir}
    >
      {children}
    </div>
  );
};

interface LocalizedTextProps {
  translationKey: string;
  params?: Record<string, string | number>;
  tag?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

/**
 * Component for displaying localized text
 */
export const LocalizedText: React.FC<LocalizedTextProps> = ({
  translationKey,
  params = {},
  tag: Tag = 'span',
  className = ''
}) => {
  const { t } = useLanguage();
  
  let text = t(translationKey);
  
  // Handle parameter interpolation
  Object.keys(params).forEach(key => {
    text = text.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(params[key]));
  });

  return <Tag className={className}>{text}</Tag>;
};

interface LocalizedPriceProps {
  amount: number;
  currency?: string;
  className?: string;
  showCurrency?: boolean;
}

/**
 * Component for displaying localized prices
 */
export const LocalizedPrice: React.FC<LocalizedPriceProps> = ({
  amount,
  currency = 'SAR',
  className = '',
  showCurrency = true
}) => {
  const { locale } = useLanguage();
  
  const formattedPrice = showCurrency 
    ? formatCurrency(amount, currency, locale === 'ar' ? 'ar-SA' : 'en-US')
    : new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US').format(amount);

  return <span className={className}>{formattedPrice}</span>;
};

interface LocalizedDateProps {
  date: Date | string;
  options?: Intl.DateTimeFormatOptions;
  className?: string;
}

/**
 * Component for displaying localized dates
 */
export const LocalizedDate: React.FC<LocalizedDateProps> = ({
  date,
  options = {},
  className = ''
}) => {
  const { locale } = useLanguage();
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formattedDate = new Intl.DateTimeFormat(
    locale === 'ar' ? 'ar-SA' : 'en-US', 
    options
  ).format(dateObj);

  return <span className={className}>{formattedDate}</span>;
};

interface LocalizedNumberProps {
  number: number;
  options?: Intl.NumberFormatOptions;
  className?: string;
}

/**
 * Component for displaying localized numbers
 */
export const LocalizedNumber: React.FC<LocalizedNumberProps> = ({
  number,
  options = {},
  className = ''
}) => {
  const { locale } = useLanguage();
  
  const formattedNumber = new Intl.NumberFormat(
    locale === 'ar' ? 'ar-SA' : 'en-US', 
    options
  ).format(number);

  return <span className={className}>{formattedNumber}</span>;
};

export default LocalizedContent;
