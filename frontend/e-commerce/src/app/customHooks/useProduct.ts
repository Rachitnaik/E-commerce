import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from '../utils/interfaces';


const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://e-commerce-b2tt.onrender.com/products");
                setProducts(response.data.products);
            } catch (error) {
                setError("Error fetching products. Please try again.");
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useProducts;
