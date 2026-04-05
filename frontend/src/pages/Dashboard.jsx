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

    const [contentChoice, setContentChoice] = useState(localStorage.getItem("contentChoice")?localStorage.getItem("contentChoice"):"profile");

  const ChangeContent = (content) => {
    switch(content){
      case 1:
        localStorage.setItem("contentChoice", "profile");
        break;
      case 2:
        localStorage.setItem("contentChoice", "progress");
        break;
      case 3:
        localStorage.setItem("contentChoice", "leaderboard");
        break;
      case 4:
        localStorage.setItem("contentChoice", "levels");
        break;
      default:
        localStorage.setItem("contentChoice", "profile");
        break;      
    }
    setContentChoice(localStorage.getItem("contentChoice"));
  }
   

    const { showAlert } = useContext(AlertContext);
    const { showConfirm } = useContext(ConfirmContext);

    const handleSignOut = async () => {
        let ans = await showConfirm("Sign out");
        if (ans) {
            navigate("/");
            localStorage.removeItem("user");
            localStorage.removeItem("userLoggedIn");
            localStorage.removeItem("contentChoice");
            localStorage.removeItem("newari_progress_v1");
            localStorage.removeItem("xp");
            showAlert("Success", "You've signed out. See you next time!");
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("userLoggedIn")) {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    return (
  <>
    {/* ───── SIDEBAR ───── */}
    <div className="fixed h-full w-72 bg-[#FDF6EC] border-r border-[#E8D5CC] p-5 flex flex-col">

      {/* logo */}
      <div className="flex items-center gap-2 mb-10 px-1">
        <span className="font-extrabold text-lg text-[#7A0000] tracking-tight">
        न Nepal Bhasa
        </span>
      </div>

      {/* nav buttons */}
      <div className="flex flex-col gap-2 flex-1">
        <button
          onClick={() => ChangeContent(1)}
          className={`dash-nav-btn ${contentChoice === "profile" && "active"}`}
        >
          🧑 Profile
        </button>

        <button
          onClick={() => ChangeContent(2)}
          className={`dash-nav-btn ${contentChoice === "progress" && "active"}`}
        >
          📈 Progress
        </button>

        <button
          onClick={() => ChangeContent(3)}
          className={`dash-nav-btn ${contentChoice === "leaderboard" && "active"}`}
        >
          🏆 Leaderboard
        </button>

        <button
          onClick={() => ChangeContent(4)}
          className={`dash-nav-btn ${contentChoice === "levels" && "active"}`}
        >
          🗺️ Levels
        </button>
      </div>

      {/* sign out */}
      <div className="border-t border-[#E8D5CC] pt-4">
        <button
          onClick={handleSignOut}
          className="dash-nav-btn text-gray-500 hover:bg-red-50 hover:text-[#7A0000]"
        >
          🚪 Sign Out
        </button>
      </div>
    </div>

    {/* ───── MAIN CONTENT ───── */}
    <div className="pl-72 min-h-screen bg-[#F7F0E8]">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* header */}
        <div className="mb-8">
          <p className="text-sm text-[#7A0000] font-semibold uppercase tracking-widest">
            Dashboard
          </p>

          <h1 className="text-3xl font-extrabold text-[#1A0A0A] mt-1">
            Welcome, {user?.name} 👋
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {user?.email}
          </p>
        </div>

        {/* content card wrapper */}
        <div className="bg-white rounded-2xl border border-[#F0E0D0] shadow-sm p-6">
          {contentChoice === "profile" && <Profile />}
          {contentChoice === "progress" && <Progress />}
          {contentChoice === "leaderboard" && <LeaderBoard />}
          {contentChoice === "levels" && <Levels />}
        </div>

      </div>
    </div>
  </>
);
}

export default Dashboard;