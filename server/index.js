const next = require("next");
const express = require("express");
const session = require("cookie-session");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handleNextRequests = app.getRequestHandler();
const cookieParser = require("cookie-parser");

const port = 3008;

const Books = [
  {
    id: 1,
    name: "Harry Potter",
    author: "JK"
  },
  {
    id: 2,
    name: "SamYoc",
    author: "YLD"
  },
  {
    id: 3,
    name: "冰与火之歌",
    author: "马丁"
  },
];

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(
    session({
      name: "token",
      secret: "next-frame",
      resave: false,
      saveUninitialized: true,
      maxAge: 1000 * 60 * 60 * 3 * 1
    })
  );

  server.get("/api/books/all", (req, res) => {
    res.end(JSON.stringify({
      success: true,
      result: Books
    }));
  });

  server.post("/api/books/add", (req, res) => {
    Books.push({
      id: Books[Books.length - 1].id + 1,
      name: req.query.name,
      author: req.query.author,
    });
    res.end(JSON.stringify({
      success: true,
    }));
  });

  server.get("*", (req, res) => {
    handleNextRequests(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on http://localhost:${port}`);
  });
});
