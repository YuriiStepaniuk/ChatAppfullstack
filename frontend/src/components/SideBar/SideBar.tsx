import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Import the magnifying glass icon

import ChatsList from "./ChatsList/ChatsList";
import styles from "./SideBar.module.css";

const SideBar = () => {
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

      <ChatsList />
    </div>
  );
};

export default SideBar;
