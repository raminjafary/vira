import { visible } from "../components/visible";
import { h, hydrate } from ".";

export function lazyHydration(
  component: any,
  parent: any,
  removeChildNodes = true,
) {
  const cmp = h(visible, null, component);
  return hydrate(cmp, parent, removeChildNodes);
}
