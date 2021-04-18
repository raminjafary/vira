import { Helmet } from "../components/helmet";
import { Component, h, Fragment } from ".";

export function withStyles(style: any): any {
  return function (wrapperComponent: any) {
    return class extends Component {
      render() {
        const { children, ...rest } = this.props;

        const helmet = h(Helmet, null, h("style", null, "" + style));

        const component = children.length
          ? h(wrapperComponent, { ...rest }, children)
          : h(wrapperComponent, { ...this.props });

        return h(Fragment, null, helmet, component);
      }
    };
  };
}
