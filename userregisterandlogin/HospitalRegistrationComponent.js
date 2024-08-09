import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const init = {
    hname: "",
    email: "",
    url: "",
    contact: "",
    state_id: "",
    district_id: "",
    city_id: "",
    pincode: "",
    uname: "",
    password: "",
    confirmPassword: ""
};

const validate = (values) => {
    const errors = {};
    // Add your validation logic here
    return errors;
};

const RegistrationForm = ({ apiUrl, navigateTo }) => {
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setter(data);
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
            }
        };

        fetchData("https://localhost:7060/api/UserLogin/GetAllState", setStates);
        if (selectedState) fetchData(`https://localhost:7060/api/UserLogin/GetAllDistrict/?sid=${selectedState}`, setDistricts);
        if (selectedDistrict) fetchData(`https://localhost:7060/api/UserLogin/GetAllCities?did=${selectedDistrict}`, setCities);
    }, [selectedState, selectedDistrict]);

    const handleSubmit = async (values, { setSubmitting }) => {
        const dataToSend = {
            hid: 0, 
            uid: 2, 
            hname: values.hname,
            email: values.email,
            url: values.url,
            hadress: 1, 
            contact: values.contact,
            status: false, 
            uidNavigation: {
                uname: values.uname,
                password: values.password
            },
            hadressNavigation: {
                adid: 0, 
                state: values.state_id,
                district: values.district_id,
                city: values.city_id,
                pincode: values.pincode,
                addressline1: values.addressline1
            }
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
    
            if (!response.ok) throw new Error('Registration failed');
    
            const data = await response.json();
            setStatus({ success: true, message: "Your details are sent for verification" });
            navigate(navigateTo);
        } catch (error) {
            setStatus({ success: false, message: `Registration failed: ${error.message}` });
            console.error('Error:', error);
        }
    
        setSubmitting(false);
    };

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <div className="card p-4 shadow-sm" style={{ borderRadius: '15px', border: 'none' }}>
                        <Formik
                            initialValues={init}
                            validate={validate}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, isSubmitting }) => (
                                <Form>
                                    <div className="text-center mb-4">
                                        <h2>Register Hospital</h2>
                                    </div>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="hname">Hospital Name</label>
                                                <Field type="text" name="hname" className="form-control" />
                                                <ErrorMessage name="hname" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="contact">Contact</label>
                                                <Field type="text" name="contact" className="form-control" />
                                                <ErrorMessage name="contact" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Field type="email" name="email" className="form-control" />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="url">Website URL</label>
                                                <Field type="text" name="url" className="form-control" />
                                                <ErrorMessage name="url" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={4}>
                                            <div className="form-group">
                                                <label htmlFor="state_id">State</label>
                                                <Field as="select" name="state_id" className="form-control" onChange={(e) => {
                                                    setFieldValue('state_id', e.target.value);
                                                    setSelectedState(e.target.value);
                                                }}>
                                                    <option value="">Select State</option>
                                                    {states.map(state => (
                                                        <option key={state.sid} value={state.sid}>{state.sname}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="state_id" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="form-group">
                                                <label htmlFor="district_id">District</label>
                                                <Field as="select" name="district_id" className="form-control" onChange={(e) => {
                                                    setFieldValue('district_id', e.target.value);
                                                    setSelectedDistrict(e.target.value);
                                                }}>
                                                    <option value="">Select District</option>
                                                    {districts.map(district => (
                                                        <option key={district.did} value={district.did}>{district.dname}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="district_id" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="form-group">
                                                <label htmlFor="city_id">City</label>
                                                <Field as="select" name="city_id" className="form-control" onChange={(e) => {
                                                    setFieldValue('city_id', e.target.value);
                                                }}>
                                                    <option value="">Select City</option>
                                                    {cities.map(city => (
                                                        <option key={city.cityid} value={city.cityid}>{city.cityname}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="city_id" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="pincode">Pincode</label>
                                                <Field type="text" name="pincode" className="form-control" />
                                                <ErrorMessage name="pincode" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="uname">Username</label>
                                                <Field type="text" name="uname" className="form-control" />
                                                <ErrorMessage name="uname" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Field type={passwordType} name="password" className="form-control" />
                                                <button type="button" onClick={togglePassword} className="btn btn-link">Show/Hide</button>
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <Field type={passwordType} name="confirmPassword" className="form-control" />
                                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="text-center">
                                        <Col>
                                            <Button type="submit" disabled={isSubmitting} variant="primary">Register</Button>
                                            <Button variant="secondary" onClick={handleBackToHome} className="ml-2">Back to Home</Button>
                                        </Col>
                                    </Row>
                                    {status && <div className={`alert mt-4 ${status.success ? 'alert-success' : 'alert-danger'}`} role="alert">
                                        {status.message}
                                    </div>}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationForm;
