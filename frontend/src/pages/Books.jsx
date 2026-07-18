import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../components/Footer";


function Books() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    const navigate = useNavigate();

    const isAdmin = localStorage.getItem("is_staff") === "true";

    const [loading, setLoading] = useState(true);



    useEffect(() => {
        loadBooks();
    }, [search, category, page]);

    const loadBooks = () => {

        setLoading(true);

        API.get(
            `books/?page=${page}&search=${search}&category=${category}`
        )
            .then((response) => {

                setBooks(response.data.results || []);
                setNext(response.data.next);
                setPrevious(response.data.previous);
                setLoading(false);

            })
            .catch((error) => {

                console.log(error);

            });

    };

    const borrowBook = (id) => {

        API.post(`books/${id}/borrow/`)
            .then((response) => {

                toast.success(response.data.message);
                loadBooks();

            })
            .catch((error) => {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to borrow book."
                );

            });

    };

    const deleteBook = (id) => {

        if (!window.confirm("Are you sure you want to delete this book?")) {
            return;
        }

        API.delete(`books/${id}/`)
            .then(() => {

                toast.success("Book deleted successfully");

                loadBooks();

            })
            .catch(() => {

                toast.error("Unable to delete book");

            });

    };

    if (loading) {
    return (
        <>
            <Navbar />

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

                <h5 className="mt-3">

                    Loading books...

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

                    <h2>Books</h2>

                    {isAdmin && (

                        <button
                            className="btn btn-success"
                            onClick={() => navigate("/admin/books/add")}
                        >
                            + Add Book
                        </button>

                    )}

                </div>

                {/* Search & Filter */}

                <div className="row mb-4">

                    <div className="col-md-6">

                        <div className="input-group shadow-sm">

                           <span className="input-group-text bg-white">

                                🔍

                           </span>

                           <input
                              type="text"
                              className="form-control border-start-0"
                              placeholder="Search books by title, author..."
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                              }}

                            />

                        </div>

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setPage(1);
                            }}
                        >

                            <option value="">📚 All Categories</option>
                            <option value="Programming">💻 Programming</option>
                            <option value="AI">🤖 AI</option>
                            <option value="Database">🗄 Database</option>

                        </select>

                    </div>

                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">

                            📚 Books

                        </h2>

                            <small className="text-muted">

                                {books.length} books found

                            </small>

                    </div>

                ...
            </div>

                {/* Books */}

                <div className="row">

                    {books.length === 0 ? (

                        <div className="text-center mt-5">

                            <h1>📚</h1>

                            <h4>No Books Found</h4>

                            <p className="text-muted">
                                Try another search or category.
                            </p>

                        </div>

                    ) : (

                        books.map((book) => (

                            <div
                                className="col-md-4 mb-4"
                                key={book.id}
                            >

                                <div className="card shadow h-100 border-0"
                                     style={{
                                        transition: "0.3s",
                                        borderRadius: "15px",
                                        overflow: "hidden",
                                     }}
                                     onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-8px)";
                                     }}
                                     onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                     }}
                                        
                                >
                                    <div
                                        style={{
                                        position: "absolute",
                                        top: "15px",
                                        left: "15px",
                                        zIndex: 2,
                                        }}
                                    >
                                       {book.average_rating >= 4.5 && (
                                            <span className="badge bg-warning text-dark px-3 py-2">
                                                ⭐ Bestseller
                                            </span>
                                        )}
                                    </div>
                                    <div
                                       className="card shadow-lg h-100 border-0"
                                       style={{
                                       position: "relative",
                                       borderRadius: "18px",
                                       overflow: "hidden",
                                       transition: ".3s",
                                       }}
                                    ></div>

                                    <img
                                        src={book.cover_image || "/no-book.png"}
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{
                                            height: "380px",
                                            objectFit: "cover",
                                            borderBottom: "1px solid #eee",
                                        }}
                                        onError={(e) => {
                                            e.target.src = "/no-book.png";
                                        }}

                                        onClick={() => navigate(`/books/${book.id}`)}
                                    />

                                    <div className="card-body">

                                        <h4 className="fw-bold"
                                            style={{
                                                cursor: "pointer",
                                                minHeight: "60px",
                                                
                                            }}
                                            onClick={() => navigate(`/books/${book.id}`)}
                                        >
                                            {book.title}
                                        </h4>

                                        <div className="mb-3">

                                            <div className="d-flex align-items-center">

                                                {[1, 2, 3, 4, 5].map((star) => (

                                                    <span
                                                       key={star}
                                                       style={{
                                                        color:
                                                           star <= Math.round(book.average_rating)
                                                           ? "#ffc107"
                                                           : "#ddd",
                                                        fontSize: "20px",

                                                       }}
                                                    >

                                                        ★
                                                    </span>
                                                ))}

                                                <span className="ms-2 fw-bold">
                                                    {book.average_rating}

                                                </span>

                                            </div>

                                            {book.review_count === 0 ? (
                                                <small className="text-muted">

                                                    No reviews yet

                                                </small>
                                            
                                            ) : (

                                                <small className="text-muted">

                                                    ({book.review_count} Reviews)

                                                </small>
                                            )}

                                        </div>

                                        <p>
                                            <strong> 👤 Author:</strong> <span className="badge bg-dark">{book.author}</span>
                                        </p>

                                        <p>
                                            <strong>📂 Category:</strong> <span className="badge bg-dark">
                                                {book.category} </span>
                                        </p>

                                        <p>
                                            <strong> 🏢 Publisher:</strong> <span className="badge bg-dark">{book.publisher}</span>
                                        </p>

                                        <p className="mt-3">

                                        
                                            {book.available_copies > 5 ? (

                                                <span className="badge bg-success">
                                                    
                                                    Available ({book.available_copies})
                                                    
                                                </span>

                                            ) : book.available_copies > 0 ? (

                                                <span className="badge bg-warning text-dark">

                                                    Only {book.available_copies} Left
                                                </span>

                                            ) : (

                                                <span className="badge bg-danger">
                                                    Out of Stock
                                                </span>

                                            )}
                                            
                                        </p>

                                            

                                        {!isAdmin ? (

                                              <div className="d-grid gap-2">

                                                <button
                                                    className="btn btn-primary "
                                                    disabled={book.available_copies === 0}
                                                    onClick={() => borrowBook(book.id)}
                                                >

                                                    📚 Borrow Book

                                                </button>

                                                <button
                                                    className="btn btn-outline-dark"

                                                    onClick={() => navigate(`/books/${book.id}`)}

                                                >

                                                    ℹ View Details

                                                </button>

                                            </div>

                                        ) : (

                                            <div className="d-grid gap-2">

                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() =>
                                                        navigate(`/admin/books/edit/${book.id}`)
                                                    }
                                                >
                                                    ✏ Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteBook(book.id)}
                                                >
                                                    🗑 Delete
                                                </button>

                                                <button
                                                    className="btn btn-outline-dark"

                                                    onClick={() => navigate(`/books/${book.id}`)}

                                                >

                                                    👁 View Details

                                                </button>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* Pagination */}

                <div className="d-flex justify-content-center align-items-center mt-5">

                    <button
                        className="btn btn-outline-primary rounded-pill"
                        disabled={!previous}
                    >
                        ◀ Previous
                    </button>

                    <span className="mx-4 fw-bold">

                         Page {page}

                    </span>

                    <button
                       className="btn btn-outline-primary rounded-pill"
                       disabled={!next}
                    >
                        Next ▶
                    </button>

                </div>

            </div>


            <Footer />

        </>

    );
}

export default Books;