import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AlertContext from "../context/alert/AlertContext";
import ConfirmContext from "../context/confirm/ConfirmContext";
import Profile from "../components/Profile";
import Progress from "../components/Progress";
import LeaderBoard from "../components/LeaderBoard";
import Levels from "../components/Levels";

function Dashboard() {
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState([]);

    const [contentChoice, setContentChoice] = useState("profile");

    const { showAlert } = useContext(AlertContext);
    const { showConfirm } = useContext(ConfirmContext);

    const handleSignOut = async () => {
        let ans = await showConfirm("Sign out");
        if (ans) {
            navigate("/");
            localStorage.removeItem("user");
            localStorage.removeItem("userLoggedIn");
            showAlert("Success", "You've signed out. See you next time!");
        }
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/data/api/v0/food/1/json.json")
            .then((res) => res.json())
            .then((result) => {
                setData(result);
            })
            .catch((err) => console.error("Error fetching:", err));
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("userLoggedIn")) {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="fixed h-full w-3xs bg-gray-300 p-4">
                <div className="flex gap-2 mb-8">
                    <h1>Logo goes here</h1>
                    <h1>Newa Bhasa</h1>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <button className="dash-nav-btn" onClick={() => { setContentChoice("profile") }}>Profile</button>
                    <button className="dash-nav-btn" onClick={() => { setContentChoice("progress") }}>Progress</button>
                    <button className="dash-nav-btn" onClick={() => { setContentChoice("leaderboard") }}>Leader Board</button>
                    <button className="dash-nav-btn" onClick={() => { setContentChoice("levels") }}>Levels</button>
                    <button className="dash-nav-btn" onClick={() => { handleSignOut() }}>Sign Out</button>
                </div>
            </div>
            <div className="pt-4 pl-72 pr-4">
                <h3>Welcome, {user?.name}</h3>
                {
                    contentChoice === "profile" &&
                    <Profile />
                }
                {
                    contentChoice === "progress" &&
                    <Progress />
                }
                {
                    contentChoice === "leaderboard" &&
                    <LeaderBoard />
                }
                {
                    contentChoice === "levels" &&
                    <Levels />
                }
            </div>
        </>
    );
}

export default Dashboard;