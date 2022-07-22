const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Started at ${port}`));

app.get("/", (_, res) => {
  res.status(200).send({ message: "Welcome to demo app" });
});

app.get("/surprise", (_, res) => {
  res.status(200).send({ message: "This is the surprise route" });
});

app.get("/dynamic/:id", (req, res) => {
  res
    .status(200)
    .send({ message: "The route you specified is /dynamic/" + req.params.id });
});

app.post("/headers", (req, res) => {
  res.status(200).send(req.headers);
});

app.post("/body", (req, res) => res.status(200).send(req.body));
