import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { validateEmail } from '../utils/helper.js';
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATHS } from '../utils/apiPaths.js';
import { authStyles as styles } from "../assets/dummystyle.js";
import Input from './Inputs';

export default function Login({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

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
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
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
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>Sing in to continue building amazing resumes</p>
        {/*Form */}
        <form className={styles.form} onSubmit={handleLogin}>
          <Input value={email} onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="email@example.com"
            type='email' />
          <Input value={password} onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="MIn 8 character"
            type='password' />
          {error && <div className={styles.errorMessage}>{error}</div>}
          <button type='submit' className={styles.submitButton}>Sing In</button>
          {/*footer */}
          <p className={styles.switchText}>Don't have an account?{" "}
            <button className={styles.signupSwitchButton}
              onClick={() => setCurrentPage("singup")}>Sing In</button>
          </p>
        </form>
      </div>
    </div>
  )
}
