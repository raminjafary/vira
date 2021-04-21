import { h, renderElement, Component } from "../core";

const instances: any[] = [];

function register(comp: any) {
  instances.push(comp);
}

function unregister(comp: any) {
  instances.splice(instances.indexOf(comp), 1);
}

function historyPush(path: string) {
  window.history.pushState({}, "", path);
  for (const instance of instances) {
    instance.forceUpdate();
  }
}

function historyReplace(path: string) {
  window.history.replaceState({}, "", path);
  for (const instance of instances) {
    instance.forceUpdate();
  }
}

function matchPath(
  pathname: string,
  options: {
    exact?: boolean;
    path: string;
    regex?: { [param: string]: RegExp };
  },
) {
  const { exact = false, regex } = options;
  let { path } = options;

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    };
  }

  let match;
  let params = {};

  // path with params
  if (path.includes("/:")) {
    const pathArr = path.split("/");
    const pathnameArr = pathname.split("/");
    pathArr.forEach((p, i) => {
      if (/^:/.test(p)) {
        const key = p.slice(1);
        const value = pathnameArr[i];

        // if a regex is provided, check it it matches
        if (regex && regex[key]) {
          const regexMatch = regex[key].test(value);
          if (!regexMatch) return null;
        }

        params = { ...params, [key]: value };

        pathArr[i] = pathnameArr[i];
      }
    });
    path = pathArr.join("/");
  }

  // catch all
  if (path === "*") match = [pathname];

  // regular path
  if (!match) match = new RegExp(`^${path}`).exec(pathname);

  if (!match) return null;

  const url = match[0];
  const isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path,
    url,
    isExact,
    params,
  };
}

export class Switch extends Component<{ fallback?: any; children?: any }> {
  index: number = 0;
  path: string = "";
  match = { index: -1, path: "" };

  mount() {
    window.addEventListener("popstate", this.forceUpdate.bind(this));
    register(this);
  }

  destroy() {
    unregister(this);
    window.removeEventListener("popstate", this.forceUpdate.bind(this));
  }

  forceUpdate() {
    this.findChild();
    if (this.shouldUpdate()) this.update();
  }

  findChild() {
    this.match = { index: -1, path: "" };

    for (const [i, child] of this.props.children.entries()) {
      const { path, exact, regex } = child.props;
      const match = matchPath(
        typeof isSSR !== "undefined"
          ? _nano.location.pathname
          : window.location.pathname,
        {
          path,
          exact,
          regex,
        },
      );
      if (match) {
        this.match.index = i;
        this.match.path = path;
        return;
      }
    }
  }

  shouldUpdate() {
    console.log(this.path);
    console.log(this.match.path);

    return this.path !== this.match.path || this.index !== this.match.index;
  }

  render() {
    this.findChild();

    const child = this.props.children[this.match.index];

    if (child) {
      const { path } = child.props;
      this.path = path;
      this.index = this.match.index;
      const el = renderElement(child);
      return renderElement(el);
    } else if (this.props.fallback) {
      return renderElement(this.props.fallback);
    } else {
      return h("div", { class: "route" }, "not found");
    }
  }
}

export function Route({
  path,
  regex,
  children,
}: {
  exact?: boolean;
  path: string;
  regex?: { [param: string]: RegExp };
  children?: any;
}) {
  for (const child of children) {
    if (child.props) child.props = { ...child.props, route: { path, regex } };
  }

  return children;
}

export const to = (to: string, replace: boolean = false) => {
  replace ? historyReplace(to) : historyPush(to);
};

export function Link({
  to,
  replace,
  children,
}: {
  to: string;
  replace?: boolean;
  children?: any;
}) {
  function onClick(event: Event) {
    event.preventDefault();
    replace ? historyReplace(to) : historyPush(to);
  }

  return h("a", { href: to, onClick }, children);
}
