import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import CustomButton from "../../components/UI/CustomButton/CustomButton";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);

  const onChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        localStorage.setItem("token", data.token);
        window.location.href = "/chat";
      } else {
        // Handle errors
        setIsError(true);
        console.error(data.msg);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    <div className={styles.main}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <CustomInput
            placeholder="E-mail"
            value={loginData.email}
            onChange={onChange}
            name="email"
          />
          <CustomInput
            placeholder="Password"
            value={loginData.password}
            onChange={onChange}
            name="password"
          />
        </div>
        <CustomButton btnText="Login" />
      </form>
      {isError && <p className={styles.error}>Invalid Credentials</p>}
      <div>
        <p>Don't have an account ? </p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
