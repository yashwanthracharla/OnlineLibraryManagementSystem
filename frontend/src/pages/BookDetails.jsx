import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { toast } from "react-toastify";

function BookDetails() {

    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [average, setAverage] = useState(0);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const isAdmin = localStorage.getItem("is_staff") === "true";

    const loadBook = async () => {

        const res = await API.get(`books/${id}/`);

        setBook(res.data);

    };

    const loadReviews = async () => {

        const res = await API.get(`reviews/book/${id}/`);

        setReviews(res.data.reviews);

        setAverage(res.data.average_rating);

    };

    useEffect(() => {

        const fetchData = async () => {

            try {

                await Promise.all([
                    loadBook(),
                    loadReviews(),
                ]);

            } catch {

                toast.error("Unable to load book details.");

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, [id]);

    const borrowBook = () => {

        API.post(`books/${book.id}/borrow/`)
            .then((res) => {

                toast.success(res.data.message);

                loadBook();

            })

            .catch((err) => {

                toast.error(

                    err.response?.data?.message ||

                    "Unable to borrow book."

                );

            });

    };

    const submitReview = () => {

        if (!comment.trim()) {

            toast.error("Please write a review.");

            return;

        }

        setSubmitting(true);

        API.post(`reviews/book/${book.id}/`, {

            rating,

            comment,

        })

            .then((res) => {

                toast.success("Review submitted successfully.");

                setComment("");

                setRating(5);

                loadBook();

                loadReviews();

            })

            .catch((err) => {

                toast.error(

                    err.response?.data?.message ||

                    "Unable to submit review."

                );

            })

            .finally(() => {

                setSubmitting(false);

            });

    };

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="container text-center mt-5">

                    <div className="spinner-border text-primary"></div>

                    <h5 className="mt-3">

                        Loading Book...

                    </h5>

                </div>

            </>

        );

    }

    if (!book) {

        return (

            <>

                <Navbar />

                <div className="container text-center mt-5">

                    <h3>

                        Book not found.

                    </h3>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="row">

                    {/* Book Cover */}

                   <div className="col-lg-4 text-center">

                        <img
                            src={
                                book.cover_image
                                ? book.cover_image
                                : "/no-book.png"
                            }
                            alt={book.title}
                            className="img-fluid shadow rounded"
                            style={{
                                maxHeight: "550px",
                                objectFit: "cover",
                                borderRadius: "18px",
                            }}
                            onError={(e) => {
                                e.target.src = "/no-book.png";
                            }}
                        />

                    </div>

                    {/* Book Details */} 

                    <div className="col-lg-8">

                        <h2 className="fw-bold">

                        {book.title}

                        </h2>

                    {/* Rating */}

                    <div className="mb-3">

                       {[1,2,3,4,5].map((star)=>(

                        <span
                            key={star}
                            style={{
                                    color:
                                        star <= Math.round(Number(average))
                                        ? "#ffc107"
                                        : "#ddd",
                                        fontSize:"28px",
                            }}
                        >

                            ★

                        </span>

                     ))} 

                    <span className="ms-3 fw-bold fs-5">

                        {Number(average).toFixed(1)}

                    </span>

                    <span className="text-muted ms-2">

                        ({reviews.length} Reviews)

                    </span>

                </div>

                <hr />

                <div className="row">

                    <div className="col-md-6">

                        <p>

                            <strong>👤 Author</strong>

                            <br/>

                            {book.author}

                        </p>

                    </div>

                    <div className="col-md-6">

                        <p>

                        <strong>📂 Category</strong>

                        <br/>

                        {book.category}

                        </p>

                    </div>

                    <div className="col-md-6">

                        <p>

                        <strong>🏢 Publisher</strong>

                        <br/>

                           {book.publisher}

                        </p>

                    </div>

                    <div className="col-md-6">

                        <p>

                        <strong>📅 Published</strong>

                        <br/>

                           {book.published_date}

                        </p>

                    </div>

                </div>

                <hr />

                <h5>

                    Description

                </h5>

                   <p className="text-muted">

                    {book.description}

                    </p>

                <hr />

                <h5>

                    Availability

                </h5>

                {

                    book.available_copies > 5 ?

                    (

                        <span className="badge bg-success fs-6">

                            Available ({book.available_copies})

                        </span>

                    )

                    :

                    book.available_copies > 0 ?

                    (

                        <span className="badge bg-warning text-dark fs-6">

                            Only {book.available_copies} Left

                        </span>

                    )

                    :

                    (

                        <span className="badge bg-danger fs-6">

                            Out of Stock

                        </span>

                    )

                }

                {!isAdmin && (

                    <div className="mt-4">

                        <button

                            className="btn btn-primary btn-lg"

                            disabled={book.available_copies===0}

                            onClick={borrowBook}

                        >

                            {

                                book.available_copies===0

                                ?

                                "Out of Stock"

                                :

                                "📚 Borrow Book"

                            }

                        </button>

                    </div>

                )}

                <hr/>

                <h3 className="mt-5">

                    ⭐ Reviews

                </h3>

                {reviews.length === 0 ? (

    <div className="text-center py-4">

        <h5 className="text-muted">
            No reviews yet.

        </h5>

        <p className="text-secondary">

            Be the first person to review this book.

        </p>

    </div>

) : (

    reviews.map((review) => (

        <div
            key={review.id}
            className="card shadow-sm border-0 mb-4"
            style={{
                borderRadius: "15px",
                transition: "0.3s",
            }}
        >

            <div className="card-body">

                <div className="d-flex align-items-center">

                    <img
                        src={
                            review.avatar ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="avatar"
                        className="rounded-circle me-3"
                        style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            border: "2px solid #0d6efd",
                        }}
                        onError={(e) => {
                            e.target.src =
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        }}
                    />

                    <div>

                        <h5 className="mb-1">

                            {review.username}

                        </h5>

                        <small className="text-muted">

                            {review.review_date}

                        </small>

                    </div>

                </div>

                <div className="mt-3">

                    {[1, 2, 3, 4, 5].map((star) => (

                        <span
                            key={star}
                            style={{
                                color:
                                    star <= review.rating
                                        ? "#ffc107"
                                        : "#ddd",
                                fontSize: "22px",
                            }}
                        >

                            ★

                        </span>

                    ))}

                </div>

                <p
                    className="mt-3 mb-0"
                    style={{
                        lineHeight: "1.8",
                    }}
                >

                    {review.comment}

                </p>

            </div>

        </div>

    ))

)}

{!isAdmin && (

    <>

        <hr />

        <h3>

            Write a Review

        </h3>

        <div className="mb-3">

            {[1, 2, 3, 4, 5].map((star) => (

                <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                        cursor: "pointer",
                        color:
                            star <= rating
                                ? "#ffc107"
                                : "#ddd",
                        fontSize: "35px",
                    }}
                >

                    ★

                </span>

            ))}

        </div>

        <textarea
            className="form-control"
            rows="4"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        />

        <button
            className="btn btn-success mt-3"
            onClick={submitReview}
            disabled={submitting}
        >

            {submitting
                ? "Submitting..."
                : "Submit Review"}

        </button>

    </>

)}

            </div>

        </div>

    </div>

    <Footer />

</>

);

}

export default BookDetails;