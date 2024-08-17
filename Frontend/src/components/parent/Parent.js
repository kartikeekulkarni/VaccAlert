import { Outlet } from "react-router-dom";
import ParentNavbar from "./ParentNavbar";


export default function Parent(){
    return (<div>
          <ParentNavbar/>
          <div >
            <Outlet/>
          </div>

    </div>)
} 