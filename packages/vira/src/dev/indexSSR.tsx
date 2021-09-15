import Vira, { Helmet } from "..";
import fs from "fs";
import { join } from "path";
import http from "http";

const SayHello = ({ name }: { name: string }) => (
  <h1 onClick={() => console.log("hi")} style={{ color: "blue" }}>
    Hello {name}!
  </h1>
);
const App = () => (
  <Vira.Fragment>
    <Helmet>
      <title>Vira App</title>
      <style>
        {
          "\
        body {\
        font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto,\
        Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\
        Helvetica, Arial, sans-serif;\
      }\
      "
        }
      </style>
    </Helmet>
    <div class="container">
      <SayHello name="Vira" />
    </div>
  </Vira.Fragment>
);

const app = Vira.renderToString(<App />);

const { body, head, footer } = Helmet.SSR(app);

// console.log(body);
console.log(head);
// console.log(footer);

let html = `
<!DOCTYPE html>
<html lang="en">
  <head>
  <meta content="utf-8" http-equiv="encoding" />
  <meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     ${head.join("\n")}
  </head>
  <body>
    <div id="root">
      ${body}
    </div>
    ${footer.join("\n")}
  </body>
</html>
`;

http
  .createServer((req: any, res: any) => {
    const { url } = req;

    if (/\.html$/.test(url)) return res.end(html);

    const path = join(__dirname, "../../", url);

    fs.readFile(path, (err: any, data: any) => {
      if (err) {
        res.writeHead(404);
        return res.end(data);
      }
      const type = /\.png$/.test(url) ? "image/png" : "image/svg+xml";
      res.setHeader("Content-Type", type);
      return res.end(data);
    });
  })
  .listen(8080, () =>
    console.log("open http://localhost:8080/index.html in your browser"),
  );
