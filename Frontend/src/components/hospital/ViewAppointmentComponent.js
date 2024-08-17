import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewAppointmentComponent (){
    const [appoints,setAppointments] = useState([]);


    const user = JSON.parse(localStorage.getItem('loggedUser'));
     
    useEffect(()=>{
          fetch(`http://localhost:8080/getappointments/${user.userdb.hospitals[0].hid}`)
        .then((resp)=>{
            return resp.json()})
        .then((data)=>{setAppointments(data); 
            //alert(JSON.stringify(data))
        })
        .catch(err=>console.log(err.toString()))
        
    },[]   )


    const updateBookingStatus = (bkid, newStatus) => {
        fetch(`http://localhost:8080/updatebookingstatus/${bkid}/${newStatus}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((resp) => {
            if (resp.ok) {
                setAppointments(prevState =>
                    prevState.map(booking =>
                        booking.bkid === bkid ? { ...booking, status: newStatus } : booking
                    )
                );
            } else {
                console.log('Failed to update status');
            }
        })
        .catch(err=>console.log(err.toString()))
    };

    return(
        <div className='container'>
            <br/>
            <h2 className='text-center'>Appointment List
            </h2>
            <br/>
            {appoints.length === 0 ? (
                    <h2>No Appointments found.</h2>
                ) : (
            <table className='table border shadow'>
                <thead className='thead-dark'>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Booking Date</th>
                    <th>Appointment Date</th>   
                    <th>Vaccine Name</th>
                    <th>Status</th>               
                    <th>Action</th>
                </thead>
               
                <tbody className='tbody-dark'>
                    {
                        appoints.map(
                            booking =>
                            <tr key={booking.bkid}>
                                <td>{booking.bkid}</td>
                                <td>{booking.child.name}</td>
                                <td>{booking.parent.fname}</td>
                                <td>{booking.parent.lname}</td>
                                <td>{booking.parent.email}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.vaccine.vaccineName}</td>
                                <td>{booking.status}</td>
                            <td>       

                            {booking.status === "Pending" && (<>
  
                                     <button class="btn btn-primary mx-2" onClick={() => updateBookingStatus(booking.bkid, "Confirmed")}>
                                        Confirmed
                                        </button>
                                      <button class="btn btn-danger mx-2" onClick={() => updateBookingStatus(booking.bkid, "Cancelled")} >
                                          Cancelled
                                        </button>
                                        </>
                                        )}
                                       
                            </td>
                            </tr>
                        )
                    }
                </tbody>

            </table>)}
            <Link to={"../home"} class="btn btn-info mx-3 " >Go To Home</Link>
        </div>
    )

}