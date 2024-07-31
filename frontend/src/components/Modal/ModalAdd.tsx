import { useState } from "react";

const ModalAdd = ({ onClose, onConfirm }: { onClose: any; onConfirm: any }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    try {
      const response = await fetch("http://localhost:3001/api/chat/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"), // Replace with actual user ID
          name: fullName,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create chat: ${response.status} ${response.statusText}, ${errorText}`
        );
      }

      const newChat = await response.json();
      // onChatAdded(newChat);

      // Reset the form
      onClose(true);
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ModalAdd;
