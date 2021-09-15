import { appendChildren, renderElement } from "./index.ts";

export function render(
  cmp: any,
  parent: HTMLElement | any = null,
  removeChildNodes = true,
) {
  let el = renderElement(cmp);

  if (Array.isArray(el)) {
    el = el.map((c) => renderElement(c));
    if (el.length === 1) {
      el = el[0];
    }
  }

  if (parent) {
    if (removeChildNodes) {
      removeAllChildNodes(parent);
    }

    if (el && parent.id && parent.id === el.id && parent.parentElement) {
      parent.parentElement.replaceChild(el, parent);
    } else {
      if (Array.isArray(el)) {
        el.map((c) => appendChildren(parent, renderElement(c)));
      } else {
        appendChildren(parent, renderElement(el));
      }
    }
    if (parent.ssr) return parent.ssr;
    return parent;
  } else {
    if (typeof isSSR === "boolean" && isSSR && !Array.isArray(el)) return [el];
    return el;
  }
}

export function removeAllChildNodes(el: HTMLElement) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
