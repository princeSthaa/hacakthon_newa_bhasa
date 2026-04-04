import { useState } from "react";
import AlertContext from "./AlertContext";

export default function AlertState(props) {

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const showAlert = (type, msg) => {
        setAlert(true);
        setAlertType(type);
        setAlertMsg(msg);

        setTimeout(() => {
            setAlert(false);
        }, 2000);
    }

    return (
        <>
            <AlertContext.Provider value={{ showAlert }}>
                {props.children}
            </AlertContext.Provider>

            {
                alert 
                &&
                <div className="alert-modal-background z-50 pointer-events-none" onClick={()=>{setAlert(false)}}>
                    <div className={`alert-modal pointer-events-auto ${alertType === 'Success' ? 'alert-success' : 'alert-failure'}`}>
                        <div className="alert-icon">
                           {alertType === 'Success' ? '✓' : '✕'}
                        </div>
                        <div className="alert-content">
                            <h1 className="alert-title">{alertType}</h1>
                            <p className="alert-message">{alertMsg}</p>
                        </div>
                    </div>
                </div>
            }
        </> 
    );
}