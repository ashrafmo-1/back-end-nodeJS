const express = require("express");
const app = express();
const usersRouter = require("./routes/users.route");
const mongoose = require("mongoose");
const url = 'mongodb+srv://ashrafmohamed1176:TOgMZCglmXsb3vhA@users.r4ytxl8.mongodb.net/ashraf_users?retryWrites=true&w=majority&appName=users'; // not secure

mongoose.connect(url).then(() => {
  console.log("Connect success for DB");

}).catch(err =>  console.log(err));

app.use(express.json()); // Node.js body parsing middleware.
app.use("/api/users", usersRouter); // API routes have all methods

app.listen(5000, () => {
  console.log("hosting server started on port: 5000");
});