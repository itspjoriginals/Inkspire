const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser');
const {checkForAuthenticationCookie} = require('./middlewares/authentication')
const Blog = require('./models/blog');

//Routes
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');


app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

const connectDB = require('./config/connect');
connectDB();

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render('home', {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});