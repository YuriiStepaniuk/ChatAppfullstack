import { useState } from "react";
import styles from "./MainChat.module.css";

import ChatWindow from "../../components/Chat/ChatWindow";
import SideBar from "../../components/SideBar/SideBar";

const MainChat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [userName, setUserName] = useState("User");
  console.log(selectedChat);

  return (
    <div className={styles.main}>
      <SideBar setSelectedChat={setSelectedChat} />

      {selectedChat ? (
        <ChatWindow selectedChat={selectedChat} userName={userName} />
      ) : (
        <p>No Chat seleted</p>
      )}
    </div>
  );
};

export default MainChat;
