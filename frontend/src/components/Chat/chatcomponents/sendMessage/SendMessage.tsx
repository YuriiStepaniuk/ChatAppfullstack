import styles from "./SendMessage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

const SendMessage = () => {
  return (
    <div className={styles.main}>
      <input
        className={styles.input}
        type="text"
        placeholder="Type your message"
      />
      <FontAwesomeIcon
        icon={faPaperPlane}
        className={`${styles.icon} ${styles.iconHover}`}
      />
    </div>
  );
};

export default SendMessage;
