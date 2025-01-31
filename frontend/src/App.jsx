import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import CaptainLogin from "./components/CaptainLogin";
import CaptainRegister from "./components/CaptainRegister";
import UserContext from "./context/userContext";

function App() {

  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-register" element={<CaptainRegister />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
