import { Outlet } from "react-router-dom";
import HospitalNavbar from "./HospitalNavbar";


export default function Hospital(){
    return (<div>
          <HospitalNavbar/>
          <div >
            <Outlet/>
          </div>

    </div>)
} 