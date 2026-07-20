import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link , useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    

    const login = async (e) => {
        e.preventDefault();

        try {

            const response = await API.post("token/", {
                username,
                password,
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            // Fetch logged-in user information
            const user = await API.get("accounts/me/", {
                headers: {
                    Authorization: `Bearer ${response.data.access}`,
                },
            });

            localStorage.setItem("is_staff", user.data.is_staff);
            localStorage.setItem("username", user.data.username);

            toast.success("Login Successful");

            const navigate = useNavigate();

            Navigate("/dashboard");

        } catch {

            toast.error("Invalid username or password");

        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Library Login
                            </h2>

                            <form onSubmit={login}>

                                <input
                                    className="form-control mb-3"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                />

                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />

                                <button className="btn btn-primary w-100">

                                    Login

                                </button>

                    
                            
                                    <p className="text-center mt-3">

                                        Don't have an account?{" "}

                                        <Link to="/register">

                                            Register

                                        </Link>
                                    </p>

                                

                            </form>

                        </div>

                    </div>

                </div>

            </div>


        </div>

    );
    
}

export default Login;