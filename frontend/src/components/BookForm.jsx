import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function BookForm({ onSuccess }) {

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

    const [cover, setCover] = useState(null);

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

        if (cover) {
            formData.append("cover_image", cover);
        }

        API.post("books/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {

                toast.success("Book added successfully!");

                setBook({
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

                setCover(null);

                onSuccess();

            })
            .catch((error) => {
                console.log(error);
                toast.error("Unable to add book.");
            });

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label>Title</label>
                <input
                    className="form-control"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Author</label>
                <input
                    className="form-control"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label>ISBN</label>
                <input
                    className="form-control"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Category</label>
                <input
                    className="form-control"
                    name="category"
                    value={book.category}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label>Publisher</label>
                <input
                    className="form-control"
                    name="publisher"
                    value={book.publisher}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label>Published Date</label>
                <input
                    type="date"
                    className="form-control"
                    name="published_date"
                    value={book.published_date}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label>Description</label>
                <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={book.description}
                    onChange={handleChange}
                />
            </div>

            <div className="row">

                <div className="col">

                    <label>Total Copies</label>

                    <input
                        type="number"
                        className="form-control"
                        name="total_copies"
                        value={book.total_copies}
                        onChange={handleChange}
                    />

                </div>

                <div className="col">

                    <label>Available Copies</label>

                    <input
                        type="number"
                        className="form-control"
                        name="available_copies"
                        value={book.available_copies}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <div className="mt-3">

                <label>Cover Image</label>

                <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                />

            </div>

            <button className="btn btn-success mt-4 w-100">
                Save Book
            </button>

        </form>

    );
}

export default BookForm;