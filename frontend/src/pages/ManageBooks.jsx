import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";

import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Footer from "../components/Footer";

function ManageBooks() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadBooks();
    }, [search]);

    const loadBooks = () => {

        API.get(`books/?search=${search}`)
            .then((response) => {

                setBooks(response.data.results || []);

            })
            .catch((error) => {

                console.log(error);

            });

    };

    const deleteBook = (id) => {

        if (!window.confirm("Delete this book?")) {
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

    const handleBookAdded = () => {

        setShowModal(false);

        loadBooks();

    };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Manage Books</h2>

                    <Button
                        variant="success"
                        onClick={() => setShowModal(true)}
                    >
                        + Add Book
                    </Button>

                </div>

                <input
                    className="form-control mb-4"
                    placeholder="Search by title or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table className="table table-bordered table-hover align-middle">

                    <thead className="table-dark">

                        <tr>

                            <th>Cover</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Copies</th>
                            <th width="180">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {books.length === 0 ? (

                            <tr>

                                <td colSpan="6" className="text-center">

                                    No books found.

                                </td>

                            </tr>

                        ) : (

                            books.map((book) => (

                                <tr key={book.id}>

                                    <td>

                                        <img
                                            src={
                                                book.cover_image
                                                    ? book.cover_image
                                                    : "/no-book.png"
                                            }
                                            alt={book.title}
                                            width="60"
                                            height="80"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />

                                    </td>

                                    <td>{book.title}</td>

                                    <td>{book.author}</td>

                                    <td>{book.category}</td>

                                    <td>

                                        {book.available_copies} / {book.total_copies}

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteBook(book.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
            >

                <Modal.Header closeButton>

                    <Modal.Title>

                        Add New Book

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <BookForm
                        onSuccess={handleBookAdded}
                    />

                </Modal.Body>

            </Modal>

            <Footer />

        </>

    );

}

export default ManageBooks;