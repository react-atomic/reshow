//@ts-check

import { expect } from "chai";

import {
  UNDEFINED,
  FUNCTION,
  OBJECT,
  STRING,
  SYMBOL,
  DEFAULT,
  SCRIPT,
  TYPE_ERROR,
  T_UNDEFINED,
  T_NULL,
  T_TRUE,
  T_FALSE,
  KEYS,
  IS_ARRAY,
  OBJ_SIZE,
  NEW_OBJ,
  HAS,
  REAL_TIME_URL,
  REAL_TIME_DATA_KEY,
} from "../index";

describe("Test Constant", () => {
  it("test default", () => {
    expect(DEFAULT).to.equal("default");
  });

  it("test script", () => {
    expect(SCRIPT).to.equal("script");
  });

  it("test TYPE_ERROR", () => {
    expect(TYPE_ERROR).to.equal("TypeError");
  });
});

describe("Test Basic Type", () => {
  it("test undefined", () => {
    expect(UNDEFINED).to.equal("undefined");
  });

  it("test function", () => {
    expect(FUNCTION).to.equal("function");
  });

  it("test object", () => {
    expect(OBJECT).to.equal("object");
  });

  it("test string", () => {
    expect(STRING).to.equal("string");
  });

  it("test symbol", () => {
    expect(SYMBOL).to.equal("symbol");
  });
});

describe("Test Type", () => {
  it("test type undefined", () => {
    expect(T_UNDEFINED).to.be.undefined;
  });

  it("test type null", () => {
    expect(T_NULL).to.be.null;
  });

  it("test type true", () => {
    expect(T_TRUE).to.be.true;
  });

  it("test type false", () => {
    expect(T_FALSE).to.be.false;
  });
});

describe("Test FUNCTION", () => {
  it("test keys", () => {
    const a = { foo: "bar" };
    expect(KEYS(a)).to.deep.equal(["foo"]);
  });

  describe("Test IS_ARRAY", () => {
    it("test isArray to true", () => {
      const a = ["foo"];
      expect(IS_ARRAY(a)).to.be.true;
    });

    it("test is not Array", () => {
      const a = { foo: "bar" };
      expect(IS_ARRAY(a)).to.be.false;
    });
  });

  describe("Test OBJ_SIZE", () => {
    it("test is empty obj", () => {
      expect(OBJ_SIZE(null)).to.equal(0);
    });

    it("test is empty obj length", () => {
      expect(OBJ_SIZE({})).to.equal(0);
    });

    it("test is not empty obj", () => {
      expect(OBJ_SIZE({ foo: "bar" })).to.equal(1);
    });
  });

  describe("Test NEW_OBJ", () => {
    it("basic", () => {
      expect(NEW_OBJ()).to.deep.equal({});
    });
  });

  describe("Test HAS", () => {
    it("test hasOwnProperty", () => {
      expect(HAS({ foo: "bar" }, "foo")).to.be.true;
    });
    it("test Object.create(null)", () => {
      const foo = Object.create(null);
      foo.prop = "exists";
      expect(HAS(foo, "prop")).to.be.true;
    });
    it("test null or undefined", () => {
      expect(HAS(null)).to.be.false;
      expect(HAS(undefined)).to.be.false;
    });
    it("test key is null  or undefined", () => {
      expect(HAS({}, null)).to.be.false;
      expect(HAS({}, undefined)).to.be.false;
    });
  });
});

describe("Test Reshow Specific", () => {
  it("test REAL_TIME_URL", () => {
    expect(REAL_TIME_URL).to.equal("--rtime-url--");
  });
  it("test REAL_TIME_DATA_KEY", () => {
    expect(REAL_TIME_DATA_KEY).to.equal("--rtime-data--");
  });
});
