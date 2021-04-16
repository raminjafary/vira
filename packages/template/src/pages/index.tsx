import * as Vida from "vida";
import Links from "../components/links";

export default () => (
  <Vida.Fragment>
    <div id="home">
      <h1>Home</h1>
      <div id="links">
        <Links />
      </div>
    </div>
    <script async src="/public/js/home.hydrate.js"></script>
  </Vida.Fragment>
);
