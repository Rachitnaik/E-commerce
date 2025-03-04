import { notFound } from "next/navigation";
import ProductDetails from "../../components/ProductListing/ProductDetails";

type Params = Promise<{ productId: string }>;

const ProductPage = async ({ params }: { params: Params }) => {
    const { productId } = await params;
    console.log("productId", productId)

    try {
        const url = `https://e-commerce-b2tt.onrender.com/products/${productId}`;
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            console.log("not found");
            return notFound();
        }

        const data = await response.json();
        console.log("response data", data);

        if (!data?.product) return notFound();

        return <ProductDetails product={data.product} averageRating={data.averageRating} reviewCount={data.reviewCount} />;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return notFound();
    }
};

export default ProductPage;
