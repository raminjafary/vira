import Vira, { Component } from "..";
import SayHi from "./components/SayHi.tsx";
import { jsx } from "../jsx/index.ts";

function HydrateLazily({ name }: { name: string }) {
  return Vira.lazyHydration(<SayHi name={name} />, null);
}
class Counter extends Component {
  value = 0;

  changeValue(newValue: number) {
    this.value += newValue;
    this.update();
  }

  render() {
    return (
      <Vira.Fragment>
        {jsx`<div>Counter: ${this.value}</div>`}
        <button onClick={() => this.changeValue(1)}>Increment</button>
        <button onClick={() => this.changeValue(-1)}>Decrement</button>
        <div style={{ height: "1000px" }}></div>
        <HydrateLazily name="Vira" />
      </Vira.Fragment>
    );
  }
}

Vira.render(<Counter />, document.getElementById("root"));
