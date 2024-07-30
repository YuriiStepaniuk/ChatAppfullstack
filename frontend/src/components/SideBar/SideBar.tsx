import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Import the magnifying glass icon

import ChatsList from "./ChatsList/ChatsList";
import styles from "./SideBar.module.css";

// interface LastMessage {
//   text: string;
//   date: string;
// }

// export interface Chat {
//   chatName: string;
//   username: string;
//   lastMessage: LastMessage | null;
// }

const SideBar = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/chat/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.searchAndUser}>
        <div className={styles.userPic}>
          <img
            className={styles.userImage}
            src="/user-profile.png"
            alt="user"
          />
          <h2>Hello, NAME</h2>
          <button className={styles.btn}>Log out</button>
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Search or start a new chat"
        />
        <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
      </div>

      <ChatsList chats={chats} />
    </div>
  );
};

export default SideBar;
