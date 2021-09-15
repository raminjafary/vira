import { Component } from "../core";
import { strToHash } from "../utils";

export class Suspense extends Component {
  private isReady = false;

  constructor(props: any) {
    super(props);

    const { fallback, cache = false, children, ...rest } = this.props;

    this.id = strToHash(
      JSON.stringify(rest, function (_key, val) {
        return typeof val === "function" ? `${val}` : val;
      }),
    );
  }

  async mount() {
    const { fallback, cache = false, children, ...rest } = this.props;

    if (cache) this.initialState = {};

    if (this.loadFromCache(cache)) return;

    const promises = Object.values(rest).map((p: any) => p());
    const resolved = await Promise.all(promises);
    const data = this.prepareData(rest, resolved, cache);

    this.addDataToChildren(data);

    this.isReady = true;
    this.update();
  }

  private loadFromCache(cache: boolean) {
    const cached = this.state && cache && Object.keys(this.state).length;

    if (cache) {
      this.addDataToChildren(this.state);
      this.isReady = true;
    }

    return cached;
  }

  private ssr() {
    const { fallback, cache = false, children, ...rest } = this.props;

    const funcs = Object.values(rest).map((p: any) => p());

    const data = this.prepareData(rest, funcs, false);

    this.addDataToChildren(data);
  }

  private addDataToChildren(data: any) {
    for (const child of this.props.children) {
      if (child.props) {
        child.props = { ...child.props, ...data };
      }
    }
  }

  private prepareData(rest: any, func: any, cache: boolean) {
    const data = Object.keys(rest).reduce((acc, item, index) => {
      if (cache) {
        this.state = { ...this.state, [item]: func[index] };
      }
      return {
        ...acc,
        [item]: func[index],
      };
    }, {});
    return data;
  }

  render() {
    if (typeof isSSR === "undefined") {
      const { cache = false } = this.props;
      this.loadFromCache(cache);
      return this.isReady ? this.props.children : this.props.fallback;
    } else {
      this.ssr();
      return this.props.children;
    }
  }
}
