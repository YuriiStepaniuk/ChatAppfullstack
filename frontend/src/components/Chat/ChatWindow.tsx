import { useState, useEffect } from "react";

import Chat from "./chatcomponents/Chat/Chat";
import SendMessage from "./chatcomponents/sendMessage/SendMessage";
import styles from "./ChatWindow.module.css";
import { GET_MESSAGES, SEND_MESSAGE } from "../../constants/routes";

type Message = {
  _id: string;
  userId: string;
  username: string;
  message: string;
  date: string;
};

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:3001/api/chat/messages", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch messages: ${response.status} ${response.statusText}, ${errorText}`
        );
      }

      const messagesData = await response.json();
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching starter");

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSendMessage = async (message: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:3001/api/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to send message: ${response.status} ${response.statusText}`,
          errorText
        );
        throw new Error("Failed to send message");
      }

      const newMessage = await response.json();
      console.log("New message:", newMessage);

      // Ensure messages is an array
      if (!Array.isArray(messages)) {
        console.error("Messages state is not an array:", messages);
        setMessages([newMessage]);
      } else {
        setMessages([newMessage, ...messages]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
      <Chat messages={messages} />
      <SendMessage onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
