import ChatMessage from "../ChatMessage/ChatMessage";
import styles from "./Chat.module.css";

const Chat = ({ messages }: { messages: any }) => {
  return (
    <div className={styles.main}>
      {messages.map((msg: any) => {
        return (
          <ChatMessage
            key={msg._id}
            userMessage={msg.message}
            date={msg.date}
          />
        );
      })}
    </div>
  );
};

export default Chat;
