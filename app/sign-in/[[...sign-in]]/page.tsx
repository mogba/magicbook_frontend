"use client";

import { useAuth } from "@/app/ui/api";
import React, { ChangeEvent, FormEvent, useState } from "react";

const AuthForm = () => {
  const { signUp, signIn } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp) {
      if (
        !formData.email ||
        !formData.username ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("All fields are required");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    } else if (!formData.username || !formData.password) {
      setError("Username and password are required");
      return;
    }

    setError("");

    if (isSignUp) {
      const { email, username, password } = formData;
      signUp({ email, username, password });
    } else {
      const { username, password } = formData;
      signIn({ username, password });
    }
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
  };

  return (
    <div style={styles.container} className="flex flex-col gap-4">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={(e) => handleSubmit(e)} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        {isSignUp && (
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            required
            style={styles.input}
          />
        </div>
        {isSignUp && (
          <div className="flex flex-col gap-2">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        )}
        <button type="submit" style={styles.button}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <div className="flex flex-col gap-2">
        <span className="flex justify-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </span>
        <button onClick={switchMode} style={styles.switchButton}>
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    /* eslint-disable */
    flexDirection: "column" as any,
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  switchButton: {
    background: "none",
    color: "#007bff",
    border: "none",
    cursor: "pointer",
    padding: "0",
    marginLeft: "5px",
  },
  error: {
    color: "red",
  },
};

export default function Page() {
  return <AuthForm />;
}
