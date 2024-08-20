import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewChild() {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const p = JSON.parse(localStorage.getItem('loggedparent'));
        fetch(`http://localhost:8080/getchildsbypid/${p.pid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch child data');
                }
                return response.json();
            })
            .then(data => {
                setChildren(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleEdit = (cid) => {
        navigate(`/editchild/${cid}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <h3 className="text-center mb-4">Children Information</h3>
                {children.length > 0 ? (
                    children.map(child => (
                        <div key={child.cid} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <strong>ID:</strong> {child.id}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Name:</strong> {child.name}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Date of Birth:</strong> {child.dateOfBirth}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Gender:</strong> {child.gender}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Blood Group:</strong> {child.bloodGroup}
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(child.id)}
                                    >
                                        Edit Child
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No child data found.</div>
                )}
            </div>
        </div>
    );
}
