import { Link } from "react-router-dom";

import "./LandingPage.css";

import {
    FaBookOpen,
    FaBook,
    FaUsers,
    FaStar,
    FaArrowDown,
} from "react-icons/fa";

function LandingPage() {

    return (

        <>

            {/* Navbar */}

            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100">

                <div className="container">

                    <Link className="navbar-brand fw-bold fs-3" to="/">
                        📚 Online Library
                    </Link>

                    <div>

                        <Link
                            className="btn btn-outline-light rounded-pill px-4 me-2"
                            to="/login"
                        >
                            Login
                        </Link>

                        <Link
                            className="btn btn-warning rounded-pill px-4"
                            to="/register"
                        >
                            Register
                        </Link>

                    </div>

                </div>

            </nav>

            {/* Hero Section */}

            <section

                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    background: "linear-gradient(135deg,#2563eb,#1e3a8a)",
                    position: "relative",
                }}

            >

                <div
                    className="container"
                    style={{
                        paddingTop: "80px",
                    }}
                >

                    <div className="row align-items-center">

                        {/* Left Side */}

                        <div className="col-lg-6 text-white">

                            <h1 className="display-2 fw-bold mb-4">

                                📚 Online Library

                            </h1>

                            <h2 className="fw-bold mb-4">

                                Your Complete Digital Library Experience

                            </h2>

                            <p
                                className="lead mb-4"
                                style={{
                                    lineHeight: "1.8",
                                }}
                            >

                                Discover thousands of books, borrow with a click,
                                track your reading history, share reviews,
                                and manage your personal library—all in one place.

                                <br />
                                <br />

                                Built with React, Django REST Framework,
                                JWT Authentication and MySQL.

                            </p>

                            {/* Buttons */}

                            <div className="mb-5">

                                <Link
                                    to="/login"
                                    className="btn btn-warning btn-lg rounded-pill px-5 me-3"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn btn-outline-light btn-lg rounded-pill px-5 me-3"
                                >
                                    Register
                                </Link>

                                <a
                                    href="#features"
                                    className="btn btn-light btn-lg rounded-pill px-5"
                                >
                                    Explore
                                </a>

                            </div>

                            {/* Statistics */}

                            <div className="row text-center mt-5">

                                <div className="col">

                                    <FaBook size={35} />

                                    <h2 className="fw-bold mt-2">

                                        1000+

                                    </h2>

                                    <p>Books</p>

                                </div>

                                <div className="col">

                                    <FaUsers size={35} />

                                    <h2 className="fw-bold mt-2">

                                        500+

                                    </h2>

                                    <p>Users</p>

                                </div>

                                <div className="col">

                                    <FaStar size={35} />

                                    <h2 className="fw-bold mt-2">

                                        2500+

                                    </h2>

                                    <p>Reviews</p>

                                </div>

                            </div>

                        </div>

                        {/* Right Side */}

                        <div className="col-lg-6 text-center">

                            <FaBookOpen
                                size={320}
                                className="hero-book"
                                style={{
                                    opacity: 0.95,
                                }}
                            />

                        </div>

                    </div>

                </div>

                {/* Scroll Down */}

                <div
                    className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
                >

                    <a
                        href="#features"
                        className="text-white text-decoration-none text-center d-block"
                    >

                        <FaArrowDown
                            size={22}
                            className="hero-book"
                        />

                        <br />

                        Explore

                    </a>

                </div>

            </section>

            {/* Features */}

            <section id="features" className="py-5 bg-light">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold display-5">

                            Why Choose Our Library?

                        </h2>

                        <p className="text-muted">

                            Everything you need to manage your digital library in one place.

                        </p>

                    </div>
                    <div className="row g-4">

                        <div className="col-md-4">

                            <div
                               className="card feature-card border-0 shadow h-100 text-center p-4"
                            >
                                <div className="feature-icon">

                                    📚

                                </div>

                                <h4 className="mt-3">

                                     Book Management
                                </h4>

                                <p className="text-muted">

                                    Browse, search and organize books effortlessly.

                                </p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div
                               className="card feature-card border-0 shadow h-100 text-center p-4"
                            >

                                <div className="feature-icon">

                                    🔍

                                </div>

                                <h4 className="mt-3">

                                    Smart Search

                                </h4>

                                <p className="text-muted">

                                    Find books instantly using title, author or category.

                                </p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div
                               className="card feature-card border-0 shadow h-100 text-center p-4"
                            >

                                <div className="feature-icon">

                                    ⭐

                                </div>

                                <h4 className="mt-3">

                                    Reviews & Ratings

                                </h4>

                                <p className="text-muted">

                                    Share your experience and rate your favourite books.

                                </p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div
                               className="card feature-card border-0 shadow h-100 text-center p-4"
                            >

                                <div className="feature-icon">

                                    👤

                                </div>
                                <h4 className="mt-3">
                                    User Dashboard

                                </h4>

                                <p className="text-muted">

                                    Track borrowed books, history, reviews and fines.

                                </p>

                            </div>

                        </div>
                        <div className="col-md-4">

                            <div
                               className="card feature-card border-0 shadow h-100 text-center p-4"
                            >

                                <div className="feature-icon">

                                    🛡️

                                </div>

                                <h4 className="mt-3">

                                    Secure Login

                                </h4>

                                <p className="text-muted">

                                    JWT authentication with protected routes for safety.

                                </p>

                            </div>

                        </div>
                         <div className="col-md-4">

                            <div
                               className="card feature-card border-0 shadow h-100 text-center p-4"
                            >

                                <div className="feature-icon">

                                    📊

                                </div>

                                <h4 className="mt-3">

                                    Admin Analytics

                                </h4>

                                <p className="text-muted">

                                    Monitor users, books, borrow activity and reports.

                                </p>

                            </div>

                         </div>

                    </div>

                </div>

            </section>

            {/* How It Works */}

            <section className="py-5">

                <div className="container">

                     <div className="text-center mb-5">

                        <h2 className="fw-bold display-5">

                            How It Works

                        </h2>
                        <p className="text-muted">

                            Borrow books in four simple steps.

                        </p>

                     </div>

                     <div className="row text-center g-4 ">

                        <div className="col-md-3">

                            <div className="step-card">

                                <div className="step-circle">

                                    1

                                </div>
                                <h4 className="mt-4">

                                    Register
                                </h4>

                                <p className="text-muted">

                                    Create your account securely and log in.
                                </p>
                            </div>
                        </div>


                        <div className="col-md-3">

                            <div className="step-card">

                                <div className="step-circle">

                                    2

                                </div>
                                <h4 className="mt-4">

                                    Browse Books
                                </h4>

                                <p className="text-muted">

                                    Search books by title, author or category.
                                </p>
                            </div>
                        </div>


                        <div className="col-md-3">

                            <div className="step-card">

                                <div className="step-circle">

                                    3

                                </div>
                                <h4 className="mt-4">

                                    Borrow
                                </h4>

                                <p className="text-muted">

                                    Borrow available books with one click.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3">

                            <div className="step-card">

                                <div className="step-circle">

                                    4

                                </div>
                                <h4 className="mt-4">

                                    Review
                                </h4>

                                <p className="text-muted">

                                    Rate books and share your reading experience.
                                </p>
                            </div>
                        </div>
                     </div>

                     </div>
    



            </section>

            {/* Technology Stack */}

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold display-5">

                            Technology Stack

                        </h2>

                        <p className="text-muted">

                            Built with modern technologies for performance, security and scalability.

                        </p>

                    </div>

                    <div className="row g-4 justify-content-center">

                        <div className="col-md-2 col-6">

                            <div className="tech-card">

                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                    alt="React"
                                />

                                <h5 className="mt-3">

                                     React

                                </h5>

                            </div>

                        </div>

                        <div className="col-md-2 col-6">

                            <div className="tech-card">

                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                                    alt="Python"
                                />

                                <h5 className="mt-3">

                                    Python

                                </h5>

                            </div>

                        </div>

                        <div className="col-md-2 col-6">

                            <div className="tech-card">

                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"
                                    alt="Django"
                                    style={{ background: "white", borderRadius: "10px" }}
                                />

                                <h5 className="mt-3">

                                    Django REST

                                </h5>

                            </div>

                        </div>


                        <div className="col-md-2 col-6">

                            <div className="tech-card">

                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
                                    alt="MySQL"
                                />

                                <h5 className="mt-3">

                                     MySQL

                                </h5>

                            </div>

                        </div>

                        <div className="col-md-2 col-6">

                            <div className="tech-card">

                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
                                    alt="BootStrap"
                                />

                                <h5 className="mt-3">

                                    BootStrap

                                </h5>

                            </div>

                        </div>

                        <div className="col-md-2 col-6">

                            <div className="tech-card">

                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                                    alt="Git"
                                />

                                <h5 className="mt-3">

                                    Git

                                </h5>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Footer */}

