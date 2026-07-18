import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
function ChangePassword() {

    const [form, setForm] = useState({
        old_password: "",
        new_password: "",
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

        if (form.new_password !== form.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        API.put("users/change-password/", {
            old_password: form.old_password,
            new_password: form.new_password,
        })
        .then((res) => {

            toast.success(res.data.message);

            setForm({
                old_password: "",
                new_password: "",
                confirm_password: "",
            });

        })
        .catch((err) => {

            console.log(err);

            if (err.response?.data?.error) {

                if (Array.isArray(err.response.data.error)) {
                    toast.error(err.response.data.error[0]);
                } else {
                    toast.error(err.response.data.error);
                }

            } else {
                toast.error("Unable to change password");
            }

        });

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="mb-4">
                            Change Password
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label className="form-label">
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    name="old_password"
                                    className="form-control"
                                    value={form.old_password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name="new_password"
                                    className="form-control"
                                    value={form.new_password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirm_password"
                                    className="form-control"
                                    value={form.confirm_password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Change Password
                            </button>

                        </form>

                    </div>

                </div>

            </div>

            <Footer />

        </>
    );
}

export default ChangePassword;