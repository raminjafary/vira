import * as Vida from "../core";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      h1: any;
      div: any;
    }
  }
}

const SayHello = ({ name }: { name: string }) => (
  <h1 style={{ color: "blue" }}>Hello {name}!</h1>
);
const App = () => (
  <div class="container">
    <SayHello name="Vida" />
  </div>
);

Vida.render(<App />, document.getElementById("root"));
