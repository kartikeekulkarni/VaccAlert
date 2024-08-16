import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ViewHospitals() {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch('http://localhost:8080/gethospitals');
                if (!response.ok) throw new Error('Failed to fetch hospitals');
                const data = await response.json();
                setHospitals(data);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };

        fetchHospitals();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center">Hospitals List</h1>
                <Link to="../home" className="btn btn-secondary">Back to Home</Link>
            </div>

            {hospitals.length === 0 ? (
                <p className="text-center">No hospitals found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Hospital Name</th>
                                <th>Email</th>
                                <th>Website</th>
                                <th>Address</th>
                                <th>Contact Number</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospitals.map(hospital => (
                                <tr key={hospital.hid}>
                                    <td>{hospital.hid}</td>
                                    <td>{hospital.name}</td>
                                    <td>{hospital.email}</td>
                                    <td>{hospital.url}</td>
                                    <td>
                                        {hospital.address ? (
                                            <>
                                                <div>{hospital.address.area || "N/A"}</div>
                                                <div>{hospital.address.city.name || "N/A"}, {hospital.address.district.name || "N/A"}</div>
                                                <div>{hospital.address.state.sname || "N/A"}, {hospital.address.pincode || "N/A"}</div>
                                            </>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    <td>{hospital.number || "N/A"}</td>
                                    <td>
                                        {hospital.status ? (
                                            <span className="text-success font-weight-bold">Approved</span>
                                        ) : (
                                            <span className="text-primary font-weight-bold">Pending</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
