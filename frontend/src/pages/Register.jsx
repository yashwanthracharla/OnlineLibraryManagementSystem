import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Footer from "../components/Footer";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image.");
            return;
        }

        setAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        const formData = new FormData();

        formData.append("first_name", form.first_name);
        formData.append("last_name", form.last_name);
        formData.append("username", form.username);
        formData.append("email", form.email);
        formData.append("password", form.password);

        if (avatar) {
            formData.append("avatar", avatar);
        }

        API.post("accounts/register/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {
                toast.success("Registration successful");

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch((error) => {
                console.log(error);

                if (error.response?.data?.username) {
                    toast.error(error.response.data.username[0]);
                } else if (error.response?.data?.email) {
                    toast.error(error.response.data.email[0]);
                } else {
                    toast.error("Registration failed");
                }
            });
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">

                                <h2 className="text-center mb-4">
                                    Register
                                </h2>

                                <form onSubmit={handleSubmit}>

                                    {/* Avatar */}

                                    <div className="text-center mb-4">

                                        <img
                                            src={
                                                preview ||
                                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                            }
                                            alt="Avatar Preview"
                                            className="rounded-circle shadow"
                                            style={{
                                                width: "120px",
                                                height: "120px",
                                                objectFit: "cover",
                                                border: "4px solid #0d6efd",
                                            }}
                                        />

                                        <div className="mt-3">

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="form-control"
                                                onChange={handleImageChange}
                                            />

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="First Name"
                                                name="first_name"
                                                value={form.first_name}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                name="last_name"
                                                value={form.last_name}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            name="username"
                                            value={form.username}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-4">

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            name="confirm_password"
                                            value={form.confirm_password}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        type="submit"
                                    >
                                        Register
                                    </button>

                                </form>

                                <div className="text-center mt-3">

                                    Already have an account?{" "}

                                    <Link to="/">
                                        Login
                                    </Link>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Register;