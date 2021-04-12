import Vida from "../../../vida/lib/bundles/main";
import Counter from "../components/counter";
import HelloWorld from "../components/HelloWorld";

export default () => (
  <div>
    <HelloWorld />
    <a href="/about">About</a>

    <script async src="/public/js/home.hydrate.js"></script>
    <div id="counter"></div>
  </div>
);
