declare var isSSR: boolean | undefined;
declare var _nano: any;
declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [element: string]: any;
  }
}

declare module "*.css" {
  const styles: any;
  export default styles;
}

declare module "*.scss" {
  const styles: any;
  export default styles;
}

declare module "*.sass" {
  const styles: any;
  export default styles;
}
