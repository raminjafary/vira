import { appendChildren, Component, h } from "../core";

export class Helmet extends Component {
  static SSR(body: string) {
    const reg = /(<helmet\b[^>]*>)((.|\n)*?)(<\/helmet>)/gm;

    const head: string[] = [];
    const footer: string[] = [];

    if (document?.head) {
      let children = document.head.children as unknown as string[];

      for (let i = 0; i < children.length; i++) {
        if (head.indexOf(children[i]) === -1) {
          head.push(children[i]);
        }
      }
    }

    let result;

    while ((result = reg.exec(body)) != null) {
      const first = result[1];
      const second = result[2];

      const toHead = first.includes('data-placement="head"');

      if (toHead && !head.includes(second)) head.push(second);
      else if (!footer.includes(second)) footer.push(second);
    }

    const cleanBody = body.replace(reg, "");
    return {
      body: cleanBody,
      head,
      footer,
    };
  }

  mount() {
    for (const element of this.props.children) {
      const parent = this.props.footer ? document.body : document.head;
      const tag = (element as HTMLElement).tagName;
      let attrs: string[] = [];

      attrs.push(element.innerText);

      for (let i = 0; i < element.attributes.length; i++) {
        attrs.push(element.attributes.item(i)?.name.toLowerCase());
        attrs.push(element.attributes.item(i)?.value.toLowerCase());
      }

      if (tag === "HTML" || tag === "BODY") {
        const htmlTag = document.getElementsByTagName(tag)[0];
        for (let i = 1; i < element.attributes.length; i += 2) {
          htmlTag.setAttribute(attrs[i], attrs[i + 1]);
        }
        return;
      } else if (tag === "TITLE") {
        const titleTag = document.getElementsByTagName(
          tag,
        ) as HTMLCollectionOf<HTMLTitleElement>;

        if (titleTag.length) {
          titleTag[0].text = element.text;
        } else {
          const titleTag = h(
            "title",
            null,
            element.innerHTML,
          ) as HTMLTitleElement;
          parent.appendChild(titleTag);
        }
        return;
      }

      let exists = false;
      attrs = attrs.sort();

      const el = document.getElementsByTagName(
        tag,
      ) as HTMLCollectionOf<HTMLElement>;

      for (let i = 0; i < el.length; i++) {
        let attrs2: string[] = [];

        attrs2.push(el[i].innerText);

        for (let j = 0; j < el[i].attributes.length; j++) {
          attrs2.push(el[i].attributes.item(j)?.name.toLowerCase() as string);
          attrs2.push(el[i].attributes.item(j)?.value.toLowerCase() as string);
        }
        attrs2 = attrs2.sort();

        if (
          attrs.length > 0 &&
          attrs2.length > 0 &&
          JSON.stringify(attrs) === JSON.stringify(attrs2)
        )
          exists = true;
      }

      if (!exists) {
        appendChildren(parent, element);
      }
    }
  }

  render() {
    if (isSSR) {
      return h(
        "helmet",
        {
          "data-ssr": true,
          "data-placement": this.props.footer ? "footer" : "head",
        },
        this.props.children,
      );
    } else {
      return [];
    }
  }
}
