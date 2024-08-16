import { Link } from "react-router-dom"


export default function HospitalHome(){

    return (
      <div >
          <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-4 px-3'>
                    <div className='card text-center '>
                <div className='card-header  text-white'style={{backgroundColor:"#20c997"}}>
                    <div className='row align-items-center'>
                        <div className='col'>
                           <h3>View Appointments</h3>

                        </div>

                    </div>
                </div> 
                <div className='card-footer'>
                    <Link to={'/hospital/view_appointments'}>View Details</Link>
                </div>
                </div>
                </div>               
                
                <div className='col-md-4 px-3' >
                    <div className='card text-center '>
                <div className='card-header text-white ' style={{backgroundColor:"#2F4F4F"}}>
                    <div className='row align-items-center'>
                        <div className='col'>
                           <h3>Vaccines</h3>

                        </div>
                       
                    </div>
                </div>
                <div className='card-footer'>
                    <Link to={'/hospital/view_vaccine'} >View Details</Link>
                </div>
                </div>
                </div>

               
                <div className='col-md-4 px-3'>
                    <div className='card text-center '>
                <div className='card-header bg-primary text-white'>
                    <div className='row align-items-center'>
                        <div className='col'>
                           <h3>Vaccine Stock</h3>

                        </div>
                       
                    </div>
                </div>
                <div className='card-footer'>
                    <Link to={'/hospital/vaccine_stock'}>View Details</Link>
                </div>
                </div>
                </div>
               
            </div>
        </div>
        </div>
        
    )
}