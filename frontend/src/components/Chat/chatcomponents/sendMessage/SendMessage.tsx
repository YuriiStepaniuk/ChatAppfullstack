import styles from "./SendMessage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

import { useState } from "react";

const SendMessage = ({ onSendMessage }: { onSendMessage: any }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={`${styles.icon} ${styles.iconHover}`}
        />
      </form>
    </div>
  );
};

export default SendMessage;
