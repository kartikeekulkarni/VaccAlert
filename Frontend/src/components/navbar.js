
// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VaccineLogo from '../images/vaccalert.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const mystate = useSelector((state) => state.logged);

  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };


  return (
  <div style={{ display: mystate.loggedIn ? "none" : "block" }}>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                 <img src={VaccineLogo} className="logo-image"></img>
               </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className='navbar-nav'>
         <li className="nav-item">
              <Link to="/home" className="nav-link navbar-nav">
                Home
              </Link>
            </li>
            </ul>
          <ul className="navbar-nav ms-auto">
           
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link">
                Contact Us
              </Link>
            </li>
            <li className="nav-item dropdown" onMouseEnter={handleDropdown} onMouseLeave={handleDropdown }>
              <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={dropdown}>
                Register
              </div>
                 <ul className={`dropdown-menu ${dropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                      <li>
                        <Link to="/parent-registration" className="dropdown-item">
                           Parent Registration
                        </Link>
                     </li>
                     <li>
                     <Link to="/hospital-registration" className="dropdown-item">
                          Hospital Registration
                     </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            
           
           
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
