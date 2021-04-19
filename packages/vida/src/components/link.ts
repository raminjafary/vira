import { Component, Fragment, h } from "../core";
import { Helmet } from "./helmet";

export class Link extends Component {
  mount() {
    const { prefetch, href, delay, back = false } = this.props;

    if (back) {
      this.elements[0].addEventListener(
        "click",
        function onClick(this: Link, e: Event) {
          e.preventDefault();
          const target = e.target as HTMLLinkElement;
          if (target.href === document.referrer) {
            window.history.back();
          } else {
            window.location.href = href;
          }
        }.bind(this),
      );
    }

    if (delay) {
      this.elements[0].addEventListener(
        "click",
        function onClick(this: Link, e: Event) {
          e.preventDefault();
          setTimeout(() => {
            window.location.href = href;
          }, delay);
        }.bind(this),
      );
    }

    if (prefetch) {
      if (prefetch === "hover") {
        this.prefetchOnHover();
      } else if (prefetch === "visible") {
        this.prefetchOnVisible();
      } else {
        this.addPrefetch();
      }
    }
  }

  prefetchOnHover() {
    this.elements[0].addEventListener(
      "mouseover",
      function onHover(this: Link) {
        this.addPrefetch();
      }.bind(this),
      { once: true },
    );
  }

  prefetchOnVisible() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            this.addPrefetch();
          }
        }
      },
      { threshold: [0, 1] },
    );
    observer.observe(this.elements[0]);
  }

  addPrefetch() {
    let exists = false;

    const links = document.getElementsByTagName("link");

    for (const link of links) {
      if (
        link.getAttribute("rel") === "prefetch" &&
        link.getAttribute("href") === this.props.href
      ) {
        exists = true;
      }
    }

    if (!exists) {
      const prefetch = h("link", {
        rel: "prefetch",
        href: this.props.href,
        as: "document",
      });
      document.head.appendChild(prefetch);
    }
  }

  render() {
    const {
      children,
      prefetch,
      delay,
      back = false,
      ref,
      ...rest
    } = this.props;

    const a = h("a", { ...rest }, ...children);

    if (prefetch && isSSR) {
      const link = h("link", {
        rel: "prefetch",
        href: this.props.href,
        as: "document",
      });
      const helmet = h(Helmet, null, link);
      return h(Fragment, null, [helmet, a]);
    } else {
      return a;
    }
  }
}
