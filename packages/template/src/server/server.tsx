import express from "express";
import compression from "compression";
import HomePage from "../pages/index";
import AboutPage from "../pages/about";
import * as Vida from "~/vida/lib";
import { renderHTML } from "./html";

const port = process.env.PORT || 3000;
const app = express();
app.use(compression());

app.use("/public", express.static("./dist/public"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);

app.get("/", (_, res) => {
  const app = Vida.renderToString(<HomePage />);
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
