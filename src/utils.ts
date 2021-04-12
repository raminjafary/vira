export function nextTick() {
  return typeof Promise === "function"
    ? Promise.prototype.then.call(Promise.resolve())
    : setTimeout;
}

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
