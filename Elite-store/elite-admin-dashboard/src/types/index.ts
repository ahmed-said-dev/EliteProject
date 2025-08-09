// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  status: string;
  featured: boolean;
  published: boolean;
  weight?: number;
  dimensions?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  viewsCount: number;
  salesCount: number;
  categoryId: string;
  category?: Category;
  images?: ProductImage[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  filename: string;
  isPrimary: boolean;
  sortOrder: number;
  productId: string;
  createdAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  verified: boolean;
  userId: string;
  user?: User;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  products?: Product[];
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  currency: string;
  paymentStatus: string;
  paymentMethod?: string;
  shippingAddress: string;
  billingAddress: string;
  notes?: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  orderId: string;
  productId: string;
  product?: Product;
}

// Cart Types
export interface Cart {
  id: string;
  userId: string;
  user?: User;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  cartId: string;
  productId: string;
  product?: Product;
  createdAt: string;
}

// Appointment Types (للعيادة البيطرية)
export interface Appointment {
  id: string;
  date: string;
  time: string;
  status: string;
  type: string;
  notes?: string;
  petName: string;
  petType: string;
  petAge?: number;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  doctorId?: string;
  doctor?: TeamMember;
  createdAt: string;
  updatedAt: string;
}

// Team Member Types (للأطباء والموظفين)
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  specialization?: string;
  experience?: number;
  bio?: string;
  image?: string;
  isActive: boolean;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: string;
  published: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  categoryId?: string;
  category?: Category;
  authorId: string;
  author?: User;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Generic API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filter?: Record<string, any>;
  // Product filters
  categoryId?: string;
  status?: string;
  published?: boolean;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

// Form Types
export interface FormError {
  field: string;
  message: string;
}

// Dashboard Statistics Types
export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyRevenue: number[];
  recentOrders: Order[];
  topProducts: Product[];
  lowStockProducts: Product[];
}
 