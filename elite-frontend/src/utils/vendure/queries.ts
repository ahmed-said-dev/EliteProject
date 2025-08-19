/**
 * GraphQL Queries for Product Filtering
 * Elite Veterinary Project - Vendure Integration
 */

// Get all available product filters
export const GET_PRODUCT_FILTERS = `
  query GetProductFilters($collectionSlug: String, $languageCode: LanguageCode) {
    productFilters(collectionSlug: $collectionSlug, languageCode: $languageCode) {
      categories {
        id
        name
        nameAr
        code
        count
        parentId
        children {
          id
          name
          nameAr
          code
          count
        }
      }
      brands {
        id
        name
        nameAr
        code
        slug
        count
      }
      priceRange {
        min
        max
        currency
      }
      stockStatus {
        inStock
        outOfStock
        lowStock
      }
      tags {
        id
        name
        nameAr
        code
        count
      }
    }
  }
`;

// Get filtered products
export const GET_FILTERED_PRODUCTS = `
  query GetFilteredProducts(
    $input: SearchInput!
    $filters: ProductFilterInput
  ) {
    filteredProducts(input: $input, filters: $filters) {
      items {
        productId
        slug
        productName
        productAsset {
          id
          preview
          source
        }
        price {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        currencyCode
        facetValues {
          id
          name
          facet {
            id
            name
            code
          }
        }
        score
      }
      totalItems
      facetValues {
        facetValue {
          id
          name
          facet {
            id
            name
            code
          }
        }
        count
      }
    }
  }
`;

// Get sort options with localization
export const GET_SORT_OPTIONS = `
  query GetSortOptions($languageCode: LanguageCode) {
    sortOptions(languageCode: $languageCode) {
      key
      value
      nameEn
      nameAr
    }
  }
`;

// Get product categories for filter tree
export const GET_PRODUCT_CATEGORIES = `
  query GetProductCategories($languageCode: LanguageCode, $parentId: ID) {
    productCategories(languageCode: $languageCode, parentId: $parentId) {
      id
      name
      nameAr
      code
      count
      parentId
      children {
        id
        name
        nameAr
        code
        count
      }
    }
  }
`;

// Get product brands
export const GET_PRODUCT_BRANDS = `
  query GetProductBrands($languageCode: LanguageCode, $collectionSlug: String) {
    productBrands(languageCode: $languageCode, collectionSlug: $collectionSlug) {
      id
      name
      nameAr
      code
      slug
      count
    }
  }
`;

// Get price range for current filters
export const GET_PRICE_RANGE = `
  query GetPriceRange(
    $categoryIds: [ID!]
    $brandIds: [ID!]
    $collectionSlug: String
  ) {
    productPriceRange(
      categoryIds: $categoryIds
      brandIds: $brandIds
      collectionSlug: $collectionSlug
    ) {
      min
      max
      currency
    }
  }
`;

// Search products with basic filters (existing Vendure query)
export const SEARCH_PRODUCTS = `
  query SearchProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        productId
        slug
        productName
        productAsset {
          id
          preview
          source
        }
        price {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
          ... on SinglePrice {
            value
          }
        }
        currencyCode
        facetValues {
          id
          name
          facet {
            id
            name
            code
          }
        }
      }
      totalItems
      facetValues {
        facetValue {
          id
          name
          facet {
            id
            name
            code
          }
        }
        count
      }
    }
  }
`;

// Get product details by ID or slug
export const GET_PRODUCT = `
  query GetProduct($id: ID, $slug: String) {
    product(id: $id, slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        id
        preview
        source
      }
      assets {
        id
        preview
        source
      }
      variants {
        id
        name
        price
        priceWithTax
        currencyCode
        stockLevel
        featuredAsset {
          id
          preview
          source
        }
      }
      facetValues {
        id
        name
        code
        facet {
          id
          name
          code
        }
      }
      collections {
        id
        name
        slug
        breadcrumbs {
          id
          name
          slug
        }
      }
    }
  }
`;