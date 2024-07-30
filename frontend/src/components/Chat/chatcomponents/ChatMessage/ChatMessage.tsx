import { dateChatMessage } from "../../../../util/dateConverter";
import styles from "./ChatMessage.module.css";

interface IChatMessage {
  userMessage: string;
  date: string;
}

const ChatMessage = ({ userMessage, date }: IChatMessage) => {
  return (
    <div className={styles.main}>
      <img src="/user-profile.png" alt="user ava" className={styles.img} />
      <div className={styles.messageBox}>
        <p className={styles.message}>{userMessage}</p>
        <p className={styles.date}>{dateChatMessage(date)}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
