import ChatSingle from "./ChatSingle";
import styles from "./ChatsList.module.css";
import chat from "./mockChats";

const ChatsList = () => {
  return (
    <div className={styles.main}>
      <h3 className={styles.chat}>Chats</h3>
      {chat.map((el) => (
        <ChatSingle
          key={el.date}
          userName={el.userName}
          userMessage={el.userMessage}
          date={el.date}
        />
      ))}
    </div>
  );
};

export default ChatsList;
