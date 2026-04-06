const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;
const userRoute = require('./routes/user');


app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.urlencoded({extended:false}));

const connectDB = require('./config/connect');
connectDB();

app.get('/', (req, res) => {
  res.render('home');
})

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});