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
  return hash;
}
