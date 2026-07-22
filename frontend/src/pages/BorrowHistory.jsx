import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function BorrowHistory() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            setLoading(true);

            const res = await API.get("borrow/history/");

            setRecords(res.data.results || res.data);

        } catch (err) {

            console.log(err);

            toast.error("Unable to load borrow history.");

        } finally {

            setLoading(false);

        }

    };

    const returnBook = async (bookId) => {

        if (!window.confirm("Return this book?")) return;

        try {

            const res = await API.post(`books/${bookId}/return/`);

            toast.success(res.data.message);

            if (res.data.fine > 0) {

                toast.info(`Fine Paid : ₹${res.data.fine}`);

            }

            loadHistory();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to return book."
            );

        }

    };

    const openReviewModal = (record) => {

        setSelectedBook(record.book);

        setRating(5);

        setComment("");

        setShowReviewModal(true);

    };

    const submitReview = async () => {

        try {

            await API.post(`reviews/book/${selectedBook}/add/`, {

                rating,

                review: comment,

            });

            toast.success("Review submitted successfully.");

            setShowReviewModal(false);

            loadHistory();

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to submit review."

            );

        }

    };

    const filteredRecords = records.filter((record) =>
        record.book_title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalBooks = records.length;
    const borrowedBooks = records.filter(r => r.status === "Borrowed").length;
    const returnedBooks = records.filter(r => r.status === "Returned").length;
    const overdueBooks = records.filter(r => r.status === "Overdue").length;

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="text-center mt-5">

                    <div className="spinner-border text-primary"></div>

                    <h5 className="mt-3">

                        Loading Borrow History...

                    </h5>

                </div>

                <Footer />

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">
                            📚 Borrow History
                        </h2>

                        <small className="text-muted">
                            {totalBooks} Books
                        </small>

                    </div>

                </div>

                {/* Statistics */}

                <div className="row mb-4">

                    <div className="col-md-3">

                        <div className="card shadow border-0 text-center">

                            <div className="card-body">

                                <h2>{totalBooks}</h2>

                                <p>Total</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 text-center">

                            <div className="card-body">

                                <h2>{borrowedBooks}</h2>

                                <p>Borrowed</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 text-center">

                            <div className="card-body">

                                <h2>{returnedBooks}</h2>

                                <p>Returned</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 text-center">

                            <div className="card-body">

                                <h2>{overdueBooks}</h2>

                                <p>Overdue</p>

                            </div>

                        </div>

                    </div>

                </div>

                <input
                    className="form-control mb-4"
                    placeholder="Search borrowed books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="row">
                                        {filteredRecords.length === 0 ? (

                        <div className="text-center mt-5">

                            <h1>📚</h1>

                            <h4>No Borrow History Found</h4>

                            <p className="text-muted">

                                Borrow a book to see your history here.

                            </p>

                        </div>

                    ) : (

                        filteredRecords.map((record) => (

                            <div
                                key={record.id}
                                className="col-lg-6 mb-4"
                            >

                                <div
                                    className="card shadow-lg border-0 h-100"
                                    style={{
                                        borderRadius: "18px",
                                        overflow: "hidden",
                                        transition: ".3s",
                                    }}
                                    onMouseEnter={(e) =>
                                        e.currentTarget.style.transform =
                                            "translateY(-6px)"
                                    }
                                    onMouseLeave={(e) =>
                                        e.currentTarget.style.transform =
                                            "translateY(0)"
                                    }
                                >

                                    <div className="row g-0">

                                        <div className="col-4">

                                            <img
                                                src={
                                                    record.cover_image ||
                                                    "/no-book.png"
                                                }
                                                alt={record.book_title}
                                                className="img-fluid h-100"
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/no-book.png";
                                                }}
                                            />

                                        </div>

                                        <div className="col-8">

                                            <div className="card-body d-flex flex-column h-100">

                                                <h4 className="fw-bold">

                                                    {record.book_title}

                                                </h4>

                                                <hr />

                                                <p className="mb-2">

                                                    <strong>📅 Borrowed</strong>

                                                    <br />

                                                    {record.borrow_date}

                                                </p>

                                                <p className="mb-2">

                                                    <strong>⏰ Due Date</strong>

                                                    <br />

                                                    {record.due_date}

                                                </p>

                                                <p className="mb-3">

                                                    <strong>✅ Returned</strong>

                                                    <br />

                                                    {record.return_date || "-"}

                                                </p>

                                                <div className="mb-3">
                                                                                                        {record.status === "Borrowed" && (

                                                        <span className="badge bg-primary mb-3">

                                                            📖 Borrowed

                                                        </span>

                                                    )}

                                                    {record.status === "Returned" && (

                                                        <span className="badge bg-success mb-3">

                                                            ✅ Returned

                                                        </span>

                                                    )}

                                                    {record.status === "Overdue" && (

                                                        <span className="badge bg-danger mb-3">

                                                            ⚠ Overdue

                                                        </span>

                                                    )}

                                                </div>

                                                <div className="mb-3">

                                                    <strong>Current Fine</strong>

                                                    <h5 className="text-warning fw-bold mt-2">

                                                        ₹{record.current_fine}

                                                    </h5>

                                                </div>

                                                <div className="mt-auto">

                                                    {record.status !== "Returned" && (

                                                        <button
                                                            className="btn btn-success w-100 mb-2"
                                                            onClick={() =>
                                                                returnBook(record.book)
                                                            }
                                                        >

                                                            📚 Return Book

                                                        </button>

                                                    )}

                                                    {record.status === "Returned" && (

                                                        <button
                                                            className="btn btn-warning w-100"
                                                            onClick={() =>
                                                                openReviewModal(record)
                                                            }
                                                        >

                                                            ⭐ Rate & Review

                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

            {/* Review Modal */}

            {showReviewModal && (

                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0,0,0,.6)",
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div
                            className="modal-content border-0 shadow-lg"
                            style={{
                                borderRadius: "15px",
                            }}
                        >
                                                        <div className="modal-header bg-primary text-white">

                                <h5 className="modal-title">

                                    ⭐ Rate & Review Book

                                </h5>

                                <button
                                    className="btn-close btn-close-white"
                                    onClick={() =>
                                        setShowReviewModal(false)
                                    }
                                ></button>

                            </div>

                            <div className="modal-body">

                                <label className="form-label fw-bold">

                                    Rating

                                </label>

                                <select
                                    className="form-select mb-3"
                                    value={rating}
                                    onChange={(e) =>
                                        setRating(Number(e.target.value))
                                    }
                                >

                                    <option value={5}>
                                        ★★★★★ Excellent
                                    </option>

                                    <option value={4}>
                                        ★★★★☆ Very Good
                                    </option>

                                    <option value={3}>
                                        ★★★☆☆ Good
                                    </option>

                                    <option value={2}>
                                        ★★☆☆☆ Fair
                                    </option>

                                    <option value={1}>
                                        ★☆☆☆☆ Poor
                                    </option>

                                </select>

                                <label className="form-label fw-bold">

                                    Review

                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    placeholder="Write your review..."
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value)
                                    }
                                ></textarea>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowReviewModal(false)
                                    }
                                >

                                    Cancel

                                </button>

                                <button
                                    className="btn btn-success"
                                    onClick={submitReview}
                                >

                                    Submit Review

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            <Footer />

        </>

    );

}

export default BorrowHistory;
                                            