import Vira from "vira";
import Index from "../pages/index";

async function hydrate() {
  Vira.hydrate(<Index />, document.getElementById("root"));

  const { default: Users } = await import("../components/users");
  const html = Vira.hydrate(<Users />);
  document.getElementById("home")?.appendChild(html);
}
hydrate();
