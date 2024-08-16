import { Link } from "react-router-dom"
export default function AdminHome(){

    return (
        <div >
        <div className='container mt-5'>
          <div className='row'>
              <div className='col-md-3'>
                  <div className='card text-center'>
              <div className='card-header  text-white'style={{backgroundColor:"#20c997"}}>
                  <div className='row align-items-center'>
                      <div className='col'>
                         <h3>Approve Hospital</h3>
                      </div>

                  </div>
              </div> 
              <div className='card-footer'>
                  <Link to={'../approvehospital'}>View Details</Link>
              </div>
              </div>
              </div>               
              
              <div className='col-md-3' >
                  <div className='card text-center '>
              <div className='card-header text-white' style={{backgroundColor:"#2F4F4F"}}>
                  <div className='row align-items-center'>
                      <div className='col'>
                         <h3>View Hospitals</h3>

                      </div>
                     
                  </div>
              </div>
              <div className='card-footer'>
                  <Link to={'../viewhospitals'} >View Details</Link>
              </div>
              </div>
              </div>

             
              <div className='col-md-3'>
                  <div className='card text-center '>
              <div className='card-header bg-primary text-white'>
                  <div className='row align-items-center'>
                      <div className='col'>
                         <h3>View Benificairies</h3>
                      </div>
                     
                  </div>
              </div>
              <div className='card-footer'>
                  <Link to={'../viewparents'}>View Details</Link>
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
                         <h3>Add Vaccines</h3>

                      </div>

                  </div>
              </div> 
              <div className='card-footer'>
                  <Link to={'../addvaccines'}>View Details</Link>
              </div>
              </div>
              </div>  

              
             
          </div>
      </div>
      </div>
    )
}