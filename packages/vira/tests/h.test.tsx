import Vira from "../lib";
import { waitUntil } from "./utils.js";

const log = jest.spyOn(global.console, "error");

describe("events", () => {
  it("should fire onClick without errors", async (done) => {
    const Component = () => (
      <button
        onClick={() => {
          console.log("clicked!");
        }}
      >
        click
      </button>
    );

    Vira.render(<Component />);
    await waitUntil(200);
    expect(log).not.toHaveBeenCalled();
    done();
  });
});
