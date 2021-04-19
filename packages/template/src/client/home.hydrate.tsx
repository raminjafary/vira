import * as Vida from "vida";
import Links from "../components/links";

async function hydrate() {
  Vida.hydrate(<Links />, document.getElementById("links"));

  const { default: Users } = await import("../components/users");
  const html = Vida.hydrate(<Users />);
  document.getElementById("home")?.appendChild(html);
}
hydrate();
