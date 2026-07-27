import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

import {
    FaBook,
    FaHome,
    FaUsers,
    FaHistory,
    FaUserCircle,
    FaSignOutAlt,
    FaKey,
    FaChevronDown,
} from "react-icons/fa";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const username = localStorage.getItem("username");
    const isAdmin = localStorage.getItem("is_staff") === "true";

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {

        API.get("users/profile/")
            .then((res) => {

                setAvatar(res.data.avatar);

            })
            .catch(() => {});

    }, []);

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm"
            style={{
                background: "linear-gradient(90deg,#2563EB,#1E40AF)",
                backdropFilter: "blur(10px)"
            }}
        >

            <div className="container">

                <Link
                    className="navbar-brand fw-bold fs-3 d-flex align-items-center"
                    to="/dashboard"
                >
                    <FaBook className="me-2 text-warning" />

                    <span>Online Library</span>

                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">

                            <Link
                                to="/dashboard"
                                className={`nav-link rounded px-3 mx-1 ${
                                    location.pathname === "/dashboard"
                                        ? "bg-light text-primary fw-bold"
                                        : ""
                                }`}
                            >

                                <FaHome className="me-2" />

                                Dashboard

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/books"
                                className={`nav-link rounded px-3 mx-1 ${
                                    location.pathname === "/books"
                                        ? "bg-light text-primary fw-bold"
                                        : ""
                                }`}
                            >

                                <FaBook className="me-2" />

                                Books

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/history"
                                className={`nav-link rounded px-3 mx-1 ${
                                    location.pathname === "/history"
                                        ? "bg-light text-primary fw-bold"
                                        : ""
                                }`}
                            >

                                <FaHistory className="me-2" />

                                History

                            </Link>

                        </li>

                        {isAdmin && (

                            <li className="nav-item">

                                <Link
                                    to="/users"
                                    className={`nav-link rounded px-3 mx-1 ${
                                        location.pathname === "/users"
                                            ? "bg-light text-primary fw-bold"
                                            : ""
                                    }`}
                                >

                                    <FaUsers className="me-2" />

                                    Users

                                </Link>

                            </li>

                        )}

                    </ul>

                    <div className="dropdown">

                        <button
                            className="btn btn-light rounded-pill px-3 d-flex align-items-center"
                            data-bs-toggle="dropdown"
                        >

                            <img
                                src={
                                    avatar ||
                                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                alt="avatar"
                                className="rounded-circle me-2"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover",
                                    border: "2px solid #2563EB",
                                }}
                            />

                            <span className="fw-semibold">

                                {username}

                            </span>

                            {isAdmin && (

                                <span className="badge bg-danger ms-2">

                                    Admin

                                </span>

                            )}

                            <FaChevronDown className="ms-2" />

                        </button>

                        <ul
                            className="dropdown-menu dropdown-menu-end shadow border-0"
                            style={{
                                minWidth: "260px",
                                borderRadius: "15px",
                            }}
                        >

                            <li className="text-center py-3">

                                <img
                                    src={
                                        avatar ||
                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    }
                                    alt="avatar"
                                    className="rounded-circle shadow"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        border: "3px solid #2563EB",
                                    }}
                                />

                                <h6 className="mt-3 mb-1 fw-bold">

                                    {username}

                                </h6>

                                {isAdmin && (

                                    <span className="badge bg-danger">

                                        Administrator

                                    </span>

                                )}

                            </li>

                            <li>

                                <hr className="dropdown-divider" />

                            </li>

                            <li>

                                <Link
                                    className="dropdown-item py-2"
                                    to="/profile"
                                >

                                    <FaUserCircle className="me-2 text-primary" />

                                    My Profile

                                </Link>

                            </li>

                            <li>

                                <Link
                                    className="dropdown-item py-2"
                                    to="/change-password"
                                >

                                    <FaKey className="me-2 text-warning" />

                                    Change Password

                                </Link>

                            </li>

                            <li>

                                <hr className="dropdown-divider" />

                            </li>

                            <li>

                                <button
                                    className="dropdown-item py-2 text-danger fw-bold"
                                    onClick={logout}
                                >

                                    <FaSignOutAlt className="me-2" />

                                    Logout

                                </button>

                            </li>

                        </ul>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;