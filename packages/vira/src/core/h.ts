import { isEvent } from "../utils";
import { appendChildren, hNS } from ".";

export function h(comp: any, props: any, ...children: any[]): any {
  if (typeof comp !== "string") {
    return { component: comp, props: { ...props, children: children } };
  }

  let ref;

  const element =
    comp === "svg"
      ? (hNS("svg") as SVGElement)
      : (document.createElement(comp) as HTMLElement);

  for (const p in props) {
    if (p === "style" && typeof props[p] === "object") {
      const styles = Object.keys(props[p])
        .map((k) => `${k}:${props[p][k]}`)
        .join(";")
        .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      props[p] = styles + ";";
    }

    if (p === "ref") {
      ref = props[p];
    }

    if (isEvent(element, p.toLowerCase())) {
      element.addEventListener(p.toLowerCase().substring(2), (e: Event) =>
        props[p](e),
      );
    } else {
      element.setAttribute(p, props[p]);
    }
  }
  appendChildren(element as any, children);

  if (ref) {
    ref(element);
  }
  // @ts-ignore
  if (element.ssr) return element.ssr;
  return element;
}
