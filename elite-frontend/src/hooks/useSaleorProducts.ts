import { useState, useEffect, useCallback } from 'react';
import { gql } from '@apollo/client';
import { apolloClient } from '../lib/apollo';

// Types
export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  quantityAvailable?: number;
  pricing?: {
    price?: {
      gross: {
        amount: number;
        currency: string;
      };
    };
  };
  attributes: Array<{
    attribute: {
      id: string;
      name: string;
    };
    values: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  descriptionJson?: string;
  seoTitle?: string;
  seoDescription?: string;
  isAvailableForPurchase: boolean;
  availableForPurchaseAt?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  collections: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: string;
    url: string;
    alt?: string;
  }>;
  thumbnail?: {
    url: string;
    alt?: string;
  };
  variants: ProductVariant[];
  pricing?: {
    priceRange?: {
      start?: {
        gross: {
          amount: number;
          currency: string;
        };
      };
      stop?: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
  };
  attributes: Array<{
    attribute: {
      id: string;
      name: string;
    };
    values: Array<{
      id: string;
      name: string;
    }>;
  }>;
  rating?: number;
  created: string;
  updatedAt: string;
}

export interface ProductsData {
  products: {
    edges: Array<{
      node: Product;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
    totalCount?: number;
  };
}

// GraphQL Queries
const GET_PRODUCTS = gql`
  query GetProducts(
    $first: Int
    $after: String
    $filter: ProductFilterInput
    $sortBy: ProductOrder
    $channel: String!
  ) {
    products(
      first: $first
      after: $after
      filter: $filter
      sortBy: $sortBy
      channel: $channel
    ) {
      edges {
        node {
          id
          name
          slug
          description
          isAvailableForPurchase
          category {
            id
            name
            slug
          }
          collections {
            id
            name
            slug
          }
          thumbnail {
            url
            alt
          }
          images {
            id
            url
            alt
          }
          variants {
            id
            name
            sku
            quantityAvailable
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
              stop {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          attributes {
            attribute {
              id
              name
            }
            values {
              id
              name
            }
          }
          created
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!, $channel: String!) {
    product(slug: $slug, channel: $channel) {
      id
      name
      slug
      description
      descriptionJson
      seoTitle
      seoDescription
      isAvailableForPurchase
      availableForPurchaseAt
      category {
        id
        name
        slug
      }
      collections {
        id
        name
        slug
      }
      thumbnail {
        url
        alt
      }
      images {
        id
        url
        alt
      }
      variants {
        id
        name
        sku
        quantityAvailable
        pricing {
          price {
            gross {
              amount
              currency
            }
          }
        }
        attributes {
          attribute {
            id
            name
          }
          values {
            id
            name
          }
        }
      }
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
          stop {
            gross {
              amount
              currency
            }
          }
        }
      }
      attributes {
        attribute {
          id
          name
        }
        values {
          id
          name
        }
      }
      created
      updatedAt
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories($first: Int, $filter: CategoryFilterInput) {
    categories(first: $first, filter: $filter) {
      edges {
        node {
          id
          name
          slug
          description
          descriptionJson
          parent {
            id
            name
            slug
          }
          children {
            totalCount
          }
          products {
            totalCount
          }
        }
      }
    }
  }
`;

const GET_COLLECTIONS = gql`
  query GetCollections($first: Int, $filter: CollectionFilterInput, $channel: String!) {
    collections(first: $first, filter: $filter, channel: $channel) {
      edges {
        node {
          id
          name
          slug
          description
          descriptionJson
          backgroundImage {
            url
            alt
          }
          products {
            totalCount
          }
        }
      }
    }
  }
`;

export interface UseProductsOptions {
  first?: number;
  after?: string;
  search?: string;
  categories?: string[];
  collections?: string[];
  priceRange?: {
    gte?: number;
    lte?: number;
  };
  sortBy?: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
  channel?: string;
}

export const useSaleorProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const {
    first = 20,
    after,
    search,
    categories,
    collections,
    priceRange,
    sortBy = { field: 'NAME', direction: 'ASC' },
    channel = 'default-channel',
  } = options;

  // Fetch products
  const fetchProducts = useCallback(async (loadMore: boolean = false) => {
    try {
      setLoading(true);
      if (!loadMore) {
        setError(null);
      }

      // Build filter
      const filter: any = {};
      
      if (search) {
        filter.search = search;
      }
      
      if (categories && categories.length > 0) {
        filter.categories = categories;
      }
      
      if (collections && collections.length > 0) {
        filter.collections = collections;
      }
      
      if (priceRange) {
        filter.price = {};
        if (priceRange.gte !== undefined) {
          filter.price.gte = priceRange.gte;
        }
        if (priceRange.lte !== undefined) {
          filter.price.lte = priceRange.lte;
        }
      }

      // Build sort
      const sortByInput = {
        field: sortBy.field,
        direction: sortBy.direction,
      };

      const { data } = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
          first,
          after: loadMore ? endCursor : after,
          filter: Object.keys(filter).length > 0 ? filter : undefined,
          sortBy: sortByInput,
          channel,
        },
        fetchPolicy: 'cache-and-network',
      });

      const newProducts = data.products.edges.map((edge: any) => edge.node);
      
      if (loadMore) {
        setProducts(prev => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
      }
      
      setHasNextPage(data.products.pageInfo.hasNextPage);
      setEndCursor(data.products.pageInfo.endCursor);
      setTotalCount(data.products.totalCount || 0);

    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError('فشل في جلب المنتجات');
    } finally {
      setLoading(false);
    }
  }, [first, after, search, categories, collections, priceRange, sortBy, channel, endCursor]);

  // Load more products
  const loadMore = useCallback(() => {
    if (hasNextPage && !loading) {
      fetchProducts(true);
    }
  }, [hasNextPage, loading, fetchProducts]);

  // Refresh products
  const refresh = useCallback(() => {
    setEndCursor(null);
    fetchProducts(false);
  }, [fetchProducts]);

  // Fetch products when options change
  useEffect(() => {
    setEndCursor(null);
    fetchProducts(false);
  }, [search, categories, collections, priceRange, sortBy, channel]);

  return {
    products,
    loading,
    error,
    hasNextPage,
    totalCount,
    loadMore,
    refresh,
  };
};

// Hook for single product
export const useSaleorProduct = (slug: string, channel: string = 'default-channel') => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const { data } = await apolloClient.query({
        query: GET_PRODUCT_BY_SLUG,
        variables: { slug, channel },
        fetchPolicy: 'cache-and-network',
      });

      setProduct(data.product);
    } catch (err: any) {
      console.error('Error fetching product:', err);
      setError('فشل في جلب المنتج');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [slug, channel]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};

// Hook for categories
export const useSaleorCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await apolloClient.query({
        query: GET_CATEGORIES,
        variables: { first: 100 },
        fetchPolicy: 'cache-and-network',
      });

      setCategories(data.categories.edges.map((edge: any) => edge.node));
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError('فشل في جلب الأصناف');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};

// Hook for collections
export const useSaleorCollections = (channel: string = 'default-channel') => {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await apolloClient.query({
        query: GET_COLLECTIONS,
        variables: { first: 100, channel },
        fetchPolicy: 'cache-and-network',
      });

      setCollections(data.collections.edges.map((edge: any) => edge.node));
    } catch (err: any) {
      console.error('Error fetching collections:', err);
      setError('فشل في جلب المجموعات');
    } finally {
      setLoading(false);
    }
  }, [channel]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return {
    collections,
    loading,
    error,
    refetch: fetchCollections,
  };
};

export default useSaleorProducts;