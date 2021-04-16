import { Component } from "../core";
import { strToHash } from "../utils";

export class Suspense extends Component {
  private isReady = false;

  constructor(props: any) {
    super(props);

    const { fallback, cache, children, ...rest } = this.props;

    this.id = strToHash(
      JSON.stringify(rest, function (_key, val) {
        return typeof val === "function" ? `${val}` : val;
      }),
    );
  }

  async mount() {
    const { fallback, cache = false, children, ...rest } = this.props;

    const promises = Object.values(rest).map((p: any) => p());
    const resolved = await Promise.all(promises);
    const data = this.prepareData(rest, resolved, cache);

    this.addDataToChildren(data);

    this.isReady = true;
    this.update();
  }

  private ssr() {
    const { fallback, cache = false, children, ...rest } = this.props;

    const funcs = Object.values(rest).map((p: any) => p());

    const data = this.prepareData(rest, funcs, cache);

    this.addDataToChildren(data);
  }

  private addDataToChildren(data: any) {
    for (const child of this.props.children) {
      if (child.props) {
        child.props = { ...child.props, ...data };
      }
    }
  }

  private prepareData(rest: any, func: any, _cache: boolean) {
    const data = Object.keys(rest).reduce((acc, item, index) => {
      // if (cache) {
      //   void 0;
      // }
      return {
        ...acc,
        [item]: func[index],
      };
    }, {});
    return data;
  }

  render() {
    if (typeof isSSR === "undefined") {
      return this.isReady ? this.props.children : this.props.fallback;
    } else {
      this.ssr();
      return this.props.children;
    }
  }
}
