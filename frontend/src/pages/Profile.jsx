import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

function Profile() {

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        date_joined: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        API.get("users/profile/")
            .then((res) => {
                setForm(res.data);
            })
            .catch(console.log);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const updateProfile = (e) => {

        e.preventDefault();

        API.put("users/profile/update/", form)
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch(() => {
                toast.error("Unable to update profile.");
            });
    };

    return (
        <>
            <Navbar />

            <div className="mb-4">

    <h2 className="fw-bold">
        📚 Books Collection
    </h2>

    <p className="text-muted">

        Browse, search and borrow your favourite books.

    </p>

</div>

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h2 className="mb-4">
                        My Profile
                    </h2>

                    <form onSubmit={updateProfile}>

                        <div className="mb-3">

                            <label>Username</label>

                            <input
                                className="form-control"
                                value={form.username}
                                disabled
                            />

                        </div>

                        <div className="mb-3">

                            <label>First Name</label>

                            <input
                                className="form-control"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Last Name</label>

                            <input
                                className="form-control"
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                className="form-control"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Date Joined</label>

                            <input
                                className="form-control"
                                value={new Date(form.date_joined).toLocaleDateString()}
                                disabled
                            />

                        </div>

                        <button className="btn btn-primary">
                            Update Profile
                        </button>

                    </form>

                </div>

            </div>

            <Footer />

        </>
    );
}

export default Profile;