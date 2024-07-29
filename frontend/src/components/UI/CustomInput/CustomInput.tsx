import styles from "./CustomInput.module.css";

const CustomInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <input className={styles.input} type="text" placeholder={placeholder} />
  );
};

export default CustomInput;
