import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUsPage() {
    return (
        <div className="container mt-4 pt-4">
            <div className="bg-info text-white p-3 rounded mb-4 text-center">
                <h2 className="mb-0">About VaccAlert</h2>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <div className="section" style={{ backgroundColor: '#e9f7fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                        <h3 style={{ backgroundColor: '#d1ecf1', padding: '10px', borderRadius: '5px' }}>Our Mission</h3>
                        <p>
                            At VaccAlert, our mission is to provide parents and guardians with timely reminders and comprehensive information about vaccinations for their children. We strive to improve public health by ensuring that children receive their vaccinations on time and stay protected against preventable diseases.
                        </p>
                    </div>

                    <div className="section" style={{ backgroundColor: '#e9f7fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                        <h3 style={{ backgroundColor: '#d1ecf1', padding: '10px', borderRadius: '5px' }}>What We Do</h3>
                        <p>
                            VaccAlert is dedicated to offering a user-friendly platform where parents can manage their child’s vaccination schedule. Our services include:
                        </p>
                        <ul>
                            <li>Reminders for upcoming vaccinations</li>
                            <li>Information about different vaccines and their benefits</li>
                            <li>Tracking of vaccination history</li>
                            <li>Find nearby hospitals and clinics for vaccinations</li>
                        </ul>
                    </div>

                    <div className="section" style={{ backgroundColor: '#e9f7fa', padding: '20px', borderRadius: '8px' }}>
                        <h3 style={{ backgroundColor: '#d1ecf1', padding: '10px', borderRadius: '5px' }}>Our Team</h3>
                        <p>
                            Our team consists of dedicated professionals who are passionate about child health and vaccinations. We work tirelessly to ensure our platform provides accurate and up-to-date information to our users.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Contact Us</h5>
                            <p className="card-text">Have questions or need support? Reach out to us at:</p>
                            <ul>
                                <li>Email: support@vaccalert.com</li>
                                <li>Phone: 123 456 7890</li>
                                <li>Address: Know IT Students, Pune</li>
                            </ul>
                            <Link to="/" className="btn btn-primary">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
