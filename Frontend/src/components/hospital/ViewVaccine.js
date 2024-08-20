import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewVaccine() {
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/getallvaccines`)
            .then((resp) => resp.json())
            .then((data) => {
                setVaccines(data);
                //alert(JSON.stringify(data));
            })
            .catch(err => console.log(err.toString()));
    }, []);

    return (
        <div className="container my-5">
            <div className="card shadow">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2 className="text-center">List Of Vaccines</h2>
                    <Link to="../home" className="btn btn-info">Go To Home</Link>
                </div>
                <div className="card-body">
                    <table className="table table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Vaccine Id</th>
                                <th>Vaccine Name</th>
                                <th>Vaccine Description</th>
                                <th>Route</th>
                                <th>Site</th>
                                <th>When To Give</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vaccines.map(vaccine => (
                                <tr key={vaccine.vid}>
                                    <td>{vaccine.vid}</td>
                                    <td>{vaccine.vaccineName}</td>
                                    <td>{vaccine.description}</td>
                                    <td>{vaccine.route}</td>
                                    <td>{vaccine.site}</td>
                                    <td>{vaccine.whenToGive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
