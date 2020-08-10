import "setimmediate";
import { STRING } from "reshow-constant";
import callfunc from "call-func";

const Dispatcher = () => {
  let isRunning = false;
  const cbs = [];
  const register = (cb) => cbs.push(cb);

  const dispatch = (payload, params, callback) => {
    payload = payload || {};
    if (STRING === typeof payload) {
      payload = { type: payload, params };
      !params && delete payload.params;
    }
    if (isRunning) {
      setImmediate(() => {
        cbs.forEach((c) => c(payload));
        callfunc(callback, [isRunning]);
      });
      console.warn("Should avoid nested dispath");
    } else {
      isRunning = true;
      setImmediate(() => {
        cbs.forEach((c) => c(payload));
        isRunning = false;
        callfunc(callback, [isRunning]);
      });
    }
  };
  return { register, dispatch };
};

export default Dispatcher;
