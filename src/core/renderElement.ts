import { render } from "./render";

export function renderElement(cmp: any): any {
  if (["undefined" || "object"].includes(typeof cmp)) {
    return [];
  }

  if (typeof cmp === "string") {
    return cmp;
  }

  if (typeof cmp === "number") {
    return "" + cmp;
  }

  if (cmp?.tagName) {
    return cmp;
  }

  if (typeof cmp === "function") return renderElement(cmp());

  if (cmp.component && typeof cmp.component === "function") {
    return renderFunctionalComponent(cmp);
  }

  if (Array.isArray(cmp)) {
    return cmp.map((c) => render(c)).flat();
  }
}

function renderFunctionalComponent(cmp: any) {
  const { component, props } = cmp;
  const el = component(props);
  return renderElement(el);
}
