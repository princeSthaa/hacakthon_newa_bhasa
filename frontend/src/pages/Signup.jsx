import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";
import axios from "axios";
import "./signup.css";

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
            navigate("/login");
        } catch (err) {
            showAlert("Failure", "Error creating user");
        }
    };

    return (
        <div className="signup-wrapper">

            {/* LEFT PANEL */}
            <div className="signup-left">
                <div className="blob blob-top"></div>
                <div className="blob blob-bottom"></div>

                <div>
                    <div className="hero-title">
                        न
                        <div className="hero-sub">Nepal Bhasa</div>
                    </div>
                    <h2 style={{ marginTop: "20px" }}>
                        Start your journey into living heritage.
                    </h2>
                    <p style={{ opacity: 0.6 }}>
                        Join learners preserving Nepal Bhasa.
                    </p>
                </div>

                <p style={{ fontSize: "12px", opacity: 0.3 }}>
                    "भाषा मरे देश मर्छ।"
                </p>
            </div>

            {/* RIGHT PANEL */}
            <div className="signup-right">
                <div className="signup-card">

                    <h2 className="title">Create your account</h2>
                    <p className="subtitle">Free forever · No credit card required</p>

                    <input
                        className="input"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="input"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn" onClick={handleSignup}>
                        Create Account
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Signup;