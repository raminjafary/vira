import { Component, h } from "../core/index.ts";
import { strToHash } from "../utils.ts";

export class Img extends Component {
  constructor(props: any) {
    super(props);

    const { key, src } = this.props;
    this.id = strToHash(src) + "-" + strToHash(JSON.stringify(this.props));
    if (key) {
      this.id += `$key-${key}`;
    }

    if (!this.state) {
      this.setState({ image: "", isLoaded: false });
    }
  }

  mount() {
    const {
      lazy = true,
      placeholder,
      key,
      ref,
      children,
      ...rest
    } = this.props;

    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            this.state.image = h("img", { ...rest });
            if (this.state.image.complete) {
              this.state.isLoaded = true;
              this.update();
            } else {
              this.state.image.onload = () => {
                this.state.isLoaded = true;
                this.update();
              };
            }
          }
        }
      },
      { threshold: [0, 1] },
    );

    observer.observe(this.elements[0]);
  }

  render() {
    const {
      lazy = true,
      src,
      placeholder,
      key,
      ref,
      children,
      ...rest
    } = this.props;

    if (!lazy) {
      this.state.image = h("img", { src, ...rest });
      return this.state.image;
    }

    if (this.state.isLoaded) {
      return this.state.image;
    } else if (typeof placeholder === "string") {
      return h("img", { src: placeholder, ...rest });
    } else if (typeof placeholder === "function") {
      return placeholder();
    } else {
      const style = {
        backgroundColor: "lightgray",
        width: "100px",
        height: "100px",
      };

      const { width, height, ...others } = rest;
      if (width) {
        style.width = width;
      }
      if (height) {
        style.height = height;
      }
      return h("div", { style, ...others });
    }
  }
}
