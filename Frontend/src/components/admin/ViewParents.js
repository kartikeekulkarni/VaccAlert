import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router for navigation

export default function ViewParents() {
    const [parents, setParents] = useState([]);

    useEffect(() => {
        const fetchParents = async () => {
            try {
                const response = await fetch('http://localhost:8080/getparents');
                if (!response.ok) throw new Error('Failed to fetch parents');
                const data = await response.json();
                setParents(data);
            } catch (error) {
                console.error('Error fetching parents:', error);
            }
        };

        fetchParents();
    }, []);

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <Link to="../home" className="btn btn-primary">Back to Home</Link>
            </div>
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h1 className="card-title mb-0">Parents List</h1>
                </div>
                <div className="card-body">
                    {parents.length === 0 ? (
                        <p className="alert alert-info">No parents found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered mb-0">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Id</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Contact</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parents.map((parent) => (
                                        <tr key={parent.pid}>
                                            <td>{parent.pid}</td>
                                            <td>{parent.fname}</td>
                                            <td>{parent.lname}</td>
                                            <td>{parent.number}</td>
                                            <td>{parent.email}</td>
                                            <td>
                                                {parent.address ? (
                                                    <>
                                                        <div>{parent.address.area || "N/A"}</div>
                                                        <div>
                                                            {(parent.address.city.name || "N/A")}, 
                                                            {(parent.address.district.name || "N/A")}
                                                        </div>
                                                        <div>
                                                            {(parent.address.state.sname || "N/A")}, 
                                                            {parent.address.pincode || "N/A"}
                                                        </div>
                                                    </>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
