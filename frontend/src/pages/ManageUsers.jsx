import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

import Footer from "../components/Footer";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        loadUsers();
    }, [search]);

    const loadUsers = () => {
        API.get(`accounts/users/?search=${search}`)
            .then((response) => {
                setUsers(response.data.results);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Unable to load users");
            });
    };

    const deleteUser = (id) => {

        if (!window.confirm("Delete this user?")) return;

        API.delete(`accounts/users/${id}/`)
            .then(() => {

                toast.success("User deleted successfully");

                loadUsers();

            })
            .catch((error) => {

                console.log(error);

                toast.error("Unable to delete user");

            });

    };

    const viewUser = (id) => {

        API.get(`accounts/users/${id}/details/`)
            .then((response) => {

                setSelectedUser(response.data);

                setShowModal(true);

            })
            .catch((error) => {

                console.log(error);

                toast.error("Unable to load user details");

            });

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Manage Users</h2>

                </div>

                <div className="row mb-3">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search username or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>#</th>

                            <th>Username</th>

                            <th>Email</th>

                            <th>Joined</th>

                            <th>Total Borrowed</th>

                            <th>Active Books</th>

                            <th>Fine</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.length === 0 ? (

                            <tr>

                                <td colSpan="8" className="text-center">

                                    No Users Found

                                </td>

                            </tr>

                        ) : (

                            users.map((user, index) => (

                                <tr key={user.id}>

                                    <td>{index + 1}</td>

                                    <td><div className="d-flex align-items-center">

                                        <img
                                           src ={
                                            user.avatar ||
                                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                           }
                                           alt="avatar"
                                           className="rounded-circle me-2"
                                           style = {{
                                             width: "45px",
                                             height: "45px",
                                             objectFit: "cover",
                                             border: "2px solid #0d6efd",

                                           }}
                                        />
                                        </div>
                                        <div className="fw-bold">
                                            {user.full_name}
                                        </div>
                                        <small className="text-muted">
                                            @{user.username}
                                        </small>
                                        
                                    </td>

                                    <td>
                                        <span className="text-primary">
                                            {user.email}
                                        </span>
                                        
                                    </td>

                                    <td><span className="badge bg-secondary">
                                        
                                            {user.joined}
                                        </span>
                                    </td>

                                    <td>

                                        <span className="badge bg-primary fs-6">

                                            {user.total_borrowed}

                                        </span>

                                    </td>

                                    <td>

                                        {user.borrowed_books.length === 0 ? (

                                            <span className="badge bg-success">

                                                None

                                            </span>

                                        ) : (

                                            user.borrowed_books.map((book, i) => (

                                                <span
                                                    key={i}
                                                    className="badge bg-warning text-dark me-1 mb-1"
                                                >

                                                    {book}

                                                </span>

                                            ))

                                        )}

                                    </td>

                                    <td>

                                        {Number(user.fine) > 0 ? (

                                            <span className="badge bg-danger">

                                                ₹ {user.fine}

                                            </span>

                                        ) : (

                                            <span className="badge bg-success">

                                                ₹0

                                            </span>

                                        )}

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => viewUser(user.id)}
                                        >
                                            👁 View
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            🗑 Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>
                        {showModal && selectedUser && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <div className="modal-dialog modal-xl">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h4>User Details</h4>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>

                            </div>

                            <div className="modal-body">

                                <div className="row mb-4">

                                    <div className="col-md-4">

                                        <div className="card shadow border-0 text-center"
                                             style = {{
                                                borderRadius: "18px",
                                             }}>

                                            <div className="card-body">

                                                <img src = {
                                                        
                                                        selectedUser.avatar ||
                                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                    
                                                    }

                                                    alt="avatar"
                                                    className="rounded-circle shadow mb-3"
                                                    style={{
                                                        width: "130px",
                                                        height: "130px",
                                                        objectFit: "cover",
                                                        border: "4px solid #0d6efd",
                                                    }}
                                                />
                                                <h4 className="fw-bold">
                                                    {selectedUser.full_name}
                                                </h4>

                                                <p className="text-muted mb-1">

                                                    @{selectedUser.username}
                                                </p>


                                                <p>{selectedUser.email}</p>
                                                
                                                <span
                                                   className={
                                                    selectedUser.is_staff
                                                    ? "badge bg-danger"
                                                    : "badge bg-primary"
                                                   }
                                                >

                                                    {selectedUser.is_staff ? "Admin" : "User"}
                                                </span>
                                                <hr />

                                                 <p className="text-muted mb-0">

                                                    📅 Member Since
                                                 </p>

                                                 <strong>

                                                    {selectedUser.joined}
                                                 </strong>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-8">

                                        <div className="row">

                                            <div className="col">

                                                <div className="card text-center bg-primary text-white">

                                                    <div className="card-body">

                                                        <h3>
                                                            {selectedUser.total_borrowed}
                                                        </h3>

                                                        <p>Total Borrowed</p>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col">

                                                <div className="card text-center bg-warning">

                                                    <div className="card-body">

                                                        <h3>
                                                            {selectedUser.active_books}
                                                        </h3>

                                                        <p>Active Books</p>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col">

                                                <div className="card text-center bg-danger text-white">

                                                    <div className="card-body">

                                                        <h3>
                                                            ₹{selectedUser.total_fine}
                                                        </h3>

                                                        <p>Total Fine</p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <h4 className="mb-3">
                                    Borrow History
                                </h4>

                                <table className="table table-hover align-middle shadow">

                                    <thead className="table-dark"
                                           style={{
                                            position: "sticky",
                                            top: 0,

                                           }}>

                                        <tr>

                                            <th>Book</th>

                                            <th>Borrow Date</th>

                                            <th>Due Date</th>

                                            <th>Return Date</th>

                                            <th>Status</th>

                                            <th>Fine</th>


                                        </tr>

                                    </thead>

                                    <tbody>

                                        {selectedUser.books.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="text-center"
                                                >
                                                    No Borrow History
                                                </td>

                                            </tr>

                                        ) : (

                                            selectedUser.books.map((book, index) => (

                                                <tr key={index}>

                                                    <td>
                                                        {book.title}
                                                    </td>

                                                    <td>
                                                        {book.borrow_date}
                                                    </td>

                                                    <td>
                                                        {book.due_date}
                                                    </td>

                                                    <td>
                                                        {book.return_date || "-"}
                                                    </td>

                                                    <td>

                                                        {book.status === "Borrowed" ? (

                                                            <span className="badge bg-warning text-dark">

                                                                Borrowed

                                                            </span>

                                                        ) : (

                                                            <span className="badge bg-success">

                                                                Returned

                                                            </span>

                                                        )}

                                                    </td>

                                                    <td>

                                                        {Number(book.fine) > 0 ? (

                                                            <span className="badge bg-danger">

                                                                ₹{book.fine}

                                                            </span>

                                                        ) : (

                                                            <span className="badge bg-success">

                                                                ₹0

                                                            </span>

                                                        )}

                                                    </td>

                                                    

                                                  

                                                </tr>

                                            ))

                                        )}

                                    </tbody>

                                </table>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
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

export default ManageUsers;  