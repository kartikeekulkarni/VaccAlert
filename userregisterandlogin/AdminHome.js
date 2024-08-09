import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminHome() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user-specific data from localStorage
        sessionStorage.clear(); // Clear session storage
        navigate('/'); // Navigate to the login page or home page
    };

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/approveHospital" className="nav-link px-3">Approve Hospital</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/viewParents" className="nav-link px-3">View Parents</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/viewHospitals" className="nav-link px-3">View Hospitals</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addVaccine" className="nav-link px-3">Add Vaccine</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/removeVaccine" className="nav-link px-3">Remove Vaccine</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link px-3 btn btn-link">Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <h1>Admin Home</h1>
        </div>
    );
}
