import { h } from "../";

export const nextTick =
  typeof Promise === "function"
    ? Promise.prototype.then.bind(Promise.resolve())
    : setTimeout;

export function isEvent(el: any, prop: string) {
  if (!~prop.indexOf("on")) {
    return false;
  }
  if (el.ssr) return true;
  return ["function", "object"].includes(typeof el[prop]);
}

export function detectSSR() {
  //@ts-ignore
  return typeof Deno !== "undefined" || typeof window === "undefined";
}

export function strToHash(str: string) {
  let hash = 0;

  if (!str.length) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(32);
}

export function isDescendant(descendant: any, root: any): boolean {
  return (
    descendant &&
    (descendant === root || isDescendant(descendant.parentNode, root))
  );
}

export function onNodeRemove(el: HTMLElement, callback: () => any) {
  let observer = new MutationObserver((mutList) => {
    for (const mut of mutList) {
      mut.removedNodes.forEach((removedNode) => {
        if (isDescendant(el, removedNode)) {
          callback();
          if (observer) {
            observer.disconnect();
            // @ts-ignore
            observer = undefined;
          }
        }
      });
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
  return observer;
}

export function task(func: () => void) {
  return setTimeout(func, 0);
}

export function nodeToString(node: any) {
  const temp = document.createDocumentFragment();
  temp.appendChild(node.cloneNode(true));
  return temp.toString();
}

export const addStylesToHead = (styles: string, hash: string) => {
  const el = document.querySelector(`[data-css-hash*="${hash}"]`);
  if (!el) {
    const styleElement = h("style", { "data-css-hash": hash }, styles);
    document.head.appendChild(styleElement);
  }
};
