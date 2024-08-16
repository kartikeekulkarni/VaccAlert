import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

const AddVaccineForm = () => {
    const handleSubmit = (values, { setSubmitting }) => {
        fetch('http://localhost:8080/savevaccine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response =>response.json())
            .then(data => {
                console.log('Vaccine added:', data);
                // Handle success (e.g., show a success message)
                setSubmitting(false);
                alert("Vaccine added successfully!");
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error adding the vaccine!', error);
                // Handle error (e.g., show an error message)
                setSubmitting(false);
            });
    };

    return (
        <div className="container my-5">
            <div className="card p-4 shadow-sm card-spacing" style={{ borderRadius: '15px', border: 'none' }}>
                <Formik
                    initialValues={{
                        vaccineName: '',
                        description: '',
                        dose: '',
                        route: '',
                        site: '',
                        whenToGive: '',
                        weeks: '' // Added weeks field here
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="text-center mb-4">
                                <h2>Add Vaccine</h2>
                            </div>
                            <div className="mb-3">
                <Link to="../home" className="btn btn-primary">Back to Home</Link>
            </div>
                            <div className="form-group">
                                <label htmlFor="vaccineName">Vaccine Name</label>
                                <Field
                                    type="text"
                                    name="vaccineName"
                                    className="form-control"
                                />
                                <ErrorMessage name="vaccineName" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    className="form-control"
                                />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dose">Dose</label>
                                <Field
                                    type="text"
                                    name="dose"
                                    className="form-control"
                                />
                                <ErrorMessage name="dose" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="route">Route</label>
                                <Field
                                    type="text"
                                    name="route"
                                    className="form-control"
                                />
                                <ErrorMessage name="route" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="site">Site</label>
                                <Field
                                    type="text"
                                    name="site"
                                    className="form-control"
                                />
                                <ErrorMessage name="site" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="whenToGive">When to Give</label>
                                <Field
                                    type="text"
                                    name="whenToGive"
                                    className="form-control"
                                />
                                <ErrorMessage name="whenToGive" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weeks">Weeks</label>
                                <Field
                                    type="number"
                                    name="weeks"
                                    className="form-control"
                                />
                                <ErrorMessage name="weeks" component="div" className="text-danger" />
                            </div><br/>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                Add Vaccine
                            </button><span>   </span>
                            <button type="reset" className="btn btn-primary">
                                Reset
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddVaccineForm;
