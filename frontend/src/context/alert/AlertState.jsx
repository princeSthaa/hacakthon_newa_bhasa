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
        }, 1500);
    }

    return (
        <>
            <AlertContext.Provider value={{ showAlert }}>
                {props.children}
            </AlertContext.Provider>

            {
                alert 
                &&
                <div className="alert-modal-background" onClick={()=>{setAlert(false)}}>
                    <div className="alert-modal">
                        <h1>{alertType}&nbsp;</h1>
                        <p>{alertMsg}</p>
                    </div>
                </div>
            }
        </> 
    );
}