const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes.js");
const authRoute=require("./routes/auth.js")

const Posts =require("./models/Posts.js");

const verifyToken=require("./middleware/authMiddleware.js")



const cookieParser=require("cookie-parser")

app.use(cookieParser())

app.use(
  cors({ 
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/", routes);
app.use("/",authRoute)






const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose.connect("mongodb://localhost:27017/linkedin");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
