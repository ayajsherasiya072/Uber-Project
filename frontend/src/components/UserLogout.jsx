import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLogout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch("http://localhost:4000/api/v1/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          toast.success(res.message);
          localStorage.removeItem("token");
          setTimeout(() => navigate("/user-login"), 2000); // Delay navigation for UX
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => toast.error("Logout failed. Please try again."));
  };

  return (
    <div>
      <ToastContainer />
      <button className="bg-black text-white px-2 py-1 rounded" onClick={handleSubmit}>
        Logout
      </button>
    </div>
  );
}

export default UserLogout;
