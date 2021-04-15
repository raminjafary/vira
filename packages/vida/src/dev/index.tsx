import { Component, Fragment, lazyHydration } from "../core";
import * as Vida from "../core";
import SayHi from "./components/SayHi";

function HydrateLazily({ name }: { name: string }) {
  return lazyHydration(<SayHi name={name} />, null);
}

class Counter extends Component {
  value = 0;

  changeValue(newValue: number) {
    this.value += newValue;
    this.update();
  }

  render() {
    return (
      <Fragment>
        <div>Counter: {this.value}</div>
        <button onClick={() => this.changeValue(1)}>Increment</button>
        <button onClick={() => this.changeValue(-1)}>Decrement</button>
        <div style={{ height: "1000px" }}></div>
        <HydrateLazily name="Vida" />
      </Fragment>
    );
  }
}

Vida.render(<Counter />, document.getElementById("root"));
