import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { toast } from "react-toastify";

function BookDetails() {

    const { id } = useParams();

    const [book, setBook] = useState(null);

    const [loading, setLoading] = useState(true);

    const isAdmin = localStorage.getItem("is_staff") === "true";

    const [reviews, setReviews] = useState([]);

    const [average, setAverage] = useState(0);

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");


    useEffect(() => {

        API.get(`books/${id}/`)
            .then((res) => {

                setBook(res.data);


            })

        API.get(`reviews/book/${id}/`)
             .then((res) => {

                setReviews(res.data.reviews);

                setAverage(res.data.average_rating);

                setLoading(false);

            })

            .catch(() => {

                toast.error("Unable to load book.");

                setLoading(false);

            });

    }, [id]);

    const borrowBook = () => {

        API.post(`books/${book.id}/borrow/`)

            .then((res) => {

                toast.success(res.data.message);

                setBook({
                    ...book,
                    available_copies: book.available_copies - 1,
                });

            })

            .catch((err) => {

                toast.error(err.response?.data?.message ||
                    "unable to borrow book"
                );

            });

        };

    const submitReview = () => {

    if (comment.trim() === "") {
        toast.error("Please write a review.");
        return;
    }

    API.post(`reviews/book/${book.id}/`, {
        rating,
        review: comment,
    })
        .then((res) => {

            toast.success("Review submitted successfully.");

            setComment("");
            setRating(5);

            // Reload Book Details
            API.get(`books/${book.id}/`).then((bookRes) => {
                setBook(bookRes.data);
            });

            // Reload Reviews
            API.get(`reviews/book/${book.id}/`).then((reviewRes) => {
                setReviews(reviewRes.data.reviews);
                setAverage(reviewRes.data.average_rating);
            });

        })
        .catch((err) => {

            toast.error(
                err.response?.data?.message ||
                "Unable to submit review."
            );

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

                <div className="container mt-5 text-center">

                    <h3>Book not found.</h3>

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
                       src={book.cover_image ? book.cover_image : "/no-book.png"}
                       alt={book.title}
                       className="img-fluid shadow rounded"
                       style={{
                        maxHeight: "550px",
                        objectFit: "cover",
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

                        {[1, 2, 3, 4, 5].map((star) => (

                            <span
                               key={star}
                               style={{
                                color:
                                star <= Math.round(average)
                                    ? "#ffc107"
                                    : "#ddd",
                                fontSize: "28px",
                               }}
                            >
                                ★

                            </span>

                            ))}

                            <span className="ms-3 fs-5 fw-bold">

                                {average.toFixed(1)}

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

                                <br />

                                {book.category}

                            </p>
                        </div>

                        <div className="col-md-6">

                            <p>

                                <strong>🏢 Publisher</strong>

                                <br />

                                {book.publisher}

                            </p>

                        </div>

                        <div className="col-md-6">

                            <p>

                                <strong>📅 Published</strong>

                                <br />

                                {book.published_date}

                            </p>

                        </div>

                    </div>

                    <hr />

                    <h5>Description</h5>

                    <p className="text-muted">

                        {book.description}

                    </p>

                    <hr />

                    <h5>Availability</h5>

                    {book.available_copies > 5 ? (

                        <span className="badge bg-success fs-6">

                            Available ({book.available_copies})

                        </span>

                    ) : book.available_copies > 0 ? (

                        <span className="badge bg-warning text-dark fs-6">

                            Only {book.available_copies} Left

                        </span>

                    ) : (

                        <span className="badge bg-danger fs-6">

                            Out of Stock

                        </span>

                    )}

                    <hr />

                    {!isAdmin && (

                        <button
                            className="btn btn-primary btn-lg mt-3"
                            disabled={book.available_copies === 0}
                            onClick={borrowBook}
                        >
                            {book.available_copies === 0
                            ? "Out of Stock"
                            : "📚 Borrow Book"}
                        </button>

                    )}

                    <hr />

                    <h3 className="mt-5">

                        ⭐ Reviews

                    </h3>

                    {reviews.length === 0 ? (

                        <p className="text-muted">
                            
                            No reviews yet.

                        </p>

                    ) : (

                        reviews.map((review) => (

                            <div
                               key={review.id}
                               className="card shadow-sm mb-3"
                            >

                                <div className="card-body">

                                    <h5>

                                        {review.username}

                                    </h5>

                                    <small className="text-muted">

                                        {new Date(
                                            review.created_at
                                            ).toLocaleDateString()}
                                    </small>

                                    <div className="mt-2">

                                        {[1,2,3,4,5].map((star)=>(

                                            <span
                                               key={star}
                                               style={{
                                                   color:
                                                      star <= review.rating
                                                      ? "#ffc107"
                                                      : "#ddd",
                                                   fontSize:"20px",
                                                }}
                                            >

                                                ★

                                            </span>
                                    ))}

                                    </div>

                                    <p className="mt-3">

                                        {review.review}

                                    </p>

                                </div>

                            </div>

                        ))

                    )}

                    <hr />
                    <h3>

                        Write a Review
 
                    </h3>

                    <div className="mb-3">

                        {[1,2,3,4,5].map((star)=>(

                        <span

                            key={star}

                            onClick={()=>setRating(star)}

                            style={{

                                cursor:"pointer",

                                color:
                                    star <= rating
                                        ? "#ffc107"
                                        : "#ddd",

                                    fontSize:"35px",

                            }}

                        >

                            ★

                        </span>

                    ))}

                    </div>

                    <textarea

                        className="form-control"

                        rows="4"

                        value={comment}

                        placeholder="Share your thoughts..."

                        onChange={(e)=>setComment(e.target.value)}

                    />

                    <button

                        className="btn btn-success mt-3"

                        onClick={submitReview}

                    >

                        Submit Review

                    </button>

                </div>

            </div>

        </div>

        <Footer />

        </>

    );

}

export default BookDetails;