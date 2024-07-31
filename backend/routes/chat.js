const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middleware/auth");
const Chat = require("../models/Chat");

// Route to send message
router.post("/chats/:chatId/send", authMiddleware, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    // Create the message object
    const newMessage = {
      userId: new mongoose.Types.ObjectId(userId), // Ensure this is a valid ObjectId
      message,
      date: new Date(),
    };

    // Find the chat and update it
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    chat.messages.push(newMessage);
    await chat.save();

    res.json(newMessage);
  } catch (err) {
    console.error("Error sending message:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Route to get messages for a user
router.get("/chats/:chatId/messages", authMiddleware, async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("messages");

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    res.json(chat.messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Route to add new User chat
router.post("/chats", authMiddleware, async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ message: "User ID and name are required" });
  }

  try {
    const newChat = new Chat({
      userId,
      name,
      messages: [],
    });

    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
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
      _id: chat._id,
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

//Update chat name
router.put("/chats/:chatId/update", async (req, res) => {
  const { chatId } = req.params;
  const { name } = req.body;

  try {
    const chat = await Chat.findByIdAndUpdate(chatId, { name }, { new: true });
    if (!chat) return res.status(404).json({ msg: "Chat not found" });

    res.json(chat);
  } catch (error) {
    console.error("Error updating chat name:", error);
    res.status(500).send("Server error");
  }
});

//Delete chat
router.delete("/chats/:chatId/delete", authMiddleware, async (req, res) => {
  const { chatId } = req.params;

  try {
    // Find and delete the chat
    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    res.json({ msg: "Chat deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
