import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";


export default function Admin(){
    return (<div>
          <AdminNavbar/>
          <div>
            <Outlet/>
          </div>
    </div>)
} 