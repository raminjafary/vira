import { render } from ".";

export function hydrate(
  component: any,
  parent: HTMLElement | null = null,
  removeChildNodes = true,
) {
  return render(component, parent, removeChildNodes);
}
