import * as Vida from "../../../vida/lib";

async function hydrate() {
  const { default: Counter } = await import("../components/counter");
  const html = Vida.hydrate(<Counter />);
  document.getElementById("counter")?.appendChild(html);
}

hydrate();
