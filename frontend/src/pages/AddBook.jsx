import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function AddBook() {

    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publisher: "",
        published_date: "",
        description: "",
        total_copies: 1,
        available_copies: 1,
    });

    const [coverImage, setCoverImage] = useState(null);

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(book).forEach((key) => {
            formData.append(key, book[key]);
        });

        if (coverImage) {
            formData.append("cover_image", coverImage);
        }

        API.post("books/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {
                toast.success("Book Added Successfully");
                setTimeout(() => {
                    navigate("/books");
                }, 1000);
            })
            .catch((err) => {
                console.log("Error:", err);
                console.log(err.response?.data);
                toast.error(JSON.stringify(err.response?.data || "Unable to add book"));
            });
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">Add Book</h2>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label>Title</label>
                            <input
                                className="form-control"
                                name="title"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Author</label>
                            <input
                                className="form-control"
                                name="author"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>ISBN</label>
                            <input
                                className="form-control"
                                name="isbn"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Category</label>
                            <input
                                className="form-control"
                                name="category"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Publisher</label>
                            <input
                                className="form-control"
                                name="publisher"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Published Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="published_date"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Total Copies</label>
                            <input
                                type="number"
                                className="form-control"
                                name="total_copies"
                                onChange={handleChange}
                                defaultValue={1}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Available Copies</label>
                            <input
                                type="number"
                                className="form-control"
                                name="available_copies"
                                onChange={handleChange}
                                defaultValue={1}
                            />
                        </div>

                        <div className="col-12 mb-3">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-12 mb-3">
                            <label>Book Cover</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setCoverImage(e.target.files[0])}
                            />
                        </div>

                    </div>

                    <button
                        className="btn btn-success"
                        type="submit"
                    >
                        Add Book
                    </button>

                </form>

            </div>
            <Footer />
        </>
    );
}

export default AddBook;