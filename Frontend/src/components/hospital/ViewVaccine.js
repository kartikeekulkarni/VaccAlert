import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewVaccine(){
    const [vaccines, setVaccines] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:8080/getallvaccines`)
      .then((resp)=>{
          return resp.json()})
      .then((data)=>{setVaccines(data); alert(JSON.stringify(data))})
      .catch(err=>console.log(err.toString()))
      
  },[])

    return (
        <div className='container'>
            <br/>
            <h2 className='text-center'>List Of Vaccines
            <Link to={"/hospitalhome"} class="btn btn-info mx-3 " >Go To Home</Link>
            </h2>
            <table className='table border shadow'>
                <thead className='thead-dark'>
                    <th>Vaccine Id</th>
                    <th>Vaccine Name</th>
                    <th>Vaccine Description</th>
                    <th>Route</th>
                    <th>Site</th>
                    <th>WhenToGive</th>
                </thead>
    
                <tbody>
                    {
                        vaccines.map(
                            vaccine =>
                            <tr key={vaccine.vid}>
                            <td>{vaccine.vid}</td>
                            <td>{vaccine.vaccineName}</td>
                            <td>{vaccine.description}</td>
                            <td>{vaccine.route}</td>
                            <td>{vaccine.site}</td>
                            <td>{vaccine.whenToGive}</td>
                            
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      )
}