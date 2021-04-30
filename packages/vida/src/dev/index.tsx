import Vida, { Component } from "../";
import SayHi from "./components/SayHi";
import { jsx } from "../jsx";

function HydrateLazily({ name }: { name: string }) {
  return Vida.lazyHydration(<SayHi name={name} />, null);
}
class Counter extends Component {
  value = 0;

  changeValue(newValue: number) {
    this.value += newValue;
    this.update();
  }

  render() {
    return (
      <Vida.Fragment>
        {jsx`<div>Counter: ${this.value}</div>`}
        <button onClick={() => this.changeValue(1)}>Increment</button>
        <button onClick={() => this.changeValue(-1)}>Decrement</button>
        <div style={{ height: "1000px" }}></div>
        <HydrateLazily name="Vida" />
      </Vida.Fragment>
    );
  }
}

Vida.render(<Counter />, document.getElementById("root"));
