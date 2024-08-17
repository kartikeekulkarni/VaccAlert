import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HospitalRegistration() {
    const init = {
        HospitalName: "",
        Email: "",
        Url: "",
        Contact: "",
        State: "",
        District: "",
        City: "",
        Area: "",
        Pincode: "",
        UserName: "",
        Password: "",
        ConfirmPassword: ""
    };

    const initErrors = {
        HospitalName: "",
        Email: "",
        Url: "",
        Contact: "",
        State: "",
        District: "",
        City: "",
        Area: "",
        Pincode: "",
        UserName: "",
        Password: "",
        ConfirmPassword: "",
        serverError: ""
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val };
            case 'init':
                return init;
            default:
                return state;
        }
    };

    const errorReducer = (state, action) => {
        switch (action.type) {
            case 'setError':
                return { ...state, [action.field]: action.error };
            case 'setServerError':
                return { ...state, serverError: action.error };
            case 'reset':
                return initErrors;
            default:
                return state;
        }
    };

    const [formData, dispatch] = useReducer(reducer, init);
    const [formErrors, dispatchError] = useReducer(errorReducer, initErrors);
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch("https://localhost:7131/api/UserLogin/GetAllState");
                if (!response.ok) {
                    throw new Error('Failed to fetch states');
                }
                const data = await response.json();
                setStates(data);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };

        fetchStates();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedState) {
                try {
                    const response = await fetch(`https://localhost:7131/api/UserLogin/GetAllDistrict/?sid=${selectedState}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch districts');
                    }
                    const data = await response.json();
                    setDistricts(data);
                    setCities([]); // Clear cities when state changes
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            }
        };

        fetchDistricts();
    }, [selectedState]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedDistrict) {
                try {
                    const response = await fetch(`https://localhost:7131/api/UserLogin/GetAllCities?did=${selectedDistrict}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch cities');
                    }
                    const data = await response.json();
                    setCities(data);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            }
        };

        fetchCities();
    }, [selectedDistrict]);

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            // Field validation cases here
            case "HospitalName":
                if (!value) error = "Hospital Name is required";
                else if (value.length < 2) error = "Hospital Name must be at least 2 characters";
                break;
            case "Email":
                if (!value) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Email address is invalid";
                break;
            case "Url":
                if (!value) error = "URL is required";
                else if (!/^(http:\/\/|https:\/\/)/.test(value)) error = "Invalid URL";
                break;
            case "Contact":
                if (!value) error = "Contact is required";
                else if (!/^\d{10}$/.test(value)) error = "Contact must be exactly 10 digits";
                break;
            case "State":
                if (!value) error = "State is required";
                break;
            case "District":
                if (!value) error = "District is required";
                break;
            case "City":
                if (!value) error = "City is required";
                break;
            case "Area":
                if (!value) error = "Area is required";
                break;
            case "Pincode":
                if (!value) error = "Pincode is required";
                else if (!/^\d{6}$/.test(value)) error = "Pincode must be exactly 6 digits";
                break;
            case "UserName":
                if (!value) error = "Username is required";
                else if (value.length < 2) error = "Username must be at least 2 characters long";
                break;
            case "Password":
                if (!value) {
                    error = "Password is required";
                } else if (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!#@$%^&])[A-Za-z0-9!@#$%^&]{8,20}$/.test(value)) {
                    error = "Password must be 8-20 characters long and contain at least one capital letter, one number, and one special symbol";
                }
                break;
            case "ConfirmPassword":
                if (!value) error = "Confirm Password is required";
                else if (value !== formData.Password) error = "Passwords do not match";
                break;
            default:
                break;
        }

        dispatchError({ type: 'setError', field: name, error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasErrors = false;
        Object.keys(formData).forEach(field => {
            validateField(field, formData[field]);
            if (formErrors[field]) {
                hasErrors = true;
            }
        });

        if (hasErrors) {
            
            dispatchError({ type: 'setServerError', error:'Please fix errors before submitting' });
            return;
        }

        const dataToSend = {
            hname: formData.HospitalName,
            email: formData.Email,
            url: formData.Url,
            contact: formData.Contact,
            hadressNavigation: {
                state: formData.State,
                district: formData.District,
                city: formData.City,
                pincode: formData.Pincode,
                area: formData.Area
            },
            uidNavigation: {
                uname: formData.UserName,
                password: formData.Password,
                rid: "2"  // Assuming a fixed value for 'rid'
            }
        };

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };

        fetch('https://localhost:7131/api/Registration/RegisterHospital', reqdata)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.message || 'server error');
                    });
                }
                return response.json();
            })
            .then(data => {
                alert("Registration Successful");
                console.log('Success:', data);
                navigate("/login");
            })
            .catch(error => {
                dispatchError({ type: 'setServerError', error: error.message });
            });
    };

    const handleReset = () => {
        dispatch({ type: 'init' });
        dispatchError({ type: 'reset' });
    };

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    return (
        <div className="reg reg-container">
            <div className="content">
                <form className="container" onSubmit={handleSubmit}>
                    <h1 className="text-center">Register Hospital</h1>
                    {formErrors.serverError && <div className="alert alert-danger">{formErrors.serverError}</div>}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Hospital Name" name="HospitalName"
                                    value={formData.HospitalName}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'HospitalName', val: e.target.value });
                                        validateField('HospitalName', e.target.value);
                                    }}
                                />
                                {formErrors.HospitalName && <small className="text-danger">{formErrors.HospitalName}</small>}
                            </div><br/>

                            

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Hospital URL" name="Url"
                                    value={formData.Url}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'Url', val: e.target.value });
                                        validateField('Url', e.target.value);
                                    }}
                                />
                                {formErrors.Url && <small className="text-danger">{formErrors.Url}</small>}
                            </div><br/>

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Contact" name="Contact"
                                    value={formData.Contact}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'Contact', val: e.target.value });
                                        validateField('Contact', e.target.value);
                                    }}
                                />
                                {formErrors.Contact && <small className="text-danger">{formErrors.Contact}</small>}
                            </div><br/>

                            <div className="form-group">
                                <select className="form-control" name="State" value={formData.State}
                                    onChange={(e) => {
                                        setSelectedState(e.target.value);
                                        dispatch({ type: 'update', fld: 'State', val: e.target.value });
                                        validateField('State', e.target.value);
                                    }}
                                >
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option key={state.sid} value={state.sid}>{state.sname}</option>
                                    ))}
                                </select>
                                {formErrors.State && <small className="text-danger">{formErrors.State}</small>}
                            </div><br/>

                            <div className="form-group">
                                <select className="form-control" name="District" value={formData.District}
                                    onChange={(e) => {
                                        setSelectedDistrict(e.target.value);
                                        dispatch({ type: 'update', fld: 'District', val: e.target.value });
                                        validateField('District', e.target.value);
                                    }}
                                    disabled={!selectedState}
                                >
                                    <option value="">Select District</option>
                                    {districts.map(district => (
                                        <option key={district.did} value={district.did}>{district.dname}</option>
                                    ))}
                                </select>
                                {formErrors.District && <small className="text-danger">{formErrors.District}</small>}
                            </div><br/>

                            <div className="form-group">
                                <select className="form-control" name="City" value={formData.City}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'City', val: e.target.value });
                                        validateField('City', e.target.value);
                                    }}
                                    disabled={!selectedDistrict}
                                >
                                    <option value="">Select City</option>
                                    {cities.map(city => (
                                        <option key={city.cityid} value={city.cityid}>{city.cityname}</option>
                                    ))}
                                </select>
                                {formErrors.City && <small className="text-danger">{formErrors.City}</small>}
                            </div>
                        </div>

                        <div className="col-md-6">

                        <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Email" name="Email"
                                    value={formData.Email}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'Email', val: e.target.value });
                                        validateField('Email', e.target.value);
                                    }}
                                />
                                {formErrors.Email && <small className="text-danger">{formErrors.Email}</small>}
                            </div><br/>

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Area" name="Area"
                                    value={formData.Area}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'Area', val: e.target.value });
                                        validateField('Area', e.target.value);
                                    }}
                                />
                                {formErrors.Area && <small className="text-danger">{formErrors.Area}</small>}
                            </div><br/>

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Pincode" name="Pincode"
                                    value={formData.Pincode}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'Pincode', val: e.target.value });
                                        validateField('Pincode', e.target.value);
                                    }}
                                />
                                {formErrors.Pincode && <small className="text-danger">{formErrors.Pincode}</small>}
                            </div><br/>

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Username" name="UserName"
                                    value={formData.UserName}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'UserName', val: e.target.value });
                                        validateField('UserName', e.target.value);
                                    }}
                                />
                                {formErrors.UserName && <small className="text-danger">{formErrors.UserName}</small>}
                            </div><br/>

                            <div className="form-group">
                                <input type={passwordType} className="form-control" placeholder="Enter Password" name="Password"
                                    value={formData.Password}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'Password', val: e.target.value });
                                        validateField('Password', e.target.value);
                                    }}
                                />
                                {formErrors.Password && <small className="text-danger">{formErrors.Password}</small>}
                            </div><br/>

                            <div className="form-group">
                                <input type={passwordType} className="form-control" placeholder="Confirm Password" name="ConfirmPassword"
                                    value={formData.ConfirmPassword}
                                    onChange={(e) => {
                                        dispatch({ type: 'update', fld: 'ConfirmPassword', val: e.target.value });
                                        validateField('ConfirmPassword', e.target.value);
                                    }}
                                />
                                {formErrors.ConfirmPassword && <small className="text-danger">{formErrors.ConfirmPassword}</small>}
                            </div>

                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" onClick={togglePassword} />
                                <label className="form-check-label"><b>Show Password</b></label>
                            </div>

                            
                        </div>
                    </div><br/>
                    <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary">Submit</button><span>   </span>
                                <button type="button" className="btn btn-secondary ml-2" onClick={handleReset}>Reset</button>
                            </div>
                </form>
            </div>
        </div>
    );
}

export default HospitalRegistration;
