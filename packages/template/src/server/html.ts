import fs from "fs";

export function renderHTML(body: string, head: string[], footer: string[]) {
  const manifest = JSON.parse(
    fs.readFileSync(__dirname + "/public/js/manifest.json", {
      encoding: "utf8",
    }),
  );

  let html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="theme-color" content="#3367D6">
      <link rel="manifest" href="/manifest.webmanifest">
      <link rel="apple-touch-icon" href="/public/img/pwa/icons-192.png">
      ${head.join("\n")}
    </head>
    <body>
    <div id="root">
      ${body}
    </div>
      ${footer.join("\n")}
      <!-- <script>
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js');
        }
      </script> -->
    </body> 
  </html>`;

  const addChunkHash = () => {
    for (const [key, value] of Object.entries(manifest)) {
      if (html.includes(key)) html = html.replace(key, value as string);
    }
  };

  const minify = () => {
    html = html.replace(/(?=<!--)([\s\S]*?)-->/gm, "");
    html = html.replace(/\s+/gm, " ");
  };

  addChunkHash();
  minify();

  return html;
}
