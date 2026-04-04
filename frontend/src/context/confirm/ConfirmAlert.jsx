import { useState, useRef } from "react";
import ConfirmContext from "./ConfirmContext";

export default function ConfirmState(props) {

    const answerRef = useRef(null);

    const [confirm, setConfirm] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState("");

    const showConfirm = (msg) => {
        setConfirm(true);
        setConfirmMsg(msg);
        return new Promise((resolve) => {
            answerRef.current = resolve; // store resolve function in answerRef.current
        });
    }

    const handleOk = () => {
        if(answerRef.current!==null){
            answerRef.current(true);
        }
        setConfirm(false);
    }

    const handleCancel = () => {
        if(answerRef.current!==null){
            answerRef.current(false);
        }
        setConfirm(false);
    }

    return (
        <>
            <ConfirmContext.Provider value={{ showConfirm }}>
                {props.children}
            </ConfirmContext.Provider>

            {
                confirm                
                &&
                <div className="confirm-modal-background" onClick={handleCancel}>
                    <div className="confirm-modal p-4">
                        <h1><b>{confirmMsg}</b></h1>
                        <img src="/close.png" style={{height: "14px", width: "14px"}} onClick={handleCancel}/>
                        <div className="flex gap-4">
                            <button className="border p-2" onClick={handleOk}>Yes</button>
                            <button className="border p-2" onClick={handleCancel}>No</button>
                        </div>
                    </div>
                </div>
            }
        </> 
    );
}