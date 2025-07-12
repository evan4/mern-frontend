import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authStyles as styles } from "../assets/dummystyle.js";
import { UserContext } from "../context/UserContext.jsx";
import { validateEmail } from "../utils/helper.js";
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATH } from '../utils/apiPath.js';
import Input from "./Inputs";

export default function SingUp({ setCurrentPage }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter fullname");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong. Please try again lately.");
    }
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
      </div>
      {/*Form */}
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <Input value={fullName} onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="John Joe" />
        <Input value={email} onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="email@example.com"
          type='email' />
        <Input value={password} onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="MIn 8 character"
          type='password' />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type='submit' className={styles.signupSubmit}>Create Account</button>
      </form>
      {/*footer */}
      <p className={styles.switchText}>Already have an account?{" "}
        <button className={styles.signupSwitchButton}
          onClick={() => setCurrentPage("login")}>Sing In</button>
      </p>
    </div>
  )
}
