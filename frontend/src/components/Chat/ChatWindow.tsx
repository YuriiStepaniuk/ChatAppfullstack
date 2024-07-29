import Chat from "./chatcomponents/Chat/Chat";
import SendMessage from "./chatcomponents/sendMessage/SendMessage";
import styles from "./ChatWindow.module.css";

const ChatWindow = () => {
  return (
    <div className={styles.main}>
      <div className={styles.chatHeader}>
        <img
          className={styles.imgProfile}
          src="/user-profile.png"
          alt="user ava"
        />
        <p className={styles.name}>NAME OF CONTACT</p>
      </div>
      <Chat />
      <SendMessage />
    </div>
  );
};

export default ChatWindow;
