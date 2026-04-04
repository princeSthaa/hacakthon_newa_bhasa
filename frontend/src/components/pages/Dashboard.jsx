import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AlertContext from "../../context/alert/AlertContext";
import ConfirmContext from "../../context/confirm/ConfirmContext";
import Profile from "../Profile";
import Progress from "../Progress";
import LeaderBoard from "../LeaderBoard";

export default function Dashboard() {
  let navigate = useNavigate();
  
  const [contentChoice,setContentChoice] = useState("profile");

  const { showAlert } = useContext(AlertContext);
  const { showConfirm } = useContext(ConfirmContext);

  const handleSignOut = async() => {
    let ans = await showConfirm("Sign out");
    if(ans){
      navigate("/");
      showAlert("Success", "You've signed out. See you next time!");
    }
  }
  return (
    <>
      <div className="fixed h-full w-3xs bg-gray-300 p-4">
        <div className="flex gap-2 mb-8">
          <h1>Logo goes here</h1>
          <h1>Newa Bhasa</h1>
        </div>
        <div className="flex flex-col items-start gap-2">
          <button className="dash-nav-btn" onClick={()=>{setContentChoice("profile")}}>Profile</button>
          <button className="dash-nav-btn" onClick={()=>{setContentChoice("progress")}}>Progress</button>
          <button className="dash-nav-btn" onClick={()=>{setContentChoice("leaderboard")}}>Leader Board</button>
          <button className="dash-nav-btn" onClick={()=>{handleSignOut()}}>Sign Out</button>
        </div>
      </div>
      <div className="pt-4 pl-72 pr-4">
        <div className="flex justify-end">
          <button className="border p-2" onClick={()=>{navigate("/levels")}}>Go to Levels</button>
        </div>
        {
          contentChoice==="profile" &&
          <Profile/>
        }
        {
          contentChoice==="progress" &&
          <Progress/>
        }
        {
          contentChoice==="leaderboard" &&
          <LeaderBoard/>
        }
      </div>        
    </>
  )
}