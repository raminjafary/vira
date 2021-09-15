import { Component, h, render } from "../core/index.ts";

export class Visible extends Component {
  private isVisible = false;

  mount() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            this.isVisible = true;
            this.update();
          }
        }
      },
      { threshold: [0, 1] },
    );

    observer.observe(this.elements[0]);
  }
  render() {
    if (this.isVisible) {
      if (this.props.onVisible) {
        this.props.onVisible();
      }
      return render(this.props.component || this.props.children[0]);
    } else {
      return h("div", { "data-visible": false, visibility: "hidden" });
    }
  }
}
