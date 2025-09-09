# WhatsApp Button Component

A floating action button component that provides direct WhatsApp contact functionality for customers.

## Features

- 🎯 Floating action button with customizable position
- 💬 Interactive chat bubble preview
- 🌍 Multi-language support (Arabic/English)
- 📱 Mobile responsive design
- ♿ Accessibility compliant
- 🎨 Modern design with hover animations

## Usage

### Basic Usage
```tsx
import WhatsAppButton from '@/components/WhatsAppButton';

<WhatsAppButton />
```

### With Custom Phone Number
```tsx
<WhatsAppButton 
  phoneNumber="+971501234567"
  position="bottom-right"
/>
```

### With Custom Message
```tsx
<WhatsAppButton 
  phoneNumber="+971501234567"
  message="Hello! I need help with my pet."
  position="bottom-left"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `phoneNumber` | string | `"+971501234567"` | WhatsApp business phone number |
| `message` | string | Auto-translated | Default message to send |
| `position` | `"bottom-right" \| "bottom-left"` | `"bottom-right"` | Position of the button |

## Customization

### Change Business Phone Number
Update the `phoneNumber` prop in `Layout.jsx`:

```jsx
<WhatsAppButton 
  phoneNumber="+971501234567" // Replace with your business number
  position="bottom-right"
/>
```

### Modify Translations
Update the translations in:
- `public/locales/en/common.json`
- `public/locales/ar/common.json`

```json
"whatsapp": {
  "contactUs": "Contact us on WhatsApp",
  "hello": "Hello! How can we help you with your pet care today?",
  "startChat": "Start Chat",
  "online": "Online now",
  "close": "Close",
  "defaultMessage": "Hello, I would like to inquire about your veterinary services"
}
```

### Styling
Modify `WhatsAppButton.module.css` to change:
- Colors
- Size
- Animation
- Position offset

## Implementation Details

### Phone Number Format
The component automatically formats phone numbers by removing non-numeric characters and creating a proper WhatsApp URL.

### Message Encoding
Messages are URL-encoded to handle special characters and emojis properly.

### RTL Support
The component automatically adjusts positioning and layout for RTL languages.

### Mobile Optimization
- Smaller button size on mobile devices
- Responsive chat bubble width
- Touch-friendly interactions

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast support

## Dependencies

- React
- Next.js i18n for translations
- CSS Modules for styling
