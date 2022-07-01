import { expect } from "chai";
import { act, render, waitFor, cleanIt } from "reshow-unit";

import useImmutable from "../useImmutable";
import { Map } from "../ImmutableStore";

describe("useImmutable Test", () => {
  afterEach(() => cleanIt());

  it("basic test", () => {
    const Comp = (props) => {
      const [state, setState] = useImmutable({ foo: "bar" });
      return <div>{state.get("foo")}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });

  it("test basic set", async () => {
    let gSet;
    const Comp = (props) => {
      const [state, setState] = useImmutable({ foo: "bar" });
      gSet = setState;
      return <div>{state.get("foo")}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>bar</div>");
    await act(() => gSet({ foo: "bar1" }), 5);
    expect(wrap.html()).to.equal("<div>bar1</div>");
  });

  it("test set empty", async () => {
    let gSet;
    const Comp = (props) => {
      const [state, setState] = useImmutable({ foo: "bar" });
      gSet = setState;
      return <div>{state.get("foo")}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>bar</div>");
    await act(() => gSet(), 5);
    expect(wrap.html()).to.equal("<div>bar</div>");
  });

  ["", Map(), {}].forEach((v) => {
    it(`test set empty with [${v}]`, async () => {
      let gSet;
      let gState;
      const Comp = (props) => {
        const [state, setState] = useImmutable({ foo: "bar" });
        gSet = setState;
        gState = state;
        return <div>{state.get("foo")}</div>;
      };
      const wrap = render(<Comp />);
      expect(wrap.html()).to.equal("<div>bar</div>");
      await act(() => gSet(v), 5);
      expect(gState.toJS()).to.deep.equal({ foo: "bar" });
      expect(wrap.html()).to.equal("<div>bar</div>");
    });
  });

  /**
   * dispatch will change string to type,
   * so it will store to key of type.
   */
  it("test string will set to type", async () => {
    let gSet;
    let gState;
    const Comp = (props) => {
      const [state, setState] = useImmutable({ foo: "bar" });
      gSet = setState;
      gState = state;
      return <div>{state.get("foo")}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>bar</div>");
    expect(gState.get("type")).to.be.undefined;
    await act(() => gSet("foo"), 5);
    expect(wrap.html()).to.equal("<div>bar</div>");
    await waitFor(() => expect(gState.get("type")).to.equal("foo"));
  });

  /**
   * In this case, sting could not merge with map,
   * will return original state.
   */
  it("test string with callback function", async () => {
    let gSet;
    let gState;
    const Comp = (props) => {
      const [state, setState] = useImmutable({ foo: "bar" });
      gSet = setState;
      gState = state;
      return <div>{state.get("foo")}</div>;
    };
    const wrap = render(<Comp />);
    expect(wrap.html()).to.equal("<div>bar</div>");
    expect(gState.get("type")).to.be.undefined;
    await act(() => gSet(() => "foo"), 5);
    expect(wrap.html()).to.equal("<div>bar</div>");
    expect(gState.toJS()).to.deep.equal({ type: "foo", foo: "bar" });
  });

  [
    {
      init: Map({ foo: "bar" }),
      set: Map({ foo: "barbar" }),
      desc: "Map",
    },
    {
      init: () => Map({ foo: "bar" }),
      set: () => Map({ foo: "barbar" }),
      desc: "Function and Map",
    },
  ].forEach((v) => {
    it(`test set with ${v.desc}`, async () => {
      let gSet;
      const Comp = (props) => {
        const [state, setState] = useImmutable(v.init);
        gSet = setState;
        return <div>{state.get("foo")}</div>;
      };
      const wrap = render(<Comp />);
      expect(wrap.html()).to.equal("<div>bar</div>");
      await act(() => gSet(v.set), 5);
      expect(wrap.html()).to.equal("<div>barbar</div>");
    });
  });
});
