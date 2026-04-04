import { BrowserRouter, Routes, Route } from "react-router";
import AlertState from "./context/alert/AlertState";
import ConfirmState from "./context/confirm/ConfirmState";
import UserState from "./context/user/UserState";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Premium from "./pages/Premium";
import Level from "./pages/Level";
import './App.css';

export default function App() {
  return (
    <AlertState>
      <ConfirmState>
        <BrowserRouter>
          <UserState>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/level/:id/:category' element={<Level />} />
              <Route path="/premium" element={<Premium />} />
            </Routes>
          </UserState>
        </BrowserRouter>
      </ConfirmState>
    </AlertState>
  )
}