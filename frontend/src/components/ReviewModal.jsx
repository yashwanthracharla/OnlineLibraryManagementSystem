import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function ReviewModal({ book, show, onClose }) {
    const [reviews, setReviews] = useState([]);
    const [average, setAverage] = useState(0);

    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    const isAdmin = localStorage.getItem("is_staff") === "true";

    useEffect(() => {
        if (show && book) {
            loadReviews();
        }
    }, [show, book]);

    const loadReviews = () => {
        API.get(`reviews/book/${book.id}/`)
            .then((res) => {
                setReviews(res.data.reviews || []);
                setAverage(res.data.average_rating || 0);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Unable to load reviews.");
            });
    };

    const submitReview = () => {
        if (reviewText.trim() === "") {
            toast.warning("Please write a review.");
            return;
        }

        API.post(`reviews/book/${book.id}/`, {
            rating: rating,
            review: reviewText,
        })
            .then(() => {
                toast.success("Review submitted successfully.");

                setRating(5);
                setReviewText("");

                loadReviews();
            })
            .catch((err) => {
                toast.error(
                    err.response?.data?.message ||
                    "Unable to submit review."
                );
            });
    };

    if (!show || !book) return null;

    return (
        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4>{book.title}</h4>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">

                        <h5 className="mb-3">
                            ⭐ Average Rating: {average} / 5
                        </h5>

                        <hr />

                        <h5>Reviews</h5>

                        {reviews.length === 0 ? (

                            <p className="text-muted">
                                No reviews yet.
                            </p>

                        ) : (

                            reviews.map((review) => (

                                <div
                                    key={review.id}
                                    className="border rounded p-3 mb-3"
                                >

                                    <div className="d-flex justify-content-between">

                                        <strong>
                                            {review.username}
                                        </strong>

                                        <small className="text-muted">
                                            {new Date(
                                                review.created_at
                                            ).toLocaleDateString()}
                                        </small>

                                    </div>

                                    <div className="mt-2 mb-2">

                                        {[1, 2, 3, 4, 5].map((star) => (

                                            <span
                                                key={star}
                                                style={{
                                                    color:
                                                        star <= review.rating
                                                            ? "#ffc107"
                                                            : "#ddd",
                                                    fontSize: "20px",
                                                }}
                                            >
                                                ★
                                            </span>

                                        ))}

                                    </div>

                                    <p className="mb-0">
                                        {review.review}
                                    </p>

                                </div>

                            ))

                        )}

                        {!isAdmin && (
                            <>
                                <hr />

                                <h5>Add Your Review</h5>

                                <div className="mb-3">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <span
                                            key={star}
                                            onClick={() =>
                                                setRating(star)
                                            }
                                            style={{
                                                cursor: "pointer",
                                                fontSize: "35px",
                                                color:
                                                    star <= rating
                                                        ? "#ffc107"
                                                        : "#ccc",
                                            }}
                                        >
                                            ★
                                        </span>

                                    ))}

                                </div>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Write your review..."
                                    value={reviewText}
                                    onChange={(e) =>
                                        setReviewText(e.target.value)
                                    }
                                ></textarea>
                            </>
                        )}

                    </div>

                    <div className="modal-footer">

                        {!isAdmin && (
                            <button
                                className="btn btn-primary"
                                onClick={submitReview}
                            >
                                Submit Review
                            </button>
                        )}

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ReviewModal;