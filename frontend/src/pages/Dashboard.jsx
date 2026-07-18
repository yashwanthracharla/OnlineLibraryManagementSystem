import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

function Dashboard() {

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({});

    const isAdmin = localStorage.getItem("is_staff") === "true";

    useEffect(() => {

        const token = localStorage.getItem("access");

        API.get("dashboard/", {

            headers: {
                Authorization: `Bearer ${token}`,
            },

        })

            .then((response) => {

                setStats(response.data);

                setLoading(false);

            })

            .catch((error) => {

                console.log(error);

                setLoading(false);

            });

    }, []);

    if (loading) {

        return (

            <>
                <Navbar />

                

                <div className="container text-center mt-5">

                    <div className="spinner-border text-primary"></div>

                    <h5 className="mt-3">

                        Loading Dashboard...

                    </h5>

                </div>

                <Footer />

            </>

        );

    }

    return (

        <>

            <Navbar />

            {

                isAdmin

                    ?

                    <AdminDashboard stats={stats} />

                    :

                    <UserDashboard stats={stats} />

            }

            <Footer />

        </>

    );

}

export default Dashboard;