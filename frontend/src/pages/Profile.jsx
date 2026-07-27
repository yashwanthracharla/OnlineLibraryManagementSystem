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
        avatar: "",
        });

        const [avatarFile, setAvatarFile] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);

    const [preview, setPreview] = useState("");

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

        const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);

        setPreview(URL.createObjectURL(file));

        };

        const updateProfile = (e) => {

        e.preventDefault();

        const data = new FormData();

        data.append("first_name", form.first_name);
        data.append("last_name", form.last_name);
        data.append("email", form.email);

        if (avatarFile) {
            data.append("avatar", avatarFile);
        }

        API.put(
            "users/profile/update/",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
            .then((res) => {

                toast.success(res.data.message);

                loadProfile();

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

                    <div className="card shadow-lg border-0 p-5"
                        style = {{
                            maxWidth: "700px",
                            margin: "auto",
                            borderRadius: "18px",
                        }}>

                        <h2 className="mb-4">
                            My Profile
                        </h2>

                        

                        <form onSubmit={updateProfile}>

                            <div className="text-center mb-4">

                                <img
                                src = {
                                avatarFile
                                ? URL.createObjectURL(avatarFile)
                                : form.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                alt="avatar"
                                className="rounded-circle shadow"
                                style={{
                                    width: "160px",
                                    height: "160px",
                                    objectFit: "cover",
                                    border: "4px solid #0d6efd",
                                }}
                                
                                />
                                <div className="mt-3">
                                    <input 
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setAvatarFile(e.target.files[0])}
                                    />
                                
                                </div>

                                
                            </div>

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

                            <button
                                className="btn btn-primary w-100 py-2"
                            >
                                💾 Save Changes
                            </button>

                        </form>

                    </div>

                </div>

                <Footer />

            </>
        );
    }

    export default Profile;