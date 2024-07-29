import React, { useState } from "react";

import ChatSingle from "./ChatSingle";
import styles from "./ChatsList.module.css";
import chat from "./mockChats";
import Modal from "../../Modal/Modal";

const ChatsList = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenModal = () => {
    setIsOpened(true);
  };

  const handleCloseModal = () => {
    setIsOpened(false);
  };

  const handleConfirmModal = () => {
    console.log("Action is confirmed");

    setIsOpened(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.newChat}>
        <h3 className={styles.chat}>Chats</h3>
        <button className={styles.btn} onClick={handleOpenModal}>
          + Add new
        </button>
        <Modal
          show={isOpened}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
        />
      </div>

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
