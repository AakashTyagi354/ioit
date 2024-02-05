import express from "express";

const app = express();

const port = 4000;

app.get("/test", (req, res) => {
  res.send({
    message: "hello world",
  });
});

app.listen(port, () => {
  console.log("listening on port");
});
