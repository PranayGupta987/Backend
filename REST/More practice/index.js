// app.js
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Example in-memory data
const posts = [
  { id: uuidv4(), title: "First Post", content: "Hello World!" },
  { id: uuidv4(), title: "Second Post", content: "Express is cool." },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/post/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).send("Post not found");
  res.render("post", { post });
});

app.post("/post", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: uuidv4(), title, content };
  posts.push(newPost);
  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
