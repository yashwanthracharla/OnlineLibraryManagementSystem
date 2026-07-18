import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";

import {
    FaBook,
    FaBookOpen,
    FaStar,
    FaMoneyBillWave,
    FaHistory,
    FaUser,
} from "react-icons/fa";

function UserDashboard({ stats }) {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    return (

        <div className="container mt-4">

            {/*welcome*/}

            <div className="mb-5">

                <h2 className="fw-bold">

                    Welcome back,

                    <span className="text-primary">

                    {" "}
                    {username}

                    </span>

                      👋

                </h2>

                    <p className="text-muted">

                        Continue your reading journey.

                    </p>

            </div>

            {/* Statistics */}

            <div className="row g-4">

                <div className="col-md-3">
                    <StatCard
                        title="Total Borrowed"
                        value={stats.my_books}
                        icon={<FaBook />}
                        color="linear-gradient(135deg,#2563EB,#1D4ED8)"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Currently Borrowed"
                        value={stats.currently_borrowed}
                        icon={<FaBookOpen />}
                        color="linear-gradient(135deg,#16A34A,#22C55E)"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Reviews Given"
                        value={stats.my_reviews}
                        icon={<FaStar />}
                        color="linear-gradient(135deg,#F59E0B,#FBBF24)"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Outstanding Fine"
                        value={`₹${stats.my_fine}`}
                        icon={<FaMoneyBillWave />}
                        color="linear-gradient(135deg,#DC2626,#EF4444)"
                    />
                </div>

            </div>

            {/* Current Books */}

            <div className="card shadow-mt-5">

                <div className="card-header">

                    <h4 className="fw-bold mb-0">

                        📚 Currently Borrowed Books

                    </h4>

                </div>

                <div className="card-body">

                    {stats.current_books.length === 0 ? (

                        <div className="text-center py-5">

                            <h1>📚</h1>

                            <h5>No Borrowed Books</h5>

                            <p className="text-muted">

                                Visit the Books page to borrow your first book.

                            </p>

                        </div>

                    ) : (

                        <div className="row">

                            {stats.current_books.map((book) => (

                                <div
                                    key={book.id}
                                    className="col-md-4 mb-4"
                                >

                                    <div className="card h-100 shadow-lg border-0"
                                         style={{
                                            transition: ".3s"
                                         }}
                                         onMouseEnter={(e) =>
                                            e.currentTarget.style.transform = "translateY(-6px)"
                                         }
                                         onMouseLeave={(e) =>
                                            e.currentTarget.style.transform = "translateY(0)"
                                         }
                                    >

                                        <img
                                            src={
                                                book.cover_image
                                                ? `http://127.0.0.1:8000${book.cover_image}`
                                                : "/no-book.png"
                                            }
                                            alt={book.title}
                                            className="card-img-top"
                                            style={{
                                                height: "280px",
                                                objectFit: "cover",
                                            }}
                                            onError={(e) => {
                                                e.target.src = "/no-book.png";
                                            }}
                                        />

                                        <div className="card-body">

                                            <h5>

                                                {book.title}

                                            </h5>

                                            <hr />

                                            <p>

                                                <strong>

                                                    Borrowed:

                                                </strong>

                                                <br />

                                                {book.borrow_date}

                                            </p>

                                            <p>

                                                <strong>

                                                    Due Date:

                                                </strong>

                                                <br />

                                                {book.due_date}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

            {/* Recent Reviews */}

            <div className="card shadow-ig border-0">

                <div className="card-header">

                    <h4 className="fw-bold mb-0">

                        ⭐ My Recent Reviews

                    </h4>

                </div>

                <div className="card-body">

                    {stats.recent_reviews.length === 0 ? (

                        <p className="text-muted">

                            No reviews submitted yet.

                        </p>

                    ) : (

                        stats.recent_reviews.map((review, index) => (

                            <div
                                key={index}
                                className="card shadow-sm border-0 mb-3"
                            >
                                <div className="card-body">

                                <h5>

                                    {review.book}

                                </h5>

                                <p>

                                    {"⭐".repeat(review.rating)}

                                </p>

                                <p>

                                    {review.review}

                                </p>

                                <small className="text-muted">

                                    {new Date(
                                        review.created_at
                                    ).toLocaleDateString()}

                                </small>
                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

            {/* Quick Actions */}

            <div className="card shadow-ig border-0">

                <div className="card-header bg-dark text-white">

                    <h4 className="fw-bold mb-0">

                        ⚡ Quick Actions

                    </h4>

                </div>

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-md-4">

                            <button
                                className="btn btn-primary w-100 p-3 d-flex flex-column align-items-center"
                                onClick={() => navigate("/books")}
                            >

                                <FaBook size={28} className="mb-2" />

                                <br />

                                Browse Books

                            </button>

                        </div>

                        <div className="col-md-4">

                            <button
                                className="btn btn-primary w-100 p-3 d-flex flex-column align-items-center"
                                onClick={() =>
                                    navigate("/history")
                                }
                            >

                                <FaBook size={28} className="mb-2" />

                                <br />

                                Borrow History

                            </button>

                        </div>

                        <div className="col-md-4">

                            <button
                                className="btn btn-primary w-100 p-3 d-flex flex-column align-items-center"
                                onClick={() =>
                                    navigate("/profile")
                                }
                            >

                                <FaBook size={28} className="mb-2" />

                                <br />

                                My Profile

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default UserDashboard;