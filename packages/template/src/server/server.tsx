import express from "express";
//@ts-ignore
import fetch from "node-fetch";
import compression from "compression";
import HomePage from "../pages/index";
import AboutPage from "../pages/about";
import Todos from "../pages/todos";
import * as Vida from "vida";
import { renderHTML } from "./html";

const port = process.env.PORT || 3000;
const app = express();
app.use(compression());

app.use("/public", express.static("./dist/public"));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

app.get("/", (_, res) => {
  const app = Vida.renderToString(<HomePage />);
  res.send(renderHTML(app));
});

app.get("/todos", async (_, res) => {
  const fetchTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await res.json();
    const names = json.map((obj: any) => obj.name);
    return names;
  };

  const todos = await fetchTodos();

  Todos.fetchTodos = () => todos;

  const app = Vida.renderToString(<Todos />);
  res.send(renderHTML(app));
});

app.get("/about", (req, res) => {
  const app = Vida.renderToString(<AboutPage path={req.path} />);
  res.send(renderHTML(app));
});

app.get("/manifest.webmanifest", (_, res) => {
  res.sendFile(__dirname + "/public/manifest.webmanifest");
});

app.get("/sw.js", (_, res: any) => {
  res.sendFile(__dirname + "/public/sw.js");
});
