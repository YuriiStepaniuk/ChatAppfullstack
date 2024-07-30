import styles from "./CustomInput.module.css";

interface ICustomInput {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
}

const CustomInput = ({ placeholder, value, onChange, name }: ICustomInput) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default CustomInput;
