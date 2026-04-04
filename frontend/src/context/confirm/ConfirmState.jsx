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
        if (answerRef.current !== null) {
            answerRef.current(true);
        }
        setConfirm(false);
    }

    const handleCancel = () => {
        if (answerRef.current !== null) {
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
                <div className="confirm-modal-background z-50 pointer-events-none" onClick={handleCancel}>
                    <div className="confirm-modal pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="confirm-header">
                            <div className="confirm-icon">?</div>
                            <h1 className="confirm-title">{confirmMsg}</h1>
                            <button className="confirm-close" onClick={handleCancel}>✕</button>
                        </div>
                        <div className="confirm-actions">
                            <button className="confirm-btn confirm-btn-cancel" onClick={handleCancel}>No</button>
                            <button className="confirm-btn confirm-btn-confirm" onClick={handleOk}>Yes</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}