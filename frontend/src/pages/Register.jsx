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

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (form.password !== form.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        API.post("accounts/register/", {
            first_name: form.first_name,
            last_name: form.last_name,
            username: form.username,
            email: form.email,
            password: form.password,
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
            } else {
                toast.error("Registration failed");
            }

        });

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Register
                            </h2>

                            <form onSubmit={handleSubmit}>

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

                                <div className="mb-3">

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

    );
    
}

export default Register;