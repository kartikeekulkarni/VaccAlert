import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ParentRegistrationForm = () => {
    const [status, setStatus] = useState(null);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Fetch states on component mount
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

    // Fetch districts when a state is selected
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

    // Fetch cities when a district is selected
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

    const validate = (values) => {
        const errors = {};

        if (!values.fname) {
            errors.fname = 'First name is required';
        }
        if (!values.lname) {
            errors.lname = 'Last name is required';
        }
        if (!values.contact) {
            errors.contact = 'Contact number is required';
        } else if (!/^\d{10}$/.test(values.contact)) {
            errors.contact = 'Contact number must be 10 digits only';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.paddress?.state) {
            errors.paddress = { ...errors.paddress, state: 'State is required' };
        }
        if (!values.paddress?.district) {
            errors.paddress = { ...errors.paddress, district: 'District is required' };
        }
        if (!values.paddress?.city) {
            errors.paddress = { ...errors.paddress, city: 'City is required' };
        }
        if (!values.paddress?.pincode) {
            errors.paddress = { ...errors.paddress, pincode: 'Pincode is required' };
        }
        if (!values.paddress?.area) {
            errors.paddress = { ...errors.paddress, area: 'Pincode is required' };
        }
        if (!values.uname) {
            errors.uname = 'Username is required';
        }else if (values.uname.length < 2) errors.uname = "Username must be at least 2 characters long";
        if (!values.password) {
            errors.password = 'Password is required';
        }else if (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!#@$%^&])[A-Za-z0-9!@#$%^&]{8,20}$/.test(values.password)) {
            errors.password = "Password must be 6-20 characters long and contain at least one capital letter, one small letter, and one special symbol";
        }

        return errors;
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("Submitting", values);
        try {
            const response = await registerParent(values);
            console.log('Server response:', response);
            handleSuccess(resetForm);
        } catch (error) {
            handleError(error);
        } finally {
            setSubmitting(false);
        }
    };

    const registerParent = async (values) => {
         const response = await fetch("https://localhost:7131/api/Registration/RegisterParent", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname: values.fname,
                lname: values.lname,
                contact: values.contact,
                email: values.email,
                paddressNavigation: {
                    state: values.paddress.state,
                    district: values.paddress.district,
                    city: values.paddress.city,
                    pincode: values.paddress.pincode,
                    area: values.paddress.area
                }   ,
                uidNavigation: {
                    uname: values.uname,
                    password: values.password,
                    rid: 3  // Assuming a fixed value for 'rid'
                }
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed!');
        }
        return response.json();
    };

    const handleSuccess = (resetForm) => {
        setStatus({ success: true, message: 'Registration successful!' });
        alert("Registration successful!");
        resetForm();
        navigate("/login");
    };

    const handleError = (error) => {
        console.error('Registration failed:', error.message);
        setStatus({ success: false, message: error.message });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="card card-container">
                        <Formik
                            initialValues={{
                                fname: '',
                                lname: '',
                                contact: '',
                                email: '',
                                paddress: {
                                    state: '',
                                    district: '',
                                    city: '',
                                    pincode: '',
                                    area:''
                                },
                                uname: '',
                                password: ''
                            }}
                            validate={validate}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, isSubmitting }) => (
                                <Form>
                                    <div className="form-group">
                                        <h2>Register Parent</h2>
                                        <label htmlFor="fname">First Name</label>
                                        <Field type="text" name="fname" className="form-control" />
                                        <ErrorMessage name="fname" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lname">Last Name</label>
                                        <Field type="text" name="lname" className="form-control" />
                                        <ErrorMessage name="lname" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact">Contact</label>
                                        <Field type="text" name="contact" className="form-control" />
                                        <ErrorMessage name="contact" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field type="email" name="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="paddress.state">State</label>
                                        <Field
                                            as="select"
                                            name="paddress.state"
                                            className="form-control"
                                            onChange={(e) => {
                                                const state = e.target.value;
                                                setFieldValue('paddress.state', state);
                                                setSelectedState(state);
                                                setSelectedDistrict(''); // Clear district and city when state changes
                                                setFieldValue('paddress.district', '');
                                                setFieldValue('paddress.city', '');
                                            }}
                                        >
                                            <option value="">Select State</option>
                                            {states.map((state) => (
                                                <option key={state.sid} value={state.sid}>
                                                    {state.sname}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="paddress.state" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="paddress.district">District</label>
                                        <Field
                                            as="select"
                                            name="paddress.district"
                                            className="form-control"
                                            onChange={(e) => {
                                                const district = e.target.value;
                                                setFieldValue('paddress.district', district);
                                                setSelectedDistrict(district);
                                            }}
                                        >
                                            <option value="">Select District</option>
                                            {districts.map((district) => (
                                                <option key={district.did} value={district.did}>
                                                    {district.dname}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="paddress.district" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="paddress.city">City</label>
                                        <Field
                                            as="select"
                                            name="paddress.city"
                                            className="form-control"
                                        >
                                            <option value="">Select City</option>
                                            {cities.map((city) => (
                                                <option key={city.cityid} value={city.cityid}>
                                                    {city.cityname}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="paddress.city" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="paddress.area">Area</label>
                                        <Field type="text" name="paddress.area" className="form-control"/>
                                        <ErrorMessage name="paddress.area" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="paddress.pincode">Pincode</label>
                                        <Field type="text" name="paddress.pincode" className="form-control"/>
                                        <ErrorMessage name="paddress.pincode" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="uname">Username</label>
                                        <Field type="text" name="uname" className="form-control" />
                                        <ErrorMessage name="uname" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field type="password" name="password" className="form-control" />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>
                                    {status && (
                                        <Alert variant={status.success ? 'success' : 'danger'}>
                                            {status.message}
                                        </Alert>
                                    )}
                                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ParentRegistrationForm;
