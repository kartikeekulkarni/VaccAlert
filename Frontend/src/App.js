import logo from './logo.svg';
import './App.css';
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
import Navbar from './components/navbar';
import Hospital from './components/hospital/Hospital';
import AboutUsPage from './components/AboutUsPage';
import ContactPageComponent from './components/ContactUs';
import Admin from './components/admin/Admin';
import ApproveHospital from './components/admin/ApproveHospital';
import ViewHospitals from './components/admin/ViewHospital';
import ViewParents from './components/admin/ViewParents';
import ViewVaccines from './components/admin/ViewVaccines';
import AddVaccineForm from './components/admin/AddVaccine';
import Parent from './components/parent/Parent';

function App() {

const mystate = useSelector((state)=>state.logged);

  return (
   
      //<div className="my-home">
      <div className="my-home">
          <Navbar  />
          <br/>
          <br/>

        <Routes>
          <Route path={"/"}  element={<Myhome/>}/>
          <Route path={"/home"}  element={<Myhome/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/logout'element={<Logout/>}/>
          <Route path='/register'element={<Register/>}/>
          <Route path='/about-us'element={<AboutUsPage/>}/>
          <Route path='/contact-us'element={<ContactPageComponent/>}/>

          <Route path='/parent-registration'element={<ParentRegister/>}/> 
          <Route path='/hospital-registration'element={<HospitalRegister/>}/>

          <Route path='/admin'element={<Admin/>}>
            <Route path='home'element={<AdminHome/>}/>
            <Route path='approvehospital'element={<ApproveHospital/>}/>
            <Route path='viewhospitals'element={<ViewHospitals/>}/>
            <Route path='viewparents'element={<ViewParents/>}/>
            <Route path='viewvaccine'element={<ViewVaccines/>}/>
            <Route path='addvaccines'element={<AddVaccineForm/>}/>
          </Route>

          <Route path='/parent'element={<Parent/>}>
            <Route path='home'element={<ParentHome/>}/>
            <Route path='approvehospital'element={<ApproveHospital/>}/>
            <Route path='viewhospitals'element={<ViewHospitals/>}/>
            <Route path='viewparents'element={<ViewParents/>}/>
            <Route path='viewvaccine'element={<ViewVaccines/>}/>
            <Route path='addvaccines'element={<AddVaccineForm/>}/>
            <Route path='about-us'element={<AboutUsPage/>}/>
            <Route path='contact-us'element={<ContactPageComponent/>}/>

          </Route>

          <Route path='/hospital'element={<Hospital/>}>
            <Route path='home'element={<HospitalHome/>}/>
            <Route path='view_appointments'element={<ViewAppointmentComponent/>}/>
            <Route path='view_vaccine'element={<ViewVaccine/>}/>
            <Route path='vaccine_stock'element={<ViewVaccineStock/>}/>
            <Route path='updatevaccinestock'element={<UpdateVaccineStock/>}/>
            <Route path='about-us'element={<AboutUsPage/>}/>
            <Route path='contact-us'element={<ContactPageComponent/>}/>
          </Route>
          
        </Routes>

      </div>
     
     
  );
}

export default App;
