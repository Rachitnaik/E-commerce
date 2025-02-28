import { notFound } from "next/navigation";
import ProductDetails from "../../components/ProductListing/ProductDetails";

type Params = Promise<{ productId: string }>;

const ProductPage = async ({ params }: { params: Params }) => {
    const resolvedParams = await params; // Await the params
    const { productId } = resolvedParams;

    try {
        const response = await fetch(`https://e-commerce-b2tt.onrender.com/products/${productId}`, {
            cache: "no-store",
        });

        console.log("response", response);

        if (!response.ok) {
            console.log("not found");
            return notFound();
        }

        const data = await response.json();
        console.log("response data", data);

        if (!data?.product) return notFound(); // Ensure product exists

        return <ProductDetails product={data.product} averageRating={data.averageRating} reviewCount={data.reviewCount} />;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return notFound();
    }
};

export default ProductPage;
