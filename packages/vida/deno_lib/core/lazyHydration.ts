import { Visible } from "../components/index.ts";
import { h, hydrate } from "./index.ts";

export function lazyHydration(
  component: any,
  parent: any,
  removeChildNodes = true,
) {
  const cmp = h(Visible, null, component);
  return hydrate(cmp, parent, removeChildNodes);
}
