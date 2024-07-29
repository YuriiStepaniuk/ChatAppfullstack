import React from "react";
import styles from "./CustomButton.module.css";

const CustomButton = ({ btnText }: { btnText: string }) => {
  return <button className={styles.btn}>{btnText}</button>;
};

export default CustomButton;
