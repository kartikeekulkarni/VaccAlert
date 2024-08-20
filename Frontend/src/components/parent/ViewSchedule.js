import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

export default function ViewSchedule() {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [vaccineData, setVaccineData] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        const parentId = JSON.parse(localStorage.getItem('loggedparent'))?.pid;

        if (parentId) {
            fetch(`http://localhost:8080/getchildsbypid/${parentId}`)
                .then(response => response.json())
                .then(data => setChildren(data))
                .catch(error => setError('Error fetching children data.'));
        } else {
            setError('Parent ID is not available.');
        }
    }, []);

    useEffect(() => {
        if (selectedChild) {
            fetch(`http://localhost:8080/getvaccinesbyweek/${calculateWeeksDifference(selectedChild.dateOfBirth)}`)
                .then(response => response.json())
                .then(data => setVaccineData(data))
                .catch(error => setError('Error fetching vaccine data.'));
        }
    }, [selectedChild]);

    const handleChildChange = (event) => {
        const childId = event.target.value;
        const child = children.find(child => child.id === parseInt(childId));
        setSelectedChild(child);
    };

    const calculateWeeksDifference = (dob) => {
        if (!dob) return 'Invalid date';

        const currentDate = new Date();
        const dobDate = new Date(dob);

        if (isNaN(dobDate.getTime())) return 'Invalid date';

        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysDifference = Math.floor((currentDate - dobDate) / millisecondsPerDay);
        const weeksDifference = Math.floor(daysDifference / 7);

        return weeksDifference;
    };

    const handleBook = (vaccineId) => {
        navigate('../bookvaccine', {
            state: { cid: selectedChild.id, vid: vaccineId}  // Pass the selected child ID and vaccine ID
        });
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="card-header" style={{ backgroundColor: "#20c997" }}>
                                <h3>View Schedule</h3>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className='mb-3'>
                                <label className='form-label'>Select Child:</label>
                                <select className='form-select' onChange={handleChildChange}>
                                    <option value="">Select a child</option>
                                    {children.map(child => (
                                        <option key={child.id} value={child.id}>
                                            {child.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedChild && (
                                <div>
                                    <p>Date of Birth: {selectedChild.dateOfBirth}</p>
                                    <p>Weeks Since DOB: {calculateWeeksDifference(selectedChild.dateOfBirth)}</p>

                                    {vaccineData.length > 0 ? (
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>Vaccine Name</th>
                                                    <th>Site</th>
                                                    <th>Route</th>
                                                    <th>When to Give</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vaccineData.map(vaccine => (
                                                    <tr key={vaccine.vid}>
                                                        <td>{vaccine.vaccineName}</td>
                                                        <td>{vaccine.site}</td>
                                                        <td>{vaccine.route}</td>
                                                        <td>{vaccine.whenToGive}</td>
                                                        <td>
                                                            <button className='btn btn-primary' onClick={() => handleBook(vaccine.vid)}>Book</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="alert alert-info">Our vaccine alert system only contains vaccines for up to 6 years child</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
