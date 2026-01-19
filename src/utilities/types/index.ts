export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail?: string;
  reviews?: Array<{
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
    date: string;
  }>;
};

export type ProductsSearchResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
