const ModalDelete = ({ chatId, onClose }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(
        `http://localhost:3001/api/chat/chats/${chatId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete chat: ${response.status} ${response.statusText}, ${errorText}`
        );
      }

      console.log("Chat deleted successfully");
      onClose(); // Close the modal after successful deletion

      window.location.href = "/chats";
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this chat?</p>
        <div>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
