import logo from './logo.svg';
import './App.css';
import VaccineLogo from './images/vaccalert.png'
import { Link, Route, Routes } from 'react-router-dom';

import Myhome from './components/HomePageComponent';
import Login from './components/LoginPageComponent';
import Register from './components/RegistrationComponent';
import ParentRegister from './components/ParentRegistrationComponent';
import HospitalRegister from './components/HospitalRegistrationComponent';
import AdminHome from  './components/admin/AdminHome';
import ParentHome from  './components/parent/ParentHome';
import HospitalHome from  './components/hospital/HospitalHome';
import { useSelector } from 'react-redux';
import Logout from './components/LogoutPageComponent';
import ViewAppointmentComponent from './components/hospital/ViewAppointmentComponent';
import ViewVaccine from './components/hospital/ViewVaccine';
import ViewVaccineStock from './components/hospital/ViewVaccineStockComponent';
import UpdateVaccineStock from './components/hospital/UpdateVaccineStock';

function App() {

const mystate = useSelector((state)=>state.logged);

  return (
   
      <div className="my-home">
       <div style={{display:mystate.loggedIn?"none":"block"}}>
        <nav className="navbar navbar-expand navbar-dark container-fluid" style={{backgroundColor:"#4682B4",fontWeight:"bold"}}>
               <Link to="/" className="navbar-brand">
                 <img src={VaccineLogo} className="logo-image"></img>
               </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item" >
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            </div>

            <div className="navbar-nav" style={{marginLeft:"900px"}}>
             <li className="nav-item">
                <Link to={"/about-us"} className="nav-link">
                  About
                </Link>

              </li>

              <li className="nav-item">
                <Link to={"/contact-us"} className="nav-link">
                  Contact
                </Link>

              </li>

              <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>

        </nav>
        </div>

        <Routes>
          <Route path={"/"}  element={<Myhome/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/logout'element={<Logout/>}/>
          <Route path='/register'element={<Register/>}/>
          <Route path='/parentregistration'element={<ParentRegister/>}/> 
          <Route path='/hospitalregistration'element={<HospitalRegister/>}/>

          <Route path='/adminhome'element={<AdminHome/>}/>
          <Route path='/parenthome'element={<ParentHome/>}/>
          <Route path='/hospitalhome'element={<HospitalHome/>}>
            <Route path='view_appointments'element={<ViewAppointmentComponent/>}/>
            <Route path='view_vaccine'element={<ViewVaccine/>}/>
            <Route path='vaccine_stock'element={<ViewVaccineStock/>}/>
            <Route path='updatevaccinestock'element={<UpdateVaccineStock/>}/>
          </Route>
        </Routes>

      </div>
     
     
  );
}

export default App;
