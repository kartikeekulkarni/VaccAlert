import { Link, useNavigate } from "react-router-dom";

export default function ParentHome() {
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
                            <Link to="viewSchedule" className="nav-link px-3">View Schedule</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="bookAppointment" className="nav-link px-3">Book Appointment</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="nav-link px-3 btn btn-link">Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <h1>Parent Home</h1>
        </div>
    );
}
