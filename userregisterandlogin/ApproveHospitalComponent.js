import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApproveHospital() {
    const [pendingHospitals, setPendingHospitals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendingHospitals = async () => {
            try {
                const response = await fetch('https://localhost:7060/api/Registration/GetPendingHospitals');
                if (!response.ok) throw new Error('Failed to fetch pending hospitals');
                const data = await response.json();
                setPendingHospitals(data);
            } catch (error) {
                console.error('Error fetching pending hospitals:', error);
            }
        };

        fetchPendingHospitals();
    }, []);

    const approveHospital = async (hospitalId) => {
        try {
            const response = await fetch(`https://localhost:7060/api/Registration/ApproveHospital/${hospitalId}`, {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Failed to approve hospital');
            alert("Hospital approved successfully.");
            setPendingHospitals(pendingHospitals.filter(hospital => hospital.hid !== hospitalId));
        } catch (error) {
            alert("Approval failed: " + error.message);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button onClick={() => navigate('/admin_home')} className="nav-link px-3 btn btn-link">
                                Back to Admin Home
                            </button>
                        </li>
                        {/* Include other navigation links if needed */}
                    </ul>
                </div>
            </nav>
            {pendingHospitals.length === 0 ? (
                <h1>No pending approvals.</h1>
            ) : (
                <table className="table table-striped">
                    <h1>Pending Hospital Registrations</h1>
                    <thead>
                        <tr>
                            <th>Hospital Name</th>
                            <th>Email</th>
                            <th>Website</th>
                            <th>Contact Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingHospitals.map(hospital => (
                            <tr key={hospital.hid}>
                                <td>{hospital.hname}</td>
                                <td>{hospital.email}</td>
                                <td>{hospital.website}</td>
                                <td>{hospital.contactNumber}</td>
                                <td>
                                    <button onClick={() => approveHospital(hospital.hid)} className="btn btn-success">
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
