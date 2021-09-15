export { nextTick } from "./utils.ts";
export { renderToString } from "./ssr/index.ts";
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
} from "./core/index.ts";
export {
  Suspense,
  Link,
  Switch,
  Route,
  ViraLink,
  Img,
  Helmet,
  Visible,
} from "./components/index.ts";

import { h, render, hydrate, lazyHydration, Fragment } from "./core/index.ts";
import { renderToString } from "./ssr/index.ts";
export default {
  render,
  hydrate,
  h,
  lazyHydration,
  renderToString,
  Fragment,
};
