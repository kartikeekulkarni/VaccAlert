import React from 'react';
import Navbar from './navbar';

export default function AboutUsPage() {
    return (
        <div>
            <Navbar />
            {/* Add padding to prevent the navbar from overlapping the content */}
            <div style={{ paddingTop: '70px' }}>
                <div className="text-center mb-5">
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <h2 style={{ color: '#0056b3', fontWeight: 'bold' }}>About VaccAlert</h2>
                        <p style={{ color: '#444', fontSize: '1.1em' }}>Learn more about our mission, what we do, and our dedicated team.</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <h3 style={{ color: '#0056b3', borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>Our Mission</h3>
                            <p style={{ color: '#444' }}>
                                At VaccAlert, our mission is to provide parents and guardians with timely reminders and comprehensive information about vaccinations for their children. We strive to improve public health by ensuring that children receive their vaccinations on time and stay protected against preventable diseases.
                            </p>
                        </div>

                        <div className="mt-4" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <h3 style={{ color: '#0056b3', borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>What We Do</h3>
                            <p style={{ color: '#444' }}>
                                VaccAlert is dedicated to offering a user-friendly platform where parents can manage their child’s vaccination schedule. Our services include:
                            </p>
                            <ul style={{ color: '#444' }}>
                                <li>Reminders for upcoming vaccinations</li>
                                <li>Information about different vaccines and their benefits</li>
                                <li>Tracking of vaccination history</li>
                                <li>Find nearby hospitals and clinics for vaccinations</li>
                            </ul>
                        </div>

                        <div className="mt-4" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <h3 style={{ color: '#0056b3', borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>Our Team</h3>
                            <p style={{ color: '#444' }}>
                                Our team consists of dedicated professionals who are passionate about child health and vaccinations. We work tirelessly to ensure our platform provides accurate and up-to-date information to our users.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
