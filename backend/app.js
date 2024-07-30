const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./database");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

connectDB();

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/chat");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/chat", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
