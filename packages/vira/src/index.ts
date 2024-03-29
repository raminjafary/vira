export { nextTick } from "./utils";
export { renderToString } from "./ssr";
export {
  h,
  render,
  hydrate,
  Fragment,
  Component,
  withStyles,
  createContext,
  lazyHydration,
  Store,
} from "./core";
export {
  Suspense,
  Link,
  Switch,
  Route,
  ViraLink,
  Img,
  Helmet,
  Visible,
} from "./components";

import { h, render, hydrate, lazyHydration, Fragment } from "./core";
import { renderToString } from "./ssr";
export default {
  render,
  hydrate,
  h,
  lazyHydration,
  renderToString,
  Fragment,
};
