import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root")!;

interface IModal {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal = ({ show, onClose, onConfirm }: IModal) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>Confirm Action</div>
        <div className={styles.modalBody}>
          Are you sure you want to proceed?
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btn1} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.btn2} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
