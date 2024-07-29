import ChatMessage from "../ChatMessage/ChatMessage";
import styles from "./Chat.module.css";
import messages from "./mockChat";

const Chat = () => {
  return (
    <div className={styles.main}>
      {messages.map((mes, index) => (
        <ChatMessage key={index} userMessage={mes.message} date={mes.date} />
      ))}
    </div>
  );
};

export default Chat;
