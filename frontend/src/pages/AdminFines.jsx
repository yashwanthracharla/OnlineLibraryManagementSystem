import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminFines() {

    const [records, setRecords] = useState([]);
    const [totalFine, setTotalFine] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadFines();
    }, []);

    const loadFines = () => {
        API.get("borrow/fines/")
            .then((res) => {
                setRecords(res.data.records);
                setTotalFine(res.data.total_fine);
            })
            .catch((err) => console.log(err));
    };

    const filtered = records.filter((record) =>
        record.user.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow mb-4">

                    <div className="card-body text-center">

                        <h3>Total Outstanding Fine</h3>

                        <h1 className="text-danger">
                            ₹{totalFine}
                        </h1>

                    </div>

                </div>

                <div className="row mb-3">

                    <div className="col-md-4">

                        <input
                            className="form-control"
                            placeholder="Search User..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>User</th>
                            <th>Book</th>
                            <th>Due Date</th>
                            <th>Returned</th>
                            <th>Fine</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length === 0 ? (

                            <tr>

                                <td colSpan="5" className="text-center">

                                    No Fine Records

                                </td>

                            </tr>

                        ) : (

                            filtered.map((record) => (

                                <tr key={record.id}>

                                    <td>{record.user}</td>

                                    <td>{record.book}</td>

                                    <td>{record.due_date}</td>

                                    <td>{record.returned}</td>

                                    <td>

                                        <span className="badge bg-danger">

                                            ₹{record.fine}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            <Footer />
        </>
    );
}

export default AdminFines;