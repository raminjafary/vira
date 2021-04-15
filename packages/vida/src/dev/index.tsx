import { Component, Fragment } from "../core";
import * as Vida from "../core";

const ShowCount = ({ count }: { count: number }) => <div>Counter: {count}</div>;
class Counter extends Component {
  value = 0;

  changeValue(newValue: number) {
    this.value += newValue;
    this.update();
  }

  render() {
    return (
      <Fragment>
        <ShowCount count={this.value} />
        <button onClick={() => this.changeValue(1)}>Increment</button>
        <button onClick={() => this.changeValue(-1)}>Decrement</button>
      </Fragment>
    );
  }
}

Vida.render(<Counter />, document.getElementById("root"));
