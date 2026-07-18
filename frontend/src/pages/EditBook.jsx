import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function EditBook() {

    const { id } = useParams();

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

    useEffect(() => {
        loadBook();
    }, []);

    const loadBook = () => {

        API.get(`books/${id}/`)
            .then((response) => {

                setBook(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    };

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

            if (key !== "cover_image") {
                formData.append(key, book[key]);
            }

        });

        if (coverImage) {

            formData.append("cover_image", coverImage);

        }

        API.put(`books/${id}/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {

                toast.success("Book Updated Successfully");

                navigate("/books");

            })
            .catch((error) => {

                console.log(error.response?.data);

                toast.error("Unable to update book");

            });

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Edit Book</h2>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label>Title</label>

                            <input
                                className="form-control"
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Author</label>

                            <input
                                className="form-control"
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>ISBN</label>

                            <input
                                className="form-control"
                                name="isbn"
                                value={book.isbn}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Category</label>

                            <input
                                className="form-control"
                                name="category"
                                value={book.category}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Publisher</label>

                            <input
                                className="form-control"
                                name="publisher"
                                value={book.publisher}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Published Date</label>

                            <input
                                type="date"
                                className="form-control"
                                name="published_date"
                                value={book.published_date}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Total Copies</label>

                            <input
                                type="number"
                                className="form-control"
                                name="total_copies"
                                value={book.total_copies}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>Available Copies</label>

                            <input
                                type="number"
                                className="form-control"
                                name="available_copies"
                                value={book.available_copies}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-12 mb-3">

                            <label>Description</label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={book.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-12 mb-3">

                            <label>Change Cover Image</label>

                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) =>
                                    setCoverImage(e.target.files[0])
                                }
                            />

                        </div>

                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Update Book
                    </button>

                </form>

            </div>

            <Footer />

        </>

    );

}

export default EditBook;