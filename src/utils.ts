export function nextTick() {
  return typeof Promise === "function"
    ? Promise.prototype.then.call(Promise.resolve())
    : setTimeout;
}

export function isEvent(el: any, prop: string) {
  if (!~prop.indexOf("on")) {
    return false;
  }
  return ["function", "object"].includes(typeof el[prop]);
}
