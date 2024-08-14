import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewVaccineStockComponent(){
    const [vaccines, setVaccines] = useState([]);
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    useEffect(()=>{
        fetch(`http://localhost:8080/getvaccinesstock?hid=${user.userdb.hospitals[0].hid}`)
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
            {vaccines.length === 0 ? (
                    <p>No Vaccines found.</p>
                ) : (
            <table className='table border shadow'>
                <thead className='thead-dark'>
                    <th>Id</th>
                    <th>Vaccine Name</th>
                    <th>Stock</th>
                    <th>Action</th>
                </thead>
    
                <tbody>
                    {
                        vaccines.map(
                            vac =>
                            <tr key={vac.vsid}>
                            <td>{vac.vsid}</td>
                            <td>{vac.vaccine.vaccineName}</td>
                            <td>{vac.stock}</td>
                            <td>                                       
                                        <Link class="btn btn-outline-primary mx-2" to={`../updatevaccinestock`} state={{ vsid: vac.vsid, initialStock: vac.stock, vaccineName: vac.vaccine.vaccineName }}>
                                            Update Stock
                                        </Link>      
                             </td>
                           
                            
                            </tr>
                        )
                    }
                </tbody>
            </table>)}
        </div>
      )
}