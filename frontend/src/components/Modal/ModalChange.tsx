import { useState } from "react";

const ModalChange = ({ show, onClose, chatId }) => {
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!show) return null;

  const handleChangeName = async () => {
    setIsUpdating(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `http://localhost:3001/api/chat/chats/${chatId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newName }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to change name: ${response.status} ${response.statusText}, ${errorText}`
        );
      }

      console.log("Chat name updated successfully");
      onClose(); // Close the modal after successful update

      // window.location.reload();
    } catch (error) {
      console.error("Error updating chat name:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Change Chat Name</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
        />
        <div>
          <button onClick={handleChangeName} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Name"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalChange;
