import React, { useState } from "react";

import ChatSingle from "./ChatSingle";
import styles from "./ChatsList.module.css";

import Modal from "../../Modal/Modal";

const ChatsList = ({
  chats,
  onClick,
  setUserName,
}: {
  chats: any;
  onClick: any;
  setUserName: any;
}) => {
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
          deleteUser={false}
          changeUser={false}
          addNewUser
        />
      </div>

      {chats.map((el: any, index: number) => (
        <ChatSingle
          key={index}
          userName={el.chatName}
          userMessage={el.lastMessage.message}
          date={el.lastMessage.date}
          onClick={() => onClick(el._id)}
        />
      ))}
    </div>
  );
};

export default ChatsList;
