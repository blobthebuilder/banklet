"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PlaidLink from "@/components/PlaidLink";
import useAuthCheck from "@/hooks/useAuthCheck";

export default function Dashboard() {
  const router = useRouter();
  const [banks, setBanks] = useState<any[]>([]);
  const userId = "some-user-id";

  useAuthCheck();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/banks/list", {
          credentials: "include",
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
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleRemoveBank = async (bankId: string) => {
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

      <PlaidLink
        user={userId}
        variant="primary"
      />

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
}
