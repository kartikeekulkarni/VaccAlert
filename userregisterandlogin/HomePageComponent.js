import React from 'react';
import { useNavigate } from 'react-router-dom';
import VaccineLogo from '../images/vaccalert.png';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePageComponent() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard'); // Redirect to a new page with navbar
    };

    return (
        <div>
            {/* Header Section without Navbar */}
            <section id='header' className='d-flex align-items-center' style={{ padding: '50px 0' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 d-flex justify-content-center flex-column'>
                            <h1 className='mb-4'>
                                Get Your Vaccine Here with <strong style={{ color: "darkblue" }}>VaccAlert</strong>
                            </h1>
                            <hr style={{ color: "black" }} />
                            <h5 className='my-3'>
                                <strong>Vaccine Available On VaccAlert</strong>
                            </h5>
                            <p>
                                Vaccines under the VaccAlert Program include BCG, OPV, Hepatitis B Vaccine, Pentavalent Vaccine,
                                Rotavirus Vaccine, Pneumococcal, Polio, Influenza, Varicella Vaccines for infants and children.
                            </p>
                            <div className='mt-3'>
                                <Button variant="warning" onClick={handleGetStarted}>Get Started</Button>
                            </div>
                        </div>
                        <div className='col-md-6 d-flex justify-content-center'>
                            {/* Optional: Add an image or additional content here */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
