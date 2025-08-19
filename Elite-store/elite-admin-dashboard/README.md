# Elite Store Admin Dashboard

A complete, modern admin dashboard for managing Elite Store e-commerce platform built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **🔐 Authentication & Authorization** - Secure admin login with JWT tokens
- **📊 Dashboard Overview** - Real-time statistics and key metrics
- **🛍️ Product Management** - Full CRUD operations for products
- **📦 Category Management** - Organize products into categories
- **🛒 Order Management** - View and manage customer orders
- **👥 User Management** - Manage customer accounts and admin users
- **📈 Analytics** - Insights and reports (coming soon)
- **⚙️ Settings** - Store configuration (coming soon)
- **📱 Responsive Design** - Works on all devices
- **🎨 Modern UI** - Clean and intuitive interface
- **⚡ Fast Performance** - Built with Vite for optimal speed

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Query (TanStack Query)
- **Forms:** React Hook Form
- **HTTP Client:** Axios
- **Icons:** Heroicons & Lucide React
- **Notifications:** React Hot Toast
- **UI Components:** Custom components with Headless UI

## 📋 Prerequisites

- **Node.js** 16+ 
- **npm** or **yarn**
- **Elite Store Backend** running on port 3001

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_UPLOADS_BASE_URL=http://localhost:3001/uploads
VITE_APP_NAME="Elite Store Admin"
VITE_APP_VERSION="1.0.0"
```

### 3. Start Development Server

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

### 4. Admin Login Credentials

```
Email: admin@elitestore.com
Password: admin123456
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, etc.)
│   ├── forms/           # Form components
│   ├── tables/          # Table components
│   └── charts/          # Chart components
├── context/             # React contexts
│   └── AuthContext.tsx  # Authentication context
├── hooks/               # Custom React hooks
├── layouts/             # Layout components
│   └── DashboardLayout.tsx
├── pages/               # Page components
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Dashboard pages
│   ├── products/        # Product management
│   ├── categories/      # Category management
│   ├── orders/          # Order management
│   ├── users/           # User management
│   ├── analytics/       # Analytics pages
│   └── settings/        # Settings pages
├── services/            # API services
│   └── api.ts           # Main API service
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── constants.ts     # App constants
│   ├── validators.ts    # Form validation
│   └── index.ts         # General utilities
├── App.tsx              # Main App component
└── main.tsx             # App entry point
```

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Type checking
npx tsc --noEmit         # Check TypeScript types
```

## 🔑 Admin Features

### Dashboard Overview
- Total users, products, orders, and revenue
- Recent orders and activity
- Quick statistics with progress bars
- Real-time data updates

### Product Management
- **View Products** - Paginated table with search and filters
- **Add Product** - Complete form with image upload
- **Edit Product** - Update all product details
- **Delete Product** - Safe deletion with confirmation
- **Categories** - Assign products to categories
- **SEO** - Meta titles and descriptions
- **Inventory** - Stock tracking and management

### Order Management
- **View Orders** - All customer orders with status
- **Order Details** - Complete order information
- **Status Updates** - Change order and payment status
- **Customer Info** - View customer details
- **Order Items** - List of purchased products

### User Management
- **View Users** - All registered users
- **User Roles** - Admin, moderator, user roles
- **Account Status** - Active, inactive, suspended
- **Email Verification** - Track verification status

### Categories
- **View Categories** - Hierarchical category structure
- **Add Category** - Create new product categories
- **Edit Category** - Update category information
- **Delete Category** - Remove unused categories

## 🔌 API Integration

The dashboard connects to the Elite Store backend API:

- **Base URL:** `http://localhost:3001/api`
- **Authentication:** JWT Bearer tokens
- **Auto-refresh:** Tokens refresh automatically
- **Error Handling:** Global error handling with user notifications

### Key API Endpoints Used

```
POST /auth/login          # Admin login
GET  /admin/dashboard     # Dashboard stats
GET  /admin/activity      # Recent activity
GET  /products            # Product list
POST /admin/products      # Create product
GET  /users               # User list
GET  /orders              # Order list
GET  /categories          # Category list
```

## 🎨 UI Components

### Basic Components
- **Button** - Various styles and sizes
- **Input** - Form inputs with validation
- **Card** - Content containers
- **Table** - Data tables with sorting
- **Modal** - Popup dialogs

### Custom Components
- **AuthContext** - Authentication state management
- **ProtectedRoute** - Route protection
- **DashboardLayout** - Main layout with sidebar
- **LoadingSpinner** - Loading indicators

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Admin-only Access** - Restricted to admin users
- **Auto Logout** - Session timeout handling
- **Route Protection** - Unauthorized access prevention
- **CSRF Protection** - Request validation

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Perfect tablet experience
- **Desktop** - Full desktop functionality
- **Touch Friendly** - Mobile-optimized interactions

## 🎯 Performance

- **Code Splitting** - Lazy-loaded routes
- **Image Optimization** - Optimized image loading
- **Caching** - React Query caching
- **Bundle Size** - Optimized bundle splitting

## 🐛 Troubleshooting

### Common Issues

1. **Login Issues**
   - Ensure backend is running on port 3001
   - Check admin credentials are correct
   - Verify network connectivity

2. **API Errors**
   - Check backend API is accessible
   - Verify CORS configuration
   - Check browser console for errors

3. **Build Issues**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify all dependencies are installed

### Debug Mode

Enable debug mode by setting:
```env
VITE_NODE_ENV=development
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Static Hosting

The built files will be in the `dist` folder. Deploy to:
- **Vercel**
- **Netlify** 
- **AWS S3**
- **nginx**

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_UPLOADS_BASE_URL=https://your-api-domain.com/uploads
VITE_APP_NAME="Elite Store Admin"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Heroicons for beautiful icons
- All the open source contributors

---

**Elite Store Admin Dashboard** - Built with ❤️ for modern e-commerce management
```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
