import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function BorrowHistory() {

    const [records, setRecords] = useState([]);

    const [showReviewModal, setShowReviewModal] = useState(false);

    const [selectedBook, setSelectedBook] = useState(null);

    const [rating, setRating] = useState(5); 

    const [comment, setComment] = useState("");

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {

        API.get("borrow/history/")
            .then((res) => {
                setRecords(res.data.results || res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    const returnBook = (bookId) => {

        API.post(`books/${bookId}/return/`)
            .then((res) => {

                toast.success(res.data.message);

                if (res.data.fine > 0) {
                    toast.info(`Fine Paid : ₹${res.data.fine}`);
                }

                loadHistory();

            })
            .catch((err) => {

                toast.error(
                    err.response?.data?.message ||
                    "Unable to return book."
                );

            });

    };

    const openReviewModal = (record) => {
        setSelectedBook(record.book);

        setRating(5);

        setComment("");

        setShowReviewModal(true);

    };

    const submitReview = () => {

        API.post(`reviews/book/${selectedBook}/add/`, {
            rating : rating,
            review : comment,
        })
            .then(() => {

                toast.success("Review submitted successfully.");

                setShowReviewModal(false);

            })

            .catch((err) => {

                console.log(err.response?.data);

                toast.error(err.response?.data?.message || "Unable to submit review.");

            });

    };

    return (
        <>
            <Navbar />

            

            <div className="container mt-4">

                <h2 className="mb-4">
                    Borrow History
                </h2>

                <div className="row">

                    {records.length === 0 ? (

                        <div className="text-center mt-5">

                            <h4>No Borrow History</h4>

                        </div>

                    ) : (

                        records.map((record) => (

                            <div
                                key={record.id}
                                className="col-lg-6 mb-4"
                            >

                                <div className="card shadow h-100">

                                    <div className="row g-0">

                                        <div className="col-4">

                                            <img
                                                src={
                                                    record.cover_image ||
                                                    "/no-book.png"
                                                }
                                                alt={record.book_title}
                                                className="img-fluid rounded-start"
                                                style={{
                                                    height: "250px",
                                                    objectFit: "cover",
                                                }}
                                            />

                                        </div>

                                        <div className="col-8">

                                            <div className="card-body">

                                                <h4>
                                                    {record.book_title}
                                                </h4>

                                                <hr />

                                                <p>

                                                    <strong>
                                                        Borrowed:
                                                    </strong>{" "}
                                                    {record.borrow_date}

                                                </p>

                                                <p>

                                                    <strong>
                                                        Due:
                                                    </strong>{" "}
                                                    {record.due_date}

                                                </p>

                                                <p>

                                                    <strong>
                                                        Returned:
                                                    </strong>{" "}

                                                    {record.return_date || "-"}

                                                </p>

                                                <p>

                                                    <strong>Status:</strong>{" "}

                                                    {record.status ===
                                                    "Borrowed" ? (

                                                        <span className="badge bg-primary">

                                                            Borrowed

                                                        </span>

                                                    ) : record.status ===
                                                      "Returned" ? (

                                                        <span className="badge bg-success">

                                                            Returned

                                                        </span>

                                                        

                                                    ) : (

                                                        <span className="badge bg-danger">

                                                            Overdue

                                                        </span>

                                                    )}

                                                </p>

                                                <p>

                                                    <strong>Fine:</strong>{" "}

                                                    <span className="badge bg-warning text-dark">

                                                        ₹{record.current_fine}

                                                    </span>

                                                </p>

                                                {record.status !==
                                                    "Returned" && (

                                                    <button
                                                        className="btn btn-success w-100"
                                                        onClick={() =>
                                                            returnBook(
                                                                record.book
                                                            )
                                                        }
                                                    >
                                                        Return Book
                                                    </button>

                                                    )}  

                                                {record.status === "Returned" && (

                                                    <button 
                                                            className="btn btn-warning w-100 mt-2"
                                                            onClick={() => openReviewModal(record)}
                                                    >
                                                       ⭐ Rate & Review

                                                    </button>

                                                )}

                                                

                                            

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>
            {showReviewModal && (

                <div className="modal fade show"
                    style = {{
                        display: "block",
                        background: "rgba(0,0,0,.5)",
                    }}
                >
                    <div className="modal-dialog">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5>Rate this Book</h5>

                                <button
                                      className="btn-close"
                                      onClick={() => setShowReviewModal(false)}
                                ></button>

                            </div>

                            <div className="modal-body">

                                <label className="form-label">

                                    Rating
                               </label>

                               <select
                                    className="form-select mb-3"
                                    value={rating}
                                    onChange={(e)=>setRating(Number(e.target.value))}
                                >
                                    <option value={5}>★★★★★</option>

                                    <option value={4}>★★★★☆</option>

                                    <option value={3}>★★★☆☆</option>

                                    <option value={2}>★★☆☆☆</option>

                                    <option value={1}>★★☆☆☆</option>

                                </select>

                                <label className="form-label">

                                    Review

                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    value={comment}
                                    onChange={(e)=>setComment(e.target.value)}
                                    placeholder="Write your review..."
                                ></textarea>
                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={()=>setShowReviewModal(false)}
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