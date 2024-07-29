import styles from "./MainChat.module.css";

import ChatWindow from "../../components/Chat/ChatWindow";
import SideBar from "../../components/SideBar/SideBar";

const MainChat = () => {
  return (
    <div className={styles.main}>
      <SideBar />
      <ChatWindow />
    </div>
  );
};

export default MainChat;
