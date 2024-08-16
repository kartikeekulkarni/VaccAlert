import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Alert, Container, Row, Col, Form as BootstrapForm } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ParentRegistrationForm = () => {
    const [status, setStatus] = useState(null);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch("https://localhost:7131/api/UserLogin/GetAllState");
                if (!response.ok) throw new Error('Failed to fetch states');
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
                    if (!response.ok) throw new Error('Failed to fetch districts');
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
                    if (!response.ok) throw new Error('Failed to fetch cities');
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

        if (!values.fname) errors.fname = 'First name is required';
        else if (!/^[^\s]+$/.test(values.fname)) errors.fname = 'space not allow';
        if (!values.lname) errors.lname = 'Last name is required';
        else if (!/^[^\s]+$/.test(values.lname)) errors.lname = 'space not allow';
        if (!values.contact) errors.contact = 'Contact number is required';
        else if (!/^\d{10}$/.test(values.contact)) errors.contact = 'Contact number must be 10 digits only';
        if (!values.email) errors.email = 'Email is required';
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) errors.email = 'Invalid email address';
        if (!values.paddress?.state) errors.paddress = { ...errors.paddress, state: 'State is required' };
        if (!values.paddress?.district) errors.paddress = { ...errors.paddress, district: 'District is required' };
        if (!values.paddress?.city) errors.paddress = { ...errors.paddress, city: 'City is required' };
        if (!values.paddress?.pincode) errors.paddress = { ...errors.paddress, pincode: 'Pincode is required' };
        if (!values.paddress?.area) errors.paddress = { ...errors.paddress, area: 'Area is required' };
        if (!values.uname) errors.uname = 'Username is required';
        else if (!/^[^\s]+$/.test(values.uname)) errors.uname = 'space not allow';
        else if (values.uname.length < 2) errors.uname = 'Username must be at least 2 characters long';
        if (!values.password) errors.password = 'Password is required';
        else if (!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!#@$%^&])[A-Za-z0-9!@#$%^&]{8,20}$/.test(values.password)) errors.password = 'Password must be 8-20 characters long and contain at least one capital letter, one small letter, and one special symbol';
        if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords must match';

        return errors;
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await registerParent(values);
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
            headers: { 'Content-Type': 'application/json' },
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
                },
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
        alert('Registration successful!');
        resetForm();
        navigate('/login');
    };

    const handleError = (error) => {
        console.error('Registration failed:', error.message);
        setStatus({ success: false, message: error.message });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <div className="reg reg-container p-4">
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
                                    area: ''
                                },
                                uname: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            validate={validate}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, isSubmitting, resetForm }) => (
                                <Form>
                                    <h1 className='text-center'>Register Parent</h1><br/>
                                    {status && (
                            <Alert variant={status.success ? 'success' : 'danger'} className="mt-3">
                                {status.message}
                            </Alert>
                        )}
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    name="fname"
                                                    className="form-control"
                                                    placeholder="First Name"
                                                />
                                                <ErrorMessage name="fname" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    name="lname"
                                                    className="form-control"
                                                    placeholder="Last Name"
                                                />
                                                <ErrorMessage name="lname" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    name="contact"
                                                    className="form-control"
                                                    placeholder="Contact"
                                                />
                                                <ErrorMessage name="contact" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="form-group">
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
                                    </div><br/>
                                    <div className="form-group">
                                        <Field
                                            as="select"
                                            name="paddress.district"
                                            className="form-control"
                                            onChange={(e) => {
                                                const district = e.target.value;
                                                setFieldValue('paddress.district', district);
                                                setSelectedDistrict(district);
                                                setFieldValue('paddress.city', ''); // Clear city when district changes
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
                                    </div><br/>
                                    <div className="form-group">
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
                                    </div><br/>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    name="paddress.pincode"
                                                    className="form-control"
                                                    placeholder="Pincode"
                                                />
                                                <ErrorMessage name="paddress.pincode" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    name="paddress.area"
                                                    className="form-control"
                                                    placeholder="Area"
                                                />
                                                <ErrorMessage name="paddress.area" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                    <div className="form-group">
                                        <Field
                                            type="text"
                                            name="uname"
                                            className="form-control"
                                            placeholder="Username"
                                        />
                                        <ErrorMessage name="uname" component="div" className="text-danger" />
                                    </div></Col>
                                        <Col md={6}>
                                    <div className="form-group">
                                        <Field
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div></Col>
                                    </Row>
                                    <div className="form-group">
                                        <Field
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="btn btn-secondary mt-1"
                                        >
                                            {showConfirmPassword ? 'Hide Password' : 'Show Password'}
                                        </Button>
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                    </div><br/>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting}
                                    >
                                        Register
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => resetForm()}
                                        variant="secondary"
                                        className="ms-2"
                                    >
                                        Clear
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
