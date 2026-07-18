import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BorrowHistory from "./pages/BorrowHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import ManageUsers from "./pages/ManageUsers";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AdminFines from "./pages/AdminFines";
import Register from "./pages/Register";
import AdminRoute from "./components/AdminRoute";

import BookDetails from "./pages/BookDetails";

import LandingPage from "./pages/LandingPage";

function App() {

    console.log("App Loaded");

    return (

        <BrowserRouter>

            <Routes>

            

                <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/books/add"
                    element={
                        <AdminRoute>
                            <AddBook />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />




                <Route
                    path="/admin/books/edit/:id"
                    element={
                        <AdminRoute>
                            <EditBook />
                        </AdminRoute>
                    }
                />



                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                /> 

                <Route
                    path="/admin/fines"
                    element={
                        <AdminRoute>
                            <AdminFines />
                        </AdminRoute>
                    }
                />


                <Route
                    path="/books"
                    element={
                        <ProtectedRoute>
                            <Books />
                        </ProtectedRoute>
                   }
                />

                <Route
                    path="/users"
                    element={
                        <AdminRoute>
                            <ManageUsers />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <BorrowHistory />
                        </ProtectedRoute>
                    }
                />

                <Route
                   path="/books/:id"
                   element={
                    <ProtectedRoute>
                        <BookDetails />
                    </ProtectedRoute>
                   }
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;