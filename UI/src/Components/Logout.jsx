import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import toast  from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await fetch("/api/logout");
      if (res.ok) {
        toast.success("Logout Success");
        navigate("/");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <button className="ml-20" onClick={logout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
