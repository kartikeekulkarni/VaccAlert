import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./slice";

export default function LoginPageComponent(){

    const init = {
        uid: { value: "", valid: false, err: "", touch: false },
        pwd: { value: "", valid: false, err: "", touch: false },
        formValid: false
    };
     
    const reducer = (state, action) => {
        switch(action.type) {
            case 'update':
                const { key, value, valid, err, touch, formValid } = action.data;
                return { ...state, [key]: { value, valid, err, touch }, formValid };
            case 'reset':
                return init;
            default:
                return state;
        }
    };

    const [usr, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    const [passFlag, setPassFlag] = useState(false);
    const navigate = useNavigate();
    const reduxAction =useDispatch();

    const handleChange = (key, value) => {
        const { valid, err } = checkValid(key, value);
        let formValid = true;
        for (let k in usr) {
            if (usr[k].valid === false) {
                formValid = false;
                break;
            }
        }
        dispatch({ type: 'update', data: { key, value, valid, err, touch: true, formValid } });
    };
    
    const checkValid = (key, value) => {
        let valid = true;
        let err = "";
        switch(key) {
            case 'uid':
                const uidPattern = /^\w{2,8}$/;
                if (!uidPattern.test(value)) {
                    valid = false;
                    err = "Invalid UID";
                }
                break;
            case 'pwd':
                const pwdPattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!#@$%^&])[A-Za-z0-9!@#$%^&]{8,20}$/;
                if (!pwdPattern.test(value)) {
                    valid = false;
                    err = "Password must contain at least 1 special symbol, 1 capital letter, and be between 8-20 characters";
                }
                break;
            default:
                break;
        }
        return { valid, err };
    };

    const sendData = (e) => {
        e.preventDefault();
    
        // Check for admin login
        if (usr.uid.value === "admin" && usr.pwd.value === "Admin@123") {
            navigate("/admin_home");
            return;
        }
    
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Uname: usr.uid.value,
                Password: usr.pwd.value
            })
        };
    
        fetch("https://localhost:7060/api/UserLogin/LoginUser", reqOptions)
            .then(resp => {
                if (resp.ok) return resp.json();
                else throw new Error("Server Error");
            })
            .then(obj => {
                if (Object.keys(obj).length === 0) {
                    setMsg("Wrong UID/PWD");
                } else {
                    reduxAction(login())
                    if (obj.status === false) {
                        alert("Request has not been approved");
                    } else {
                            if (obj.userdb.rid === 2) {
                            // Check if the hospital is authorized
                            if (obj.hospitalStatus === false) {
                                alert("Hospital is not authorized");
                            } else {
                                navigate("/hospital_home");
                            }
                        } else if (obj.userdb.rid === 3) {
                            navigate("/parent_home");
                        }
                    }
                }
            })
            .catch((error) => alert("Server error. Try after some time"));
    };
        
    

    return (
        <div className="col-md-12">
            <div className="card card-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
                <div className="box text-center">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="Sample Image"
                        className="rounded-circle"
                        width={100}
                        height={100}
                    />
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="uid"><b>Username</b></label>
                        <input
                            type="text"
                            name="uid"
                            value={usr.uid ? usr.uid.value : ""}
                            className="form-control"
                            onChange={(e) => handleChange("uid", e.target.value)}
                            onBlur={(e) => handleChange("uid", e.target.value)}
                        />
                        <div style={{ display: (usr.uid && usr.uid.touch && !usr.uid.valid) ? "block" : "none" }} className="text-danger">
                            {usr.uid ? usr.uid.err : ""}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd"><b>Password</b></label>
                        <input
                            type={passFlag ? "text" : "password"}
                            name="pwd"
                            value={usr.pwd ? usr.pwd.value : ""}
                            className="form-control"
                            onChange={(e) => handleChange("pwd", e.target.value)}
                            onBlur={(e) => handleChange("pwd", e.target.value)}
                        />
                        <div style={{ display: (usr.pwd && usr.pwd.touch && !usr.pwd.valid) ? "block" : "none" }} className="text-danger">
                            {usr.pwd ? usr.pwd.err : ""}
                        </div>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            name="disp"
                            checked={passFlag}
                            className="form-check-input"
                            onChange={() => setPassFlag(!passFlag)}
                        />
                        <p style={{ display: passFlag ? "none" : "block" }}>Show Password</p>
                        <p style={{ display: !passFlag ? "none" : "block" }}>Hide Password</p>
                    </div>
                    <div>
                        <input
                            type="button"
                            disabled={!usr.formValid}
                            value="LOGIN"
                            onClick={sendData}
                            className="btn btn-primary btn-block"
                        />
                        <span> </span>
                        <input
                            type="reset"
                            value="CLEAR"
                            onClick={() => dispatch({ type: 'reset' })}
                            className="btn btn-primary btn-block"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}