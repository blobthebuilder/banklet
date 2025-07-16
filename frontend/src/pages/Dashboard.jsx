import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startLink } from "../plaid/link.jsx";
import useAuthCheck from "../utils/useAuthCheck.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);

  useAuthCheck();

  useEffect(() => {
    // Fetch connected banks
    const fetchBanks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/banks/list", {
          credentials: "include", // This is key to send cookies!
        });

        if (response.ok) {
          const data = await response.json();
          setBanks(data);
        } else {
          console.error("Failed to fetch banks");
        }
      } catch (err) {
        console.error("Error fetching banks:", err);
      }
    };
    fetchBanks();
  }, [navigate]);

  const handleConnectBank = async () => {
    await startLink(() => {
      console.log("Bank connected!");
      window.location.reload(); // Refresh to re-fetch banks
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleRemoveBank = async (bankId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/banks/${bankId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setBanks((prev) => prev.filter((bank) => bank.id !== bankId));
      } else {
        console.error("Failed to remove bank");
      }
    } catch (err) {
      console.error("Error removing bank:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      <button
        onClick={handleConnectBank}
        style={{ marginBottom: "1rem" }}>
        Connect a Bank
      </button>

      <button
        onClick={handleLogout}
        style={{ marginLeft: "1rem" }}>
        Logout
      </button>

      <h2>Connected Banks</h2>
      {banks.length === 0 ? (
        <p>No banks connected yet.</p>
      ) : (
        <ul>
          {banks.map((bank) => (
            <li
              key={bank.id}
              style={{ marginBottom: "0.5rem" }}>
              {bank.bank_name}
              <button
                onClick={() => handleRemoveBank(bank.id)}
                style={{ marginLeft: "1rem", color: "red" }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
