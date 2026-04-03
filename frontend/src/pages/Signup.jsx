import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/users/signup/", {
                name,
                email,
                password,
            });

            alert("User created");
            navigate("/");

        } catch (err) {
            alert("Error creating user");
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