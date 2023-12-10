import React, { useState, useEffect } from "react";
import { NextResponse } from "next/server";
import EditableInput from "../../application/widgets/EditableInput";

const SettingAccount = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/account");

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          //Now it gets "User not found".
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    console.log("User data:", userData);
    fetchData();
  }, []);

  // const handleNameChange = (newName) => {
  //   fetch("/api/users", {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ name: newName }),
  //   });
  // };

  return (
    <div>
      <div>
      <h1>Account Information</h1>
      {userData ? (
        <>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Password: not visible</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </div>
  );
};

export default SettingAccount;