<footer className="bg-dark text-white pt-5 pb-3">

    <div className="container">

        <div className="row">

            {/* About */}

            <div className="col-lg-4 mb-4">

                <h3 className="fw-bold">

                    📚 Online Library

                </h3>

                <p className="text-light mt-3">

                    A complete digital library management system built with
                    React, Django REST Framework, JWT Authentication and MySQL.

                </p>

            </div>

            {/* Quick Links */}

            <div className="col-lg-2 col-md-4 mb-4">

                <h5 className="fw-bold">

                    Quick Links

                </h5>

                <ul className="list-unstyled mt-3">

                    <li>
                        <a href="#" className="footer-link">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="#features" className="footer-link">
                            Features
                        </a>
                    </li>

                    <li>
                        <Link to="/login" className="footer-link">
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link to="/register" className="footer-link">
                            Register
                        </Link>
                    </li>

                </ul>

            </div>

            {/* Technologies */}

            <div className="col-lg-3 col-md-4 mb-4">

                <h5 className="fw-bold">

                    Technologies

                </h5>

                <ul className="list-unstyled mt-3">

                    <li>⚛ React</li>

                    <li>🐍 Django REST</li>

                    <li>🗄 MySQL</li>

                    <li>🔐 JWT Authentication</li>

                    <li>📊 Chart.js</li>

                </ul>

            </div>

            {/* Contact */}

            <div className="col-lg-3 col-md-4 mb-4">

                <h5 className="fw-bold">

                    Contact

                </h5>

                <p className="mb-2">

                    📧 yashwanthracharla669@gmail.com

                </p>

                <p className="mb-2">

                    📱 +91 XXXXX XXXXX

                </p>

                <p>

                    📍 Hyderabad, India

                </p>

            </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">

            <p className="mb-1">

                © 2026 Online Library Management System

            </p>

            <p className="text-secondary">

                Built with ❤️ using React, Django REST Framework & MySQL

            </p>

        </div>

    </div>

</footer>


   

        </>

    );

}

export default LandingPage;