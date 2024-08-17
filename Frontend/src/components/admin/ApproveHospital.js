import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApproveHospital() {
    const [pendingHospitals, setPendingHospitals] = useState([]);
    const[msg,setMsg] =useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendingHospitals = async () => {
            try {
                const response = await fetch('https://localhost:7131/api/Registration/GetPendingHospitals');
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
            const response = await fetch(`https://localhost:7131/api/Registration/ApproveHospital/${hospitalId}`, {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Failed to approve hospital');
            //alert("Hospital approved successfully.");
            setMsg("Hospital approved successfully.");
            setPendingHospitals(pendingHospitals.filter(hospital => hospital.hid !== hospitalId));
            window.location.reload();
            
        } catch (error) {
            alert("Approval failed: " + error.message);
        }
    };

    const rejectHospital = async (hospitalId) => {
        try {
            const response = await fetch(`https://localhost:7131/api/Registration/RejectHospital/${hospitalId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to reject hospital');
            alert("Hospital rejected successfully.");
            setPendingHospitals(pendingHospitals.filter(hospital => hospital.hid !== hospitalId));
        } catch (error) {
            alert("Rejection failed: " + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Pending Hospital Registrations</h1>
                <button className="btn btn-primary" onClick={() => navigate('../home')}>
                    Back to Home
                </button>
            </div>
            {msg && <div className="alert alert-success">{msg}</div>}
            {pendingHospitals.length === 0 ? (
                <div className="alert alert-info text-center">
                    No pending approvals.
                </div>
            ) : (
                <table className="table table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
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
                                <td>{hospital.hid}</td>
                                <td>{hospital.hname}</td>
                                <td>{hospital.email}</td>
                                <td>
                                    <a href={hospital.url} target="_blank" rel="noopener noreferrer">
                                        {hospital.url}
                                    </a>
                                </td>
                                <td>{hospital.contact}</td>
                                <td className="d-flex justify-content-around">
                                    <button
                                        onClick={() => approveHospital(hospital.hid)}
                                        className="btn btn-success btn-sm"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => rejectHospital(hospital.hid)}
                                        className="btn btn-danger btn-sm ml-2"
                                    >
                                        Reject
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
