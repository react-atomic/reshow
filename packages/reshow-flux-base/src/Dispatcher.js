import "setimmediate";
import { STRING } from "reshow-constant";
import callfunc from "call-func";

const Dispatcher = () => {
  let isRunning = false;
  const cbs = [];
  const register = (cb) => cbs.push(cb);

  const dispatch = (payload, params, asyncCallback) => {
    payload = payload || {};
    if (STRING === typeof payload) {
      payload = { type: payload, params };
      !params && delete payload.params;
    }

    const run = (bAsync, warning) => {
      const trigger = () => {
        if (isRunning && warning) {
          console.warn("Should avoid nested dispath");
        }
        cbs.forEach((c) => c(payload));
        callfunc(asyncCallback, [isRunning]);
      };
      if (bAsync) {
        setImmediate(() => trigger());
      } else {
        trigger();
      }
    };

    if (isRunning) {
      run(false !== asyncCallback, true);
    } else {
      isRunning = true;
      run(false);
      isRunning = false;
    }
  };
  return { register, dispatch };
};

export default Dispatcher;
