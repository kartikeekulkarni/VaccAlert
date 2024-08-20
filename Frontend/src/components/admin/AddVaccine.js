import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

const AddVaccineForm = () => {
    const [formMessage, setFormMessage] = useState(null);

    const validate = values => {
        const errors = {};

        if (!values.vaccineName) {
            errors.vaccineName = 'Vaccine Name is required';
        }

        if (!values.description) {
            errors.description = 'Description is required';
        }

        if (!values.dose) {
            errors.dose = 'Dose is required';
        }

        if (!values.route) {
            errors.route = 'Route is required';
        }

        if (!values.site) {
            errors.site = 'Site is required';
        }

        if (!values.whenToGive) {
            errors.whenToGive = 'When to Give is required';
        }

        if (!values.weeks) {
            errors.weeks = 'Weeks is required';
        } else if (values.weeks <= 0) {
            errors.weeks = 'Weeks must be a positive number';
        }

        return errors;
    };

    const handleSubmit = (values, { setSubmitting }) => {
        fetch('http://localhost:8080/savevaccine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                setFormMessage({ type: 'success', text: 'Vaccine added successfully!' });
                setSubmitting(false);
            })
            .catch(error => {
                setFormMessage({ type: 'error', text: 'There was an error adding the vaccine!' });
                setSubmitting(false);
            });
    };

    return (
        <div className="container my-4">
            <div className="card p-4 shadow-sm" style={{ borderRadius: '15px', border: 'none' }}>
                <Formik
                    initialValues={{
                        vaccineName: '',
                        description: '',
                        dose: '',
                        route: '',
                        site: '',
                        whenToGive: '',
                        weeks: '',
                    }}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="text-center mb-4">
                                <h2>Add Vaccine</h2>
                            </div>
                            <div className="mb-3 text-center">
                                <Link to="../home" className="btn btn-outline-primary">Back to Home</Link>
                            </div>
                            {formMessage && (
                                <div className={`alert ${formMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                                    {formMessage.text}
                                </div>
                            )}
                            <div className="form-group mb-3">
                                <label htmlFor="vaccineName">Vaccine Name</label>
                                <Field
                                    type="text"
                                    name="vaccineName"
                                    className="form-control"
                                />
                                <ErrorMessage name="vaccineName" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="description">Description</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    className="form-control"
                                />
                                <ErrorMessage name="description" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="dose">Dose</label>
                                <Field
                                    type="text"
                                    name="dose"
                                    className="form-control"
                                />
                                <ErrorMessage name="dose" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="route">Route</label>
                                <Field
                                    type="text"
                                    name="route"
                                    className="form-control"
                                />
                                <ErrorMessage name="route" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="site">Site</label>
                                <Field
                                    type="text"
                                    name="site"
                                    className="form-control"
                                />
                                <ErrorMessage name="site" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="whenToGive">When to Give</label>
                                <Field
                                    type="text"
                                    name="whenToGive"
                                    className="form-control"
                                />
                                <ErrorMessage name="whenToGive" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="weeks">Weeks</label>
                                <Field
                                    type="number"
                                    name="weeks"
                                    className="form-control"
                                />
                                <ErrorMessage name="weeks" component="div" className="text-danger mt-1" />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    Add Vaccine
                                </button>
                                <button type="reset" className="btn btn-secondary">
                                    Reset
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddVaccineForm;
