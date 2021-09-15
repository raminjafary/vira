import { renderElement } from "./index.ts";

export function appendChildren(element: HTMLElement, children: any) {
  if (!Array.isArray(children)) {
    appendChildren(element, [children]);
    return;
  }
  if (typeof children === "object") {
    children = Array.from(children);
  }

  for (const child of children) {
    if (Array.isArray(child)) {
      appendChildren(element, child);
    } else {
      let comp = renderElement(child) as HTMLElement;

      if (comp) {
        if (Array.isArray(comp)) {
          appendChildren(element, comp);
        } else {
          element.appendChild(
            !comp?.nodeType ? document.createTextNode("" + comp) : comp,
          );
        }
      }
    }
  }
}
