import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegistrationComponent() {
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();

    const handleSelection = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleProceed = () => {
        if (selectedRole === 'parent') {
            navigate('/parentregistration');
        } else if (selectedRole === 'hospital') {
            navigate('/hospitalregistration');
        }
    };

    return (
        <div className="container mt-5 pt-5">
            {/* Header Section */}
            <div className="section bg-primary text-white p-4 rounded mb-4 text-center">
                <h2 className="mb-0">Select Your Registration Type</h2>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm" style={{ borderRadius: '15px', border: 'none' }}>
                        <div className="text-center mb-4">
                            <h4>Who are you registering as?</h4>
                            <div className="d-flex flex-column align-items-center">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="roleOptions"
                                        id="parent"
                                        value="parent"
                                        checked={selectedRole === 'parent'}
                                        onChange={handleSelection}
                                    />
                                    <label className="form-check-label" htmlFor="parent">
                                        <h5>Parent</h5>
                                    </label>
                                </div>
                                <div className="form-check mt-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="roleOptions"
                                        id="hospital"
                                        value="hospital"
                                        checked={selectedRole === 'hospital'}
                                        onChange={handleSelection}
                                    />
                                    <label className="form-check-label" htmlFor="hospital">
                                        <h5>Hospital</h5>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleProceed}
                            disabled={!selectedRole}
                            style={{ borderRadius: '20px' }}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
