import * as Vida from "vida";
import Links from "../components/links";
import About from "../components/about";

export default () => (
  <Vida.Fragment>
    <Vida.Helmet>
      <title>home</title>
    </Vida.Helmet>

    <Vida.Helmet footer>
      <script async src="/public/js/home.hydrate.js"></script>
    </Vida.Helmet>

    <Vida.Router.Switch>
      <Vida.Router.Route exact path="/">
        <div id="home">
          <h1>Home</h1>
          <div id="links">
            <Links />
          </div>
        </div>
      </Vida.Router.Route>
      <Vida.Router.Route exact path="/about">
        <About path="/About" />
      </Vida.Router.Route>
    </Vida.Router.Switch>
  </Vida.Fragment>
);
