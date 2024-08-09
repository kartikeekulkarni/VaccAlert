import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminHome from './components/AdminHome';
import HospitalHome from './components/HospitalHome';
import ParentHome from './components/ParentHome';
import RegistrationComponent from './components/RegistrationComponent';
import HomePageComponent from './components/HomePageComponent';
import ParentRegistrationForm from './components/ParentRegistrationComponent';
import LoginPageComponent from './components/LoginPageComponent';
import HospitalRegistration from './components/HospitalRegistrationComponent';
import LogoutPageComponent from './components/LogoutPageComponent';
import SuccessPage from './components/SuccessPage';
import ApproveHospital from './components/ApproveHospitalComponent';
import { useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import DashboardPage from './components/DashboardPageComponent';
import AboutUsPage from './components/AboutUsPage';

function App() {
    const mystate = useSelector(state => state.logged.loggedIn);

    return (
        <div className="my-home">
            {!mystate && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePageComponent />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/register" element={<RegistrationComponent />} />
                <Route path="/parentregistration" element={<ParentRegistrationForm />} />
                <Route path="/hospitalregistration" element={<HospitalRegistration apiUrl="https://localhost:7060/api/Registration/RegisterHospital" />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/login" element={<LoginPageComponent />} />
                <Route path="/admin_home" element={<AdminHome />} />
                <Route path="/approveHospital" element={<ApproveHospital />} />
                <Route path="/parent_home" element={<ParentHome />} />
                <Route path="/hospital_home" element={<HospitalHome />} />
                <Route path="/logout" element={<LogoutPageComponent />} />
            </Routes>
        </div>
    );
}

export default App;
