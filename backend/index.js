const express = require("express");
const cors = require("cors")
const dotenv = require('dotenv').config();
const dbConnect = require("./config/Db.js")
const recipeRoutes = require("./routes/recipe.router.js");
const userRoutes = require("./routes/user.router.js")


const app = express();
const PORT = 3000 || process.env.PORT ;

app.use(express.json()); 
// app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use("/",userRoutes)
app.use("/recipe", recipeRoutes);

app.use(express.static("public"))


app.listen(PORT, () => {
    console.log("Server is connected ");
    dbConnect();
});
