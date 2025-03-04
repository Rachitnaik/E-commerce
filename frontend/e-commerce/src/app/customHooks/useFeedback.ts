import { useEffect, useState } from "react";

interface CustomerFeedback {
    feedback_id: string;
    feedback_text: string;
    rating: number;
    feedback_date: string;
    user: {
        firstname: string;
        lastname: string;
    };
}

const useFeedback = () => {
    const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch("https://e-commerce-b2tt.onrender.com/feedback");
                if (!response.ok) throw new Error("Failed to fetch feedback");

                const data = await response.json();
                if (data.feedback && Array.isArray(data.feedback)) {
                    setFeedbacks(data.feedback);
                }
            } catch (err) {
                setError("Error loading Feedbacks. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    return { feedbacks, loading, error };
};

export default useFeedback;
