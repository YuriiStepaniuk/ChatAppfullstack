import styles from "./ChatSingle.module.css";

interface IChatSingle {
  userName: string;
  userMessage: string;
  date: string;
}

const ChatSingle = ({ userName, userMessage, date }: IChatSingle) => {
  return (
    <div className={styles.main}>
      <img className={styles.userImage} src="/user-profile.png" alt="" />
      <div className={styles.userDescription}>
        <div className={styles.nameDate}>
          <p className={styles.name}>{userName}</p>
          <p className={styles.date}>{date}</p>
        </div>
        <p className={styles.message}>{userMessage}</p>
      </div>
    </div>
  );
};

export default ChatSingle;
