# Elite Veterinary Clinic - Localization Guide

This document provides a comprehensive guide for using the localization system in the Elite Veterinary Clinic frontend application.

## 🌍 Overview

The application supports multiple languages with full RTL (Right-to-Left) support for Arabic and LTR (Left-to-Right) for English. The localization system includes:

- **Translation Management**: JSON-based translation files
- **Direction Support**: Automatic RTL/LTR layout switching
- **Number & Date Formatting**: Locale-aware formatting
- **Currency Display**: Multi-currency support with proper formatting
- **Component Integration**: Easy-to-use hooks and components

## 📁 File Structure

```
elite-frontend/
├── public/locales/
│   ├── en/common.json          # English translations
│   └── ar/common.json          # Arabic translations
├── src/
│   ├── context/
│   │   └── LanguageContext.js  # Language context provider
│   ├── hooks/
│   │   └── useTranslation.js   # Enhanced translation hook
│   └── components/
│       ├── LanguageSwitcher/   # Language switcher component
│       └── LocalizedContent/   # Localization utilities
└── i18n.js                     # Translation configuration
```

## 🚀 Quick Start

### 1. Using the Translation Hook

```tsx
import { useLanguage } from '@/context/LanguageContext';

function MyComponent() {
  const { t, locale, isRTL, changeLanguage } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <div dir={dir}>
      <h1>{t('header.title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 2. Using Enhanced Translation Hook

```tsx
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t, formatPrice, formatDate, getDirectionClasses } = useTranslation();

  return (
    <div className={getDirectionClasses('my-component')}>
      <h1>{t('welcome.message', { name: 'Ahmed' })}</h1>
      <p>{formatPrice(1500, 'SAR')}</p>
      <span>{formatDate(new Date(), { dateStyle: 'long' })}</span>
    </div>
  );
}
```

### 3. Using Localized Components

```tsx
import { 
  LocalizedContent, 
  LocalizedText, 
  LocalizedPrice,
  LocalizedDate 
} from '@/components/LocalizedContent';

function ProductCard({ product }) {
  return (
    <LocalizedContent className="product-card">
      <LocalizedText 
        translationKey="product.name" 
        params={{ name: product.name }}
        tag="h3"
      />
      <LocalizedPrice amount={product.price} />
      <LocalizedDate date={product.createdAt} />
    </LocalizedContent>
  );
}
```

## 📝 Translation File Structure

### English (en/common.json)
```json
{
  "header": {
    "home": "Home",
    "about": "About Us",
    "services": "Services"
  },
  "welcome": {
    "message": "Welcome, {{name}}!"
  },
  "product": {
    "price": "Price: {{amount}}",
    "inStock": "In Stock",
    "outOfStock": "Out of Stock"
  }
}
```

### Arabic (ar/common.json)
```json
{
  "header": {
    "home": "الرئيسية",
    "about": "من نحن",
    "services": "الخدمات"
  },
  "welcome": {
    "message": "مرحباً، {{name}}!"
  },
  "product": {
    "price": "السعر: {{amount}}",
    "inStock": "متوفر",
    "outOfStock": "غير متوفر"
  }
}
```

## 🎨 Styling for RTL/LTR

### CSS Classes

```css
/* Direction-aware styles */
.component {
  text-align: left;
}

.component.rtl {
  text-align: right;
}

/* Using CSS logical properties (recommended) */
.component {
  margin-inline-start: 16px;
  padding-inline-end: 12px;
  border-inline-start: 1px solid #ccc;
}
```

### Tailwind CSS

```tsx
function MyComponent() {
  const { isRTL } = useLanguage();
  
  return (
    <div className={`
      ${isRTL ? 'text-right' : 'text-left'}
      ${isRTL ? 'ml-4' : 'mr-4'}
    `}>
      Content
    </div>
  );
}
```

## 🔧 Advanced Features

### 1. Parameter Interpolation

```tsx
// Translation file
{
  "greeting": "Hello {{name}}, you have {{count}} messages"
}

// Component usage
const message = t('greeting', { name: 'Ahmed', count: 5 });
// Result: "Hello Ahmed, you have 5 messages"
```

### 2. Pluralization

```tsx
// Translation files
{
  "itemCountZero": "No items",
  "itemCountOne": "1 item", 
  "itemCountOther": "{{count}} items"
}

// Component usage
const { getPlural } = useTranslation();
const text = getPlural('itemCount', itemCount);
```

### 3. Currency Formatting

```tsx
import { formatCurrency } from '@/lib/currency';

// Automatic locale detection
const price = formatCurrency(1500, 'SAR', locale);
// Arabic: "1500 ﷼"
// English: "SAR 1,500"
```

### 4. Number & Date Formatting

```tsx
const { formatNumber, formatDate } = useTranslation();

// Numbers
const formatted = formatNumber(1234.56);
// Arabic: "١٬٢٣٤٫٥٦"
// English: "1,234.56"

// Dates
const dateStr = formatDate(new Date(), { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});
// Arabic: "١٥ يناير ٢٠٢٤"
// English: "January 15, 2024"
```

## 🎯 Best Practices

### 1. Key Naming Convention

```
section.subsection.element
```

Examples:
- `header.navigation.home`
- `product.details.price`
- `auth.login.submitButton`

### 2. Component Structure

```tsx
function MyPage() {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <main dir={dir}>
      <PageBanner title={t('page.title')} />
      {/* Page content */}
    </main>
  );
}
```

### 3. Form Labels and Placeholders

```tsx
<input
  type="email"
  placeholder={t('auth.email.placeholder')}
  aria-label={t('auth.email.label')}
/>
```

### 4. Error Messages

```tsx
{error && (
  <div className="error-message">
    {t(`errors.${error.type}`, { field: error.field })}
  </div>
)}
```

## 🚀 Adding New Languages

### 1. Create Translation File

Create a new JSON file in `public/locales/[locale]/common.json`

### 2. Update Language Context

```js
// Update supported locales in next.config.js
i18n: {
  locales: ['en', 'ar', 'fr'], // Add new locale
  defaultLocale: 'en',
},
```

### 3. Add to Language Switcher

```tsx
// Update languages array in LanguageSwitcher.tsx
const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];
```

## 🐛 Troubleshooting

### Common Issues

1. **Missing Translations**: Returns the key instead of translated text
   - Check if the key exists in the translation file
   - Verify the key path is correct

2. **RTL Layout Issues**: Content not displaying correctly in Arabic
   - Ensure `dir` attribute is set on container elements
   - Use CSS logical properties instead of left/right

3. **Number Formatting**: Numbers not displaying in Arabic numerals
   - Check locale configuration in Intl.NumberFormat
   - Verify Arabic locale is 'ar-SA'

### Debug Mode

```tsx
// Enable translation debugging
const { t } = useLanguage();
console.log('Current locale:', locale);
console.log('Translation result:', t('some.key'));
```

## 📚 Resources

- [React Internationalization](https://react.i18next.com/)
- [Next.js i18n](https://nextjs.org/docs/advanced-features/i18n)
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

---

For questions or issues, please contact the development team or create an issue in the project repository.
