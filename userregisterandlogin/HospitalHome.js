import { Link, useNavigate } from "react-router-dom";

export default function HospitalHome() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="viewAppointments" className="nav-link px-3">View Appointments</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="viewVaccineStock" className="nav-link px-3">View Vaccine Stock</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link px-3 btn btn-link">Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <h1>Hospital Home</h1>
        </div>
    );
}
