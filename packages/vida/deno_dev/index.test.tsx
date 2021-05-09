// @deno-types="../../../typings/global.d.ts"
import { h, Helmet, renderToString, Component } from "../deno_lib/mod.ts";
import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";

Deno.test("should render without errors", () => {
  const comments = ["Comment One", "Comment Two"];

  class Comments extends Component {
    render() {
      return (
        <ul>
          {this.props.comments.map((comment: any) => {
            return <li>{comment}</li>;
          })}
        </ul>
      );
    }
  }

  const App = () => (
    <div>
      <Helmet>
        <title>vida</title>
        <meta name="description" content="vida" />
      </Helmet>

      <Helmet footer>
        <script src="/bundle.js"></script>
      </Helmet>

      <h2>Comments</h2>
      <div id="comments">
        <Comments comments={comments} />
      </div>
    </div>
  );

  const ssr = renderToString(<App />);
  const { body, head, footer } = Helmet.SSR(ssr);
  console.log(ssr);

  assertEquals(
    body,
    '<div><h2>Comments</h2><div id="comments"><ul><li>Comment One</li><li>Comment Two</li></ul></div></div>',
  );
  assertEquals(
    head.join("\n"),
    '<title>vida</title><meta name="description" content="vida" />',
  );
  assertEquals(footer.join("\n"), '<script src="/bundle.js"></script>');
});
