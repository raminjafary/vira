import { nextTick, strToHash } from "../utils";

export function renderElement(cmp: any): any {
  if (["undefined" || "object"].includes(typeof cmp)) {
    return [];
  }

  if (cmp == null) {
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

  if (
    cmp?.component &&
    cmp.component.prototype &&
    cmp.component.prototype.constructor
  ) {
    return renderClassComponent(cmp);
  }

  if (cmp.component && typeof cmp.component === "function") {
    return renderFunctionalComponent(cmp);
  }

  if (Array.isArray(cmp)) {
    return cmp.map((c) => renderElement(c)).flat();
  }

  if (typeof cmp === "function") return renderElement(cmp());

  if (cmp?.component?.tagName && typeof cmp.component.tagName === "string")
    return renderElement(cmp.component);

  if (Array.isArray(cmp.component)) return renderElement(cmp.component);

  if (cmp.component) return renderElement(cmp.component);
}

function renderFunctionalComponent(cmp: any) {
  const { component, props } = cmp;
  const el = component(props);
  return renderElement(el);
}

function renderClassComponent(cmp: any) {
  const { component, props } = cmp;

  const hash = strToHash(component.toString());

  component.prototype._getHash = () => hash;

  const Component = new component(props);

  Component.beforeMount();

  let el = Component.render();
  el = renderElement(el);

  Component.elements = el;

  if (props?.ref) props.ref(Component);
  //@ts-ignore
  if (typeof globalThis.isSSR === "undefined") {
    nextTick(() => {
      Component._mount();
    });
  }
  return el;
}
