import { Link } from "react-router-dom";
import VaccineLogo from '../../images/vaccalert.png'
export default function ParentNavbar(){

  return (
  <div>
    <nav className="navbar navbar-expand-sm bg-light mb-3">
        
      <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                 <img src={VaccineLogo} className="logo-image"></img>
               </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
         <ul className='navbar-nav'>
          <li className="nav-item">
              <Link to="home" className="nav-link navbar-nav">
                Home
              </Link>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto">  
        <li className="nav-item">
              <Link to="about-vaccination" className="nav-link">
                About Vaccination
              </Link>
            </li>
            <li className="nav-item">
              <Link to="childinfo" className="nav-link">
                ChildInfo
              </Link>
            </li>
            <li className="nav-item">
              <Link to="about-us" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="contact-us" className="nav-link">
                Contact Us
              </Link>
            </li>
            
            <li className="nav-item">
                  <Link to={"profile"} className="nav-link">
                   Profile
                  </Link>
              </li>
              
         
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                <button className="btn btn-primary btn-sm">Logout</button>
              </Link>
            </li>
          </ul>
          </div>
        </div>
      </nav>
  </div>
  );
}