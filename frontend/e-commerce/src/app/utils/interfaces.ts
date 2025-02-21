export interface Feature {
    _key: string;
    size: string;
    color: string;
    image: string;
    isDefault: boolean;
  }
  export interface Product {
    product_id: number;
    product_name: string;
    image: string;
    price: number;
    averageRating: number;
    features: Feature[];
    date: string;
  }
  