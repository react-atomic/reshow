import setPrototypeOf from "../setPrototypeOf";
import _getPrototypeOf from "../getPrototypeOf";
import _createClass from "../createClass";
import _possibleConstructorReturn from "../possibleConstructorReturn";
import _defineProperty from "../defineProperty";
import _assertThisInitialized from "../assertThisInitialized";
import { expect } from "chai";

describe("Test IE10 Inherit", () => {
  let reset;
  let A;
  let B;
  let C;
  before(() => {
    reset = Object.setPrototypeOf;
    Object.setPrototypeOf = null;
    A = (function () {
      function A() {
        _defineProperty(this, "a_static", function () {
          return "a-static";
        });
      }

      _createClass(A, [
        {
          key: "a_func",
          value: function a_func() {
            return "a-func";
          },
        },
      ]);

      return A;
    })();

    B = (function () {
      setPrototypeOf(B, A, true);
      B.prototype = Object.create(A && A.prototype, {
        constructor: {
          value: B,
          writable: true,
          configurable: true,
        },
      });
      function B() {
        var _getPrototypeOf2;

        var _this = _possibleConstructorReturn(
          this,
          _getPrototypeOf(B).apply(this, arguments),
        );
        _defineProperty(_assertThisInitialized(_this), "b_static", function () {
          return "b-static";
        });
        return _this;
      }

      _createClass(B, [
        {
          key: "b_func",
          value: function b_func() {
            return "b-func";
          },
        },
      ]);

      return B;
    })();

    C = (function () {
      setPrototypeOf(C, B, true);
      C.prototype = Object.create(B && B.prototype, {
        constructor: {
          value: C,
          writable: true,
          configurable: true,
        },
      });
      function C() {
        var _this = _possibleConstructorReturn(
          this,
          _getPrototypeOf(C).apply(this, arguments),
        );
        _defineProperty(_assertThisInitialized(_this), "c_static", function () {
          return "c-static";
        });
        return _this;
      }

      _createClass(C, [
        {
          key: "c_func",
          value: function c_func() {
            return "c-func";
          },
        },
      ]);

      return C;
    })();
  });

  after(() => {
    Object.setPrototypeOf = reset;
  });

  it("Test inherits", () => {
    Object.setPrototypeOf = null;
    const obj = new C();
    expect(obj.a_static()).to.equal("a-static");
    expect(obj.b_static()).to.equal("b-static");
    expect(obj.c_static()).to.equal("c-static");
    expect(obj.a_func()).to.equal("a-func");
    expect(obj.b_func()).to.equal("b-func");
    expect(obj.c_func()).to.equal("c-func");
  });
});
