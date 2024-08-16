import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';

export default function ContactPageComponent() {
    return (
        <div className="container mt-5">
            <Navbar/>
            <div className="row justify-content-center">
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
                            <Link to="../home" className="btn btn-primary">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
