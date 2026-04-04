import { useContext, useState } from "react";
import UserContext from "../context/user/UserContext";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleLogin } = useContext(UserContext);
    return (
        <div>
            <h2>Login</h2>

            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={() => { handleLogin(email, password) }}>Login</button>
        </div>
    );
}

export default Login;