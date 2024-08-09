import React from 'react';
import { Link } from 'react-router-dom';
import VaccineLogo from '../images/vaccalert.png';

export default function DashboardPage() {
    return (
        <div>
            {/* Fixed Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 fixed-top">
                <Link to="/" className="navbar-brand">
                    <img src={VaccineLogo} alt="Vaccine Logo" style={{ width: '100px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about-us" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content with Top Margin */}
            <div className="container mt-5 pt-5">
                {/* Header Section */}
                <div className="section bg-primary text-white p-3 rounded mb-4 text-center">
                    <h2 className="mb-0">Welcome to <strong>VaccAlert</strong> Dashboard</h2>
                </div>

                {/* Upcoming Vaccinations */}
                <div className="section" style={{ backgroundColor: '#e9f7fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ backgroundColor: '#d1ecf1', padding: '10px', borderRadius: '5px' }}>Upcoming Vaccinations</h3>
                    <ul className="list-unstyled">
                        <li className="mb-2">
                            <div className="p-2 border rounded">
                                Flu vaccine camp on August 20th.
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="p-2 border rounded">
                                New vaccination schedule for infants released.
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Important News */}
                <div className="section" style={{ backgroundColor: '#e9f7fa', padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ backgroundColor: '#d1ecf1', padding: '10px', borderRadius: '5px' }}>Important News</h3>
                    <ul className="list-unstyled">
                        <li className="mb-2">
                            <div className="p-2 border rounded">
                                Increased vaccination coverage by 15% this year.
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="p-2 border rounded">
                                New guidelines for childhood vaccinations have been issued.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
