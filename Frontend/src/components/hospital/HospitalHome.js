import { Link, Outlet } from "react-router-dom"
import VaccineLogo from '../../images/vaccalert.png'

export default function HospitalHome(){

    return (
        <div className="my-hospital">
            <nav className="navbar navbar-expand navbar-dark" style={{backgroundColor:"#4682B4",fontWeight:"bold"}}>
               <Link to="/" className="navbar-brand">
                 <img src={VaccineLogo} className="logo-image"></img>
               </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item" >
                <Link to="" className="nav-link">
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
                  <Link to={"profile"} className="nav-link">
                   Profile
                  </Link>
              </li>

              <li className="nav-item">
                <Link to={"/logout"} className="nav-link">
                  Logout
                </Link>
              </li>
            </div>

        </nav>
        
            {/* <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to="viewAppointments" className="nav-link px-3">View Appointments</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="viewVaccineStock" className="nav-link px-3">View Vaccine Stock</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/logout" className="nav-link px-3">Logout</Link>
                    </li>
                </ul>
                </div>
            </nav>
            <h1>Hospital Home</h1> */}

          <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-4 '>
                    <div className='card text-center'>
                <div className='card-header  text-white'style={{backgroundColor:"#20c997"}}>
                    <div className='row align-items-center'>
                        <div className='col'>
                           <h3>View AppointMents</h3>

                        </div>

                    </div>
                </div>

                
                <div className='card-footer'>
                    <Link to={'view_appointments'}>View Details</Link>
                </div>
                </div>
                </div>               
                
                <div className='col-md-4 ' >
                    <div className='card text-center '>
                <div className='card-header text-white' style={{backgroundColor:"#2F4F4F"}}>
                    <div className='row align-items-center'>
                        <div className='col'>
                           <h3>Vaccines</h3>

                        </div>
                       
                    </div>
                </div>
                <div className='card-footer'>
                    <Link to={'view_vaccine'} >View Details</Link>
                </div>
                </div>
                </div>

               
                <div className='col-md-4 '>
                    <div className='card text-center '>
                <div className='card-header bg-primary text-white'>
                    <div className='row align-items-center'>
                        <div className='col'>
                           <h3>Vaccine Stock</h3>

                        </div>
                       
                    </div>
                </div>
                <div className='card-footer'>
                    <Link to={'vaccine_stock'}>View Details</Link>
                </div>
                </div>
                </div>
               
            </div>
        </div>
        <Outlet/>
        </div>
        
    )
}