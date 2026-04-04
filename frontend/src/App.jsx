import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./components/pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard1";
import Levels from "./components/pages/Levels";
import Level from "./components/pages/Level";
import AlertState from "./context/alert/AlertState";
import ConfirmState from "./context/confirm/ConfirmAlert";

export default function App() {
  return (
    <AlertState>
      <ConfirmState>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/levels' element={<Levels />} />
            <Route path='/level/:id/:category' element={<Level />} />
          </Routes>
        </BrowserRouter>
      </ConfirmState>
    </AlertState>
  )
}