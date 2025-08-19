// Saleor Configuration
export const saleorConfig = {
  // Saleor API endpoint
  apiUrl: process.env.NEXT_PUBLIC_SALEOR_API_URL || 'http://localhost:8000/graphql/',
  
  // Saleor Dashboard URL
  dashboardUrl: process.env.NEXT_PUBLIC_SALEOR_DASHBOARD_URL || 'http://localhost:9000',
  
  // Default channel
  defaultChannel: 'default-channel',
  
  // Supported currencies
  currencies: ['USD', 'EUR', 'SAR'],
  
  // Default currency
  defaultCurrency: 'USD',
  
  // Supported languages
  languages: ['en', 'ar'],
  
  // Default language
  defaultLanguage: 'en',
  
  // Features
  features: {
    // Enable cart persistence
    persistentCart: true,
    
    // Enable wishlist
    wishlist: true,
    
    // Enable product reviews
    reviews: true,
    
    // Enable guest checkout
    guestCheckout: true,
  },
  
  // Pagination
  pagination: {
    productsPerPage: 20,
    ordersPerPage: 10,
  },
};

export default saleorConfig;