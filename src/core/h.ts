import { isEvent } from "../utils";
import { appendChildren } from "./appendChildren";

export function h(comp: any, props: any, ...children: any[]): any {
  if (typeof comp !== "string") {
    return { component: comp, props: { ...props, children: children } };
  }

  const element = document.createElement(comp) as HTMLElement;

  for (const p in props) {
    if (p === "style" && typeof props[p] === "object") {
      const styles = Object.keys(props[p])
        .map((k) => `${k}:${props[p][k]}`)
        .join(";")
        .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      props[p] = styles + ";";
    }

    if (isEvent(element, p.toLowerCase())) {
      element.addEventListener(p.toLowerCase().substring(2), (e: Event) =>
        props[p](e),
      );
    } else {
      element.setAttribute(p, props[p]);
    }
  }
  appendChildren(element, children);
  return element;
}
