import * as Vida from "vida";
import Links from "../components/links";

async function hydrate() {
  Vida.hydrate(<Links />, document.getElementById("links"));

  const { default: Component } = await import(
    /* webpackChunkName: "users" */ "../components/users"
  );
  const html = Vida.hydrate(<Component />);
  document.getElementById("home")?.appendChild(html);
}
hydrate();
