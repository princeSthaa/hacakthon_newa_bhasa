import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";
import axios from "axios";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const handleSignup = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/users/signup/", {
                name,
                email,
                password,
            });
            showAlert("Success", "User created");
            navigate("/");
        } catch (err) {
            showAlert("Failure", "Error creating user");
        }
    };

    return (
        <div>
            <h2>Signup</h2>

            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default Signup;