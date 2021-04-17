import * as Vida from "vida";
import Links from "../components/links";

export default () => (
  <Vida.Fragment>
    <Vida.Helmet>
      <title>home</title>
    </Vida.Helmet>
    <Vida.Helmet footer>
      <script async src="/public/js/home.hydrate.js"></script>
    </Vida.Helmet>
    <div id="home">
      <h1>Home</h1>
      <div id="links">
        <Links />
      </div>
    </div>
  </Vida.Fragment>
);
