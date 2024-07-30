import React from "react";
import styles from "./CustomButton.module.css";

const CustomButton = ({ btnText }: { btnText: string }) => {
  return (
    <button className={styles.btn} type="submit">
      {btnText}
    </button>
  );
};

export default CustomButton;
