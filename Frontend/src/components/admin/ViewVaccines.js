import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ViewVaccines() {
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        const fetchVaccines = async () => {
            try {
                // Fetch all vaccines
                const response = await fetch('http://localhost:8080/getallvaccines');
                if (!response.ok) throw new Error('Failed to fetch vaccines');
                const data = await response.json();
                setVaccines(data);
            } catch (error) {
                console.error('Error fetching vaccines:', error);
            }
        };

        fetchVaccines();
    }, []);

    // Function to handle vaccine deletion
    const handleDelete = async (vid) => {
        try {
            const response = await fetch(`http://localhost:8080/vaccines/${vid}`, {
                method: 'DELETE',
            });            
            if (!response.ok) throw new Error('Failed to delete vaccine');
            // Remove the deleted vaccine from the state
            setVaccines(vaccines.filter(vaccine => vaccine.vid !== vid));
        } catch (error) {
            console.error('Error deleting vaccine:', error);
        }
    };

    return (
        <div>

            <div className="container mt-5">
                <h1>Vaccines List</h1>
                <div className="mb-3">
                <Link to="../home" className="btn btn-primary">Back to Home</Link>
            </div>
                {vaccines.length === 0 ? (
                    <p>No vaccines found.</p>
                ) : (
                    <table className="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>Vaccine ID</th>
                                <th>Vaccine Name</th>
                                <th>Description</th>
                                <th>Dose</th>
                                <th>Route</th>
                                <th>Site</th>
                                <th>When to Give</th>
                                <th>Weeks</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vaccines.map(vaccine => (
                                <tr key={vaccine.vid}>
                                    <td>{vaccine.vid}</td>
                                    <td>{vaccine.vaccineName}</td>
                                    <td>{vaccine.description}</td>
                                    <td>{vaccine.dose}</td>
                                    <td>{vaccine.route}</td>
                                    <td>{vaccine.site}</td>
                                    <td>{vaccine.whenToGive}</td>
                                    <td>{vaccine.weeks}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(vaccine.vid)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
