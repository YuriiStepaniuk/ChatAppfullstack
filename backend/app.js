const express = require("expess");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(expess.json());

server.listen(5000, () => {
  console.log(`Server is running on port 3000`);
});
