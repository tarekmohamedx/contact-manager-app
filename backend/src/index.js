require("dotenv").config({
  path: require("path").resolve(__dirname, "../config.env"),
});
const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const cors = require("cors");

const auth = require("./routes/auth.routes");
const contact = require("./routes/contact.routes");
const user = require("./routes/user.routes");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

app.use("/api/auth", auth);
app.use("/api/contact", contact);
app.use("/api/user", user);

require("./socket/socket.io")(server);

server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
