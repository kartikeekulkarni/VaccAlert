

import React, { useReducer } from 'react';

export default function AddChild() {

    const init = {
        name: { value: "", valid: false, err: "", touch: false },
        dob: { value: "", valid: false, err: "", touch: false },
        gender: { value: "", valid: false, err: "", touch: false },
        bloodgroup: { value: "", valid: false, err: "", touch: false },
        formValid: false,
        errorMsg: ""
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                const { key, value, valid, err, touch, formValid } = action.data;
                return { ...state, [key]: { value, valid, err, touch }, formValid };
            case 'setError':
                return { ...state, errorMsg: action.errorMsg };
            case 'reset':
                return init;
            default:
                return state;
        }
    };

    const [child, dispatch] = useReducer(reducer, init);
    

    const handleChange = (key, value) => {
        const { valid, err } = checkValid(key, value);
        let formValid = true;
        for (let k in child) {
            if (child[k].valid === false) {
                formValid = false;
                break;
            }
        }
        dispatch({ type: 'update', data: { key, value, valid, err, touch: true, formValid } });
    };

    const checkValid = (key, value) => {
        let valid = true;
        let err = "";
        switch (key) {
            case 'name':
                const namePattern = /^\w{2,}$/;
                if (!value) { valid = false; err = "Name is required"; }
                else if (!namePattern.test(value)) {
                    valid = false;
                    err = "Invalid Name";
                }
                break;
            case 'dob':
                if (!value) { valid = false; err = "DOB is required"; }
                break;
            case 'gender':
                if (!value) { valid = false; err = "Gender is required"; }
                break;
            case 'bloodgroup':
                if (!value) { valid = false; err = "Blood Group is required"; }
                break;
            default:
                break;
        }
        return { valid, err };
    };




    const sendData = (e) => {
        e.preventDefault();
        const p = JSON.parse(localStorage.getItem('loggedparent'));
       //var pid=JSON.stringify(p.pid);
        const formattedDob = new Date(child.dob.value).toISOString().split('T')[0];
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pid: p.pid,
                name: child.name.value,
                gender: child.gender.value,
                dob: formattedDob,
                bloodGroup: child.bloodgroup.value
            })
        };

        fetch("http://localhost:8080/savechild", reqOptions)
            .then(resp => {
                if (!resp.ok) {
                    return resp.json().then(error => {
                        throw new Error(JSON.stringify(error.message));
                    });
                }
                return resp.json();
            })
            .then(obj => {
                alert("Child Added");
                window.location.reload();
            })
            .catch((error) => {
                let errMsg = error.message.includes('Failed to fetch') ?
                    "Server is down, please try again later" :
                    error.message;
                dispatch({ type: 'setError', errorMsg: errMsg });
            });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Add Child</h3>

                            {child.errorMsg && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {child.errorMsg}
                                </div>
                            )}

                            <form onSubmit={sendData}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter Child's FirstName"
                                        value={child.name.value}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        onBlur={(e) => handleChange("name", e.target.value)}
                                    />
                                    {child.name.touch && !child.name.valid && (
                                        <small className="text-danger">
                                            {child.name.err}
                                        </small>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dob"
                                        max={today}
                                        value={child.dob.value}
                                        onChange={(e) => handleChange("dob", e.target.value)}
                                        onBlur={(e) => handleChange("dob", e.target.value)}
                                    />
                                    {child.dob.touch && !child.dob.valid && (
                                        <small className="text-danger">
                                            {child.dob.err}
                                        </small>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label>Gender</label><br />
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="male"
                                            name="gender"
                                            value="male"
                                            onChange={(e) => handleChange("gender", e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="male">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="female"
                                            name="gender"
                                            value="female"
                                            onChange={(e) => handleChange("gender", e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="female">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="other"
                                            name="gender"
                                            value="other"
                                            onChange={(e) => handleChange("gender", e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="other">Other</label>
                                    </div>
                                    {child.gender.touch && !child.gender.valid && (
                                        <small className="text-danger">
                                            {child.gender.err}
                                        </small>
                                    )}
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="bloodgroup">Blood Group</label>
                                    <select
                                        className="form-control"
                                        id="bloodgroup"
                                        value={child.bloodgroup.value}
                                        onChange={(e) => handleChange("bloodgroup", e.target.value)}
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    {child.bloodgroup.touch && !child.bloodgroup.valid && (
                                        <small className="text-danger">
                                            {child.bloodgroup.err}
                                        </small>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" disabled={!child.formValid}>
                                    Add Child
                                </button><span>     </span>
                                <button type="button" className="btn btn-secondary btn-block" onClick={() => dispatch({ type: 'reset' })}>
                                    Reset
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
