import { Visible } from "../components";
import { h, hydrate } from ".";

export function lazyHydration(
  component: any,
  parent: any,
  removeChildNodes = true,
) {
  const cmp = h(Visible, null, component);
  return hydrate(cmp, parent, removeChildNodes);
}
