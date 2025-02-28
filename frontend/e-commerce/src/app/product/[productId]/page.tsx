import { notFound } from "next/navigation";
import ProductDetails from "../../components/ProductListing/ProductDetails";



interface Props {
    params: { productId: string };
}
const ProductPage = async ({ params }: Props) => {
    const { productId } = params;

    try {
        const response = await fetch(`https://e-commerce-b2tt.onrender.com/products/${productId}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            console.log("not found")
            return notFound();
        }

        const data = await response.json();

        if (!data?.product) return notFound(); // Ensure product exists

        return <ProductDetails product={data.product} />;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return notFound();
    }
};

export default ProductPage;
