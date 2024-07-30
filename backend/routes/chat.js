const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middleware/auth");
const Chat = require("../models/Chat");

// Route to send message
router.post("/send", authMiddleware, async (req, res) => {
  const { message } = req.body;
  const username = req.user.username; // Extracted from authMiddleware

  if (!message) {
    return res.status(400).json({ msg: "Message content is required" });
  }

  if (!username) {
    return res.status(400).json({ msg: "Username is required" });
  }

  try {
    const newMessage = new Message({
      userId: req.user.id,
      username,
      message,
      date: new Date(),
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.error("Error saving message:", err.message);
    res.status(500).send("Server error");
  }
});

// Route to get messages for a user
router.get("/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ date: 1 }); // Sort by date ascending
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.status(500).send("Server error");
  }
});

// Route to add new User chat
router.post("/create-chat", async (req, res) => {
  const { userId, chatName } = req.body;

  try {
    const Chat = new Chat({
      userId,
      chatName,
      messages: [],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/chats", authMiddleware, async (req, res) => {
  try {
    console.log("User ID:", req.user.id); // Log user ID

    // Fetch chats and populate messages
    const chats = await Chat.find({ userId: req.user.id })
      .populate("messages")
      .exec();

    console.log("Chats:", chats); // Log fetched chats

    // Check if chats are found
    if (!chats || chats.length === 0) {
      // Handle case where no chats are found
      return res.status(404).json({ msg: "No chats found" });
    }

    // Map over chats to include lastMessage with default values
    const chatData = chats.map((chat) => ({
      chatName: chat.name, // Ensure this matches the field in your schema
      username: chat.username, // Ensure this matches the field in your schema
      lastMessage:
        chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1]
          : { message: "No messages", date: new Date() }, // Default values
    }));

    // Send the transformed chat data as response
    res.json(chatData);
  } catch (err) {
    console.error("Error fetching chats:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
