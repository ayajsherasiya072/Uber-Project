import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import CaptainLogin from "./components/CaptainLogin";
import CaptainRegister from "./components/CaptainRegister";
import UserContext from "./context/userContext";
import Start from "./components/Start";
import Home from "./components/Home";
import Useprotectwraper from "./components/Useprotectwraper";
import UserLogout from "./components/UserLogout";

function App() {

  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-register" element={<CaptainRegister />} />
          <Route path="/home" element={<Useprotectwraper><Home /></Useprotectwraper>} />
          <Route path="/user-logout" element={<Useprotectwraper><UserLogout /></Useprotectwraper>} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
