import Vida from "vida";
import Index from "../pages/index";

async function hydrate() {
  Vida.hydrate(<Index />, document.getElementById("root"));

  const { default: Users } = await import("../components/users");
  const html = Vida.hydrate(<Users />);
  document.getElementById("home")?.appendChild(html);
}
hydrate();
