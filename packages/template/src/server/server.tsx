import express from "express";
import fetch from "node-fetch";
import compression from "compression";
import HomePage from "../pages/index";
import Todos from "../pages/todos";
import Vira, { Helmet } from "vira";
import { renderHTML } from "./html";

const port = process.env.PORT || 3000;
const app = express();
app.use(compression());

app.use("/public", express.static("./dist/public"));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

app.get("/", (_, res) => {
  const app = Vira.renderToString(<HomePage />);
  const { body, head, footer } = Helmet.SSR(app);
  res.send(renderHTML(body, head, footer));
});

app.get("/todos", async (_, res) => {
  const fetchTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const json: any = await res.json();
    const names = json.map((obj: any) => obj.name);
    return names;
  };

  const todos = await fetchTodos();

  Todos.fetchTodos = () => () => todos;

  const app = Vira.renderToString(<Todos />);
  const { body, head, footer } = Helmet.SSR(app);
  res.send(renderHTML(body, head, footer));
});

app.get("/manifest.webmanifest", (_, res) => {
  res.sendFile(__dirname + "/public/manifest.webmanifest");
});

app.get("/sw.js", (_, res: any) => {
  res.sendFile(__dirname + "/public/sw.js");
});
