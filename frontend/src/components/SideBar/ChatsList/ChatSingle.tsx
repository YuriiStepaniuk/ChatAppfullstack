import { dateChats } from "../../../util/dateConverter";
import styles from "./ChatSingle.module.css";

interface IChatSingle {
  userName: string;
  userMessage: string;
  date: string;
  onClick: any;
}

const ChatSingle = ({ userName, userMessage, date, onClick }: IChatSingle) => {
  const handleOnChatClick = () => {};

  return (
    <div className={styles.main} onClick={onClick}>
      <img className={styles.userImage} src="/user-profile.png" alt="" />
      <div className={styles.userDescription}>
        <div className={styles.nameDate}>
          <p className={styles.name}>{userName}</p>
          <p className={styles.date}>{dateChats(date)}</p>
        </div>
        <p className={styles.message}>{userMessage}</p>
      </div>
    </div>
  );
};

export default ChatSingle;
