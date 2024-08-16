import { useEffect } from "react"
import { Link } from "react-router-dom"
export default function ParentHome(){
    
    // useEffect(()=>{
    //     uid=JSON.parse(localStorage.getItem("loggedUser")).uid
    // },[])

    return (
        <div >
        <div className='container mt-5'>
          <div className='row'>
              <div className='col-md-3'>
                  <div className='card text-center'>
              <div className='card-header  text-white'style={{backgroundColor:"#20c997"}}>
                  <div className='row align-items-center'>
                      <div className='col'>
                         <h3>Book Vaccine</h3>
                      </div>

                  </div>
              </div> 
              <div className='card-footer'>
                  <Link to={'../bookvaccine'}>Book</Link>
              </div>
              </div>
              </div>               
              
              <div className='col-md-3' >
                  <div className='card text-center '>
              <div className='card-header text-white' style={{backgroundColor:"#2F4F4F"}}>
                  <div className='row align-items-center'>
                      <div className='col'>
                         <h3>Add Child</h3>
                      </div> 
                  </div>
              </div>
              <div className='card-footer'>
                  <Link to={'../addchild'} >Add</Link>
              </div>
              </div>
              </div>

             
              <div className='col-md-3'>
                  <div className='card text-center '>
              <div className='card-header bg-primary text-white'>
                  <div className='row align-items-center'>
                      <div className='col'>
                         <h3>Schedule</h3>
                      </div>
                     
                  </div>
              </div>
              <div className='card-footer'>
                  <Link to={'../viewschedule'}>View Schedule</Link>
              </div>
              </div>
              </div>

              <div className='col-md-3'>
                  <div className='card text-center'>
              <div className='card-header  text-white'style={{backgroundColor:"#20c997"}}>
                  <div className='row align-items-center'>
                      <div className='col'>
                         <h3>View Vaccines</h3>

                      </div>

                  </div>
              </div> 
              <div className='card-footer'>
                  <Link to={'../viewvaccine'}>View Details</Link>
              </div>
              </div>
              </div>  

              <div className='col-md-3'>
                  <div className='card text-center'>
              <div className='card-header  text-white'style={{backgroundColor:"#20c997"}}>
                  <div className='row align-items-center'>
                      <div className='col'>
                         <h3>Booking List</h3>

                      </div>

                  </div>
              </div> 
              <div className='card-footer'>
                  <Link to={'../bookinglist'}>View Details</Link>
              </div>
              </div>
              </div>  

              
             
          </div>
      </div>
      </div>
    )
}