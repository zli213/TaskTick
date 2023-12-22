// Login.js
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
      const value = e.target.value;
      const name = e.target.name;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");
      const res = await fetch("/api/Users", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        const response = await res.json();
        setErrorMessage(response.message);
      } else {
        router.refresh();
        router.push("/");
      }
    };
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} method="post" className="rigister">
          <label>
            Email:
            <input
              type="text"
              name="email"
              onChange={handleChange}
              required={true}
              value={formData.name}
              className="email"
            />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
}

export default Login;
