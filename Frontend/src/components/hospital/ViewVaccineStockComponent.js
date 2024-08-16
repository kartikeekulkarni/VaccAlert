import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewVaccineStockComponent() {
    const [vaccines, setVaccines] = useState([]);
    const user = JSON.parse(localStorage.getItem('loggedUser'));

    useEffect(() => {
        fetch(`http://localhost:8080/getvaccinesstock?hid=${user.userdb.hospitals[0].hid}`)
            .then((resp) => resp.json())
            .then((data) => {
                setVaccines(data);
                // alert(JSON.stringify(data));
            })
            .catch(err => console.log(err.toString()));
    }, [user.userdb.hospitals]);

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card shadow-lg" style={{ maxWidth: '800px', width: '100%' }}>
                <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                    <h2 className="text-center mb-0">List Of Vaccines</h2>
                    <Link to="../home" className="btn btn-light">Go To Home</Link>
                </div>
                <div className="card-body">
                    {vaccines.length === 0 ? (
                        <p className="text-center">No Vaccines found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-striped table-bordered text-center">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Id</th>
                                        <th>Vaccine Name</th>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vaccines.map(vac => (
                                        <tr key={vac.vsid}>
                                            <td>{vac.vsid}</td>
                                            <td className="text-truncate" style={{ maxWidth: '50px' }}>{vac.vaccine.vaccineName}</td>
                                            <td>{vac.stock}</td>
                                            <td className="text-center">
                                                <Link
                                                    className="btn btn-outline-primary btn-sm"
                                                    to={`../updatevaccinestock`}
                                                    state={{ vsid: vac.vsid, initialStock: vac.stock, vaccineName: vac.vaccine.vaccineName }}>
                                                    Update Stock
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
