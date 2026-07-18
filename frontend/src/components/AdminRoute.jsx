import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const token = localStorage.getItem("access");
    const isAdmin = localStorage.getItem("is_staff") === "true";

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default AdminRoute;