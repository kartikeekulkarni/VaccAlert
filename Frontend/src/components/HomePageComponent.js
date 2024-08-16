export default function HomePageComponent(){
    return (
        
        <section id='header' className='d-flex align-items-center'>
            
                <div className='row'>
                <div className='col-md-5 pt-1 pt-lg-5 order-4 order-lg-5 d-flex justify-content-center flex-column' style={{marginLeft:"150px", marginTop:"50px"}}>
                    <h1>
                        Get Your Vaccine Here with <strong style={{color:"darkblue"}}>VaccAlert</strong>
                    </h1>
                    <hr style={{color:"black"}}></hr>
                    <h5 className='my-3'>
                    <strong> Vaccine Available On VaccAlert</strong>
                    <h6 className=''>
                    <br/>
                        <p>Vaccine under VaccAlert Program like BCG,OPV,Hepatitis B Vaccine,Pentavalent Vaccine,
                            Rotavirus Vaccine,Pneumococcal,Polio,Influenza,Varicella Vaccines for infants and children.</p></h6>
                    </h5>
                    <div className='mt-3'>
                        <a href='' className='btn btn-warning'>Get Started</a>
                    </div>
                    
                </div>
                
                </div>
        </section>
      
    )

}