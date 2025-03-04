import ProductReviewSkeleton from "../skeletons/ProductReviewSkeleton";
import CustomerFeedbackSkeleton from "../skeletons/customerFeedbackSkeleton";

export default function Loading() {
    return (
        <>
            <CustomerFeedbackSkeleton />
            <ProductReviewSkeleton />
        </>
    );
}
