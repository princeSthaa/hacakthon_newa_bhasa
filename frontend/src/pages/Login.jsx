import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/users/login/", {
                email,
                password,
            });

            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");

        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>

            <p onClick={() => navigate("/signup")}>Go to Signup</p>
        </div>
    );
}

export default Login;