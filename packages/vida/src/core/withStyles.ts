import { Helmet } from "../components";
import { Component, h, Fragment } from ".";

export function withStyles(styles: any): any {
  return function (WrappedComponent: any) {
    return class extends Component {
      render() {
        const { children, ...rest } = this.props;

        const helmet = h(Helmet, null, h("style", null, styles.toString()));

        const component = children.length
          ? h(WrappedComponent, { ...rest }, children)
          : h(WrappedComponent, { ...this.props });

        return h(Fragment, null, helmet, component);
      }
    };
  };
}
