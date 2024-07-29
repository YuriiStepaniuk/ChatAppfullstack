import styles from "./Registration.module.css";

import CustomButton from "../../components/UI/CustomButton/CustomButton";
import CustomInput from "../../components/UI/CustomInput/CustomInput";

const Registration = () => {
  return (
    <div className={styles.main}>
      <h1>Register</h1>
      <CustomInput placeholder="E-mail" />
      <CustomInput placeholder="User Name" />
      <CustomInput placeholder="Password" />
      <CustomButton btnText="Register" />
    </div>
  );
};

export default Registration;
