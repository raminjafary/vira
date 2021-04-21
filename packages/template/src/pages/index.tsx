import * as Vida from "vida";
import Links from "../components/links";
import About from "../components/about";

export default () => (
  <Vida.Fragment>
    <Vida.Helmet>
      <title>home</title>
    </Vida.Helmet>

    <Vida.Helmet>
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
    </Vida.Helmet>

    <div style={{ width: "350px", height: "350px" }}>
      <Vida.Img
        width="350px"
        height="350px"
        src="https://via.placeholder.com/350x350"
        onLoad={(e: Event) => {
          (e.target as HTMLImageElement).classList.add("lazy");
        }}
      ></Vida.Img>
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
