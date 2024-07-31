import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

import styles from "./Modal.module.css";
import ModalDelete from "./ModalDelete";
import ModalChange from "./ModalChange";
import ModalAdd from "./ModalAdd";

const modalRoot = document.getElementById("modal-root")!;

interface IModal {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleteUser: boolean;
  changeUser: boolean;
  addNewUser: boolean;
}

const Modal = ({
  show,
  onClose,
  onConfirm,
  deleteUser,
  changeUser,
  addNewUser,
}: IModal) => {
  if (!show) return null;
  const { chatId } = useParams();

  let content;

  if (deleteUser) {
    content = <ModalDelete chatId={chatId} onClose={onClose} />;
  } else if (changeUser) {
    content = <ModalChange show={show} chatId={chatId} onClose={onClose} />;
  } else if (addNewUser) {
    content = <ModalAdd onClose={onClose} onConfirm={onConfirm} />;
  } else {
    <div className={styles.modalFooter}>
      <button className={styles.btn1} onClick={onClose}>
        Cancel
      </button>
      <button className={styles.btn2} onClick={onConfirm}>
        Confirm
      </button>
    </div>;
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>Confirm Action</div>
        <div className={styles.modalBody}>
          Are you sure you want to proceed?
        </div>
        {content}
        {/* <div className={styles.modalFooter}>
          <button className={styles.btn1} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btn2} onClick={onConfirm}>
            Confirm
          </button>
        </div> */}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
