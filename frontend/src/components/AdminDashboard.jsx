
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";

import {
    FaBook,
    FaCheckCircle,
    FaExchangeAlt,
    FaUsers,
    FaPlus,
    FaMoneyBillWave,
    FaChartLine,
    FaExclamationTriangle,
} from "react-icons/fa";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

function AdminDashboard({ stats }) {

    const username = localStorage.getItem("username");

    const pieData = {
        labels: ["Available", "Borrowed"],
        datasets: [
            {
                data: [
                    stats.available_books,
                    stats.borrowed_books,
                ],
                backgroundColor: [
                    "#198754",
                    "#dc3545",
                ],
            },
        ],
    };

    const barData = {
        labels: stats.chart?.labels || [],
        datasets: [
            {
                label: "Books Borrowed",
                data: stats.chart?.values || [],
                backgroundColor: "#fd9d0deb",
            },
        ],
    };


    const navigate = useNavigate();



    return (

        <>

            <div className="container mt-4">

                <div className="mb-5">

                    <h2 className="fw-bold">

                        Welcome back,
                        <span className="text-primary">

                            {" "}
                            {username}

                        </span>

                         👋

                    </h2>

                    <p className="text-muted">

                        Here's what's happening in your library today.

                    </p>

                </div>

                {/* Statistics Cards */}
                <div className="row g-4">

                    <div className="col-md-3">
                        <StatCard
                            title="Total Books"
                            value={stats.total_books}
                            icon={<FaBook />}
                            color="linear-gradient(135deg,#2563EB,#1D4ED8)"
                        />
                    </div>

                    <div className="col-md-3">
                        <StatCard
                            title="Available"
                            value={stats.available_books}
                            icon={<FaCheckCircle />}
                            color="linear-gradient(135deg,#16A34A,#22C55E)"
                        />
                    </div>

                    <div className="col-md-3">
                        <StatCard
                            title="Borrowed"
                            value={stats.borrowed_books}
                            icon={<FaExchangeAlt />}
                            color="linear-gradient(135deg,#EA580C,#F97316)"
                        />
                    </div>

                    <div className="col-md-3">
                        <StatCard
                            title="Users"
                            value={stats.total_users}
                            icon={<FaUsers />}
                            color="linear-gradient(135deg,#7C3AED,#9333EA)"
                        />
                    </div>

                    <div className="col-md-3">
                        <StatCard
                            title="Overdue"
                            value={stats.overdue_books}
                            icon={<FaExclamationTriangle />}
                            color="linear-gradient(135deg,#DC2626,#EF4444)"
                        />
                    </div>

                    <div className="col-md-3">
                        <StatCard
                           title="Total Fine"
                           value={`₹${stats.total_fine}`}
                           icon={<FaMoneyBillWave />}
                           color="linear-gradient(135deg,#B45309,#F59E0B)"
                        />
                    </div>

                    <div className="col-md-3">
                        <StatCard
                            title="Borrowed Today"
                            value={stats.borrowed_today}
                            icon={<FaChartLine />}
                            color="linear-gradient(135deg,#0891B2,#06B6D4)"
                        />
                    </div>

                    <div className="col-md-3">
                        <StatCard
                            title="Returned Today"
                            value={stats.returned_today}
                            icon={<FaCheckCircle />}
                            color="linear-gradient(135deg,#059669,#10B981)"
                        />
                    </div>

                </div>



                {/* Quick Actions */}

                <div className="card shadow mt-5">

                    <div className="card-header bg-dark text-white">

                        <h4 className="mb-0">

                            ⚡ Quick Actions
                            
                        </h4>
                    </div>

                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-md-3">

                                <button
                                    className="btn btn-success w-100 p-3 d-flex flex-column align-items-center"
                                    onClick={() => navigate("/admin/books/add")}
                                >
                                    <FaPlus size={28} className="mb-2" />
                                    <br />
                                    Add Book
                                </button>

                            </div>
                            <div className="col-md-3">

                                <button
                                    className="btn btn-secondary w-100 p-3 d-flex flex-column align-items-center"
                                    onClick={() => navigate("/users")}
                                >
                                    <FaUsers size={25} className ="mb-2" />
                                    <br />
                                    Manage Fines
                                </button>

                            </div>

                            <div className="col-md-3">

                                <button
                                    className="btn btn-danger w-100 p-3 p-3 d-flex flex-column align-items-center"
                                    onClick={() => navigate("/admin/fines")}
                                >
                                    <FaMoneyBillWave size={25} className = "mb-2"/>
                                    <br />
                                    View Fines
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Charts */}

                <div className="row mt-5">

                    <div className="col-md-5">

                        <div className="card shadow-lg border-0 h-100">

                            <div className="card-header">

                                <h5 className="mb-0">
                                    📊 Available vs Borrowed
                                </h5>

                            </div>

                            <div style={{ height: "380px" }}>

                                <Pie data={pieData}
                                options={{
                                    maintainAspectRatio: false,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                    <div className="col-md-7">

                        <div className="card shadow-lg border-0 h-100">

                            <div className="card-header">

                                <h5 className="mb-0">
                                    📈 Monthly Borrow Activity
                                </h5>

                            </div>

                            <div style={{ height: "380px" }}>

                                <Bar data={barData} 
                                options={{
                                    maintainAspectRatio: false,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Recent Borrow Activity */}

                <div className="card shadow mt-5">

                    <div className="card-header">

                        <h4 className="mb-0">
                            Recent Borrow Activity
                        </h4>

                    </div>

                    <div className="card-body">

                        <table className="table table-hover align-middle">

                            <thead>

                                <tr>

                                    <th>Book</th>

                                    <th>User</th>

                                    <th>Date</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {(stats.recent || []).length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-center py-5">
                                            <h5>No Recent Activity</h5>

                                            <p className="text-muted">
                                                Borrow activity will appear here.
                                            </p>
                                        </td>
                                    </tr>

                                ) : (

                                (stats.recent || []).map((item, index) => (

                                    <tr key={index}>

                                        <td>{item.book}</td>

                                        <td>{item.user}</td>

                                        <td>{new Date(item.borrow_date).toLocaleDateString()}</td>

                                        <td>

                                            {item.status === "Borrowed" ? (

                                                <span className="badge rounded-pill bg-danger px-3 py-2">
                                                    Borrowed
                                                </span>

                                            ) : (

                                                <span className="badge rounded-pill bg-success px-3 py-2">
                                                    Returned
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))
                                
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );
}

export default AdminDashboard;