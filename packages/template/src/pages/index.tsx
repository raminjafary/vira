import Vida, { Helmet, Img, Route, Switch } from "vida";
import Links from "../components/links";
import About from "../components/about";

export default () => (
  <Vida.Fragment>
    <Helmet>
      <title>home</title>
    </Helmet>

    <Helmet>
      <style>{`
          .lazy {
            opacity: 0;
            animation: fadein 2s forwards;
          }
          @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>
    </Helmet>

    <div style={{ width: "350px", height: "350px" }}>
      <Img
        width="350px"
        height="350px"
        src="https://via.placeholder.com/350x350"
        onLoad={(e: Event) => {
          (e.target as HTMLImageElement).classList.add("lazy");
        }}
      ></Img>
    </div>
    <svg height="100" width="100">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="3"
        fill="red"
      />
      Sorry, your browser does not support inline SVG.
    </svg>

    <Helmet footer>
      <script async src="/public/js/home.hydrate.js"></script>
    </Helmet>

    <Switch>
      <Route exact path="/">
        <div id="home">
          <h1>Home</h1>
          <div id="links">
            <Links />
          </div>
        </div>
      </Route>
      <Route exact path="/about">
        <About path="/About" />
      </Route>
    </Switch>
  </Vida.Fragment>
);
