// src/components/SuccessPage.js
import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <Alert variant="success">
                <Alert.Heading>Registration Successful!</Alert.Heading>
                <p>You have successfully registered. Do you want to log in?</p>
                <Button variant="primary" onClick={() => navigate('/login')}>
                    Go to Login
                </Button>
            </Alert>
        </Container>
    );
};

export default SuccessPage;
