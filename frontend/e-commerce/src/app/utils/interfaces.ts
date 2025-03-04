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


  export type ProductFeature = {
    _key: string;
    color: string;
    size: string;
    image: string;
    isDefault?: boolean;
};

export type Productdetails = {
    product_name: string;
    reviews: []
    price: number;
    // originalPrice?: number;
    // discountPercentage?: number;
    description: string;
    features?: ProductFeature[];
};


export interface ProductReview {
  review_id: string;
  review_text: string;
  review_date: Date;
  rating: number;
  user: {
      firstname: string;
      lastname: string;
  };
}

  export const fetchProduct = async (id: string) => {
    try {
        const response = await fetch(`https://e-commerce-b2tt.onrender.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        return response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};
