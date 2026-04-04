import { useContext, useState } from "react";
import UserContext from "../context/user/UserContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleLogin } = useContext(UserContext);

    return (
        <div className="login-wrapper">

            {/* LEFT PANEL */}
            <div className="login-left">
                <div className="blob blob-top"></div>
                <div className="blob blob-bottom"></div>

                <div className="logo">
                    <span>न</span>
                    Nepal Bhasa
                </div>

                <div>
                    <div className="hero-title">
                        न
                        <div className="hero-sub">Nepal Bhasa</div>
                    </div>

                    <div className="hero-heading">
                        Welcome back.<br />Continue learning.
                    </div>

                    <div className="hero-desc">
                        Pick up right where you left off. Your progress is waiting.
                    </div>

                    <div className="feature-list">
                        <div className="feature">
                            <div className="feature-icon">🔥</div>
                            Keep your streak alive
                        </div>
                        <div className="feature">
                            <div className="feature-icon">📈</div>
                            Track your progress
                        </div>
                        <div className="feature">
                            <div className="feature-icon">🏆</div>
                            Unlock new levels
                        </div>
                    </div>
                </div>

                <div className="quote">
                    "भाषा मरे देश मर्छ।"
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="login-right">
                <div className="login-card">

                    <div className="mobile-logo">
                        <span>𑐣𑐾</span> Nepal Bhasa
                    </div>

                    <h2 className="title">Sign in</h2>
                    <p className="subtitle">
                        Good to see you again — let's keep learning.
                    </p>

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

                    <button
                        className="btn"
                        onClick={() => handleLogin(email, password)}
                    >
                        Sign In
                    </button>

                    <div className="footer">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;