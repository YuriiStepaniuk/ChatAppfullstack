import styles from "./Registration.module.css";

import CustomButton from "../../components/UI/CustomButton/CustomButton";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    console.log("starting...");
    console.log(formData);

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);

        return;
      }

      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.formInputs}>
          <CustomInput
            placeholder="E-mail"
            value={formData.email}
            onChange={onChange}
            name="email"
          />
          <CustomInput
            placeholder="User Name"
            value={formData.username}
            onChange={onChange}
            name="username"
          />
          <CustomInput
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            name="password"
          />
        </div>

        <CustomButton btnText="Register" />
      </form>
      <div>
        <p>Already have an account ? </p>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Registration;
