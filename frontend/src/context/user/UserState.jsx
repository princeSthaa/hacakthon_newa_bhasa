import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../alert/AlertContext";
import UserContext from "./UserContext";
import axios from "axios";

export default function UserState(props) {

    let navigate = useNavigate();

    const { showAlert } = useContext(AlertContext);

    const handleLogin = async (email, password) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/users/login/", {
                email,
                password,
            });

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("userLoggedIn", true);
            navigate("/dashboard");
            showAlert("Success", "Login successfull!");
        } catch (err) {
            showAlert("Failure", "Invalid credentials");
        }
    };

    return (
        <UserContext.Provider value={{ handleLogin }}>
            {props.children}
        </UserContext.Provider>
    );
}