import styles from "./Login.module.css";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import CustomButton from "../../components/UI/CustomButton/CustomButton";

const Login = () => {
  return (
    <div className={styles.main}>
      <h1>Login</h1>
      <CustomInput placeholder="E-mail" />
      <CustomInput placeholder="Password" />
      <CustomButton btnText="Login" />
    </div>
  );
};

export default Login;
