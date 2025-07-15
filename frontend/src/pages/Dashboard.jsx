import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startLink } from "../plaid/link.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");

    if (tokenFromURL) {
      localStorage.setItem("token", tokenFromURL);
      window.history.replaceState({}, "", "/dashboard");
    }

    const token = tokenFromURL || localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleConnectBank = async () => {
    await startLink(() => {
      console.log("Bank connected!"); // You could redirect or refresh here
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      <button
        onClick={handleConnectBank}
        style={{ marginLeft: "1rem" }}>
        Connect a Bank
      </button>
    </div>
  );
};

export default Dashboard;
