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

    const run = (bReset) => {
      const trigger = () => {
        cbs.forEach((c) => c(payload));
        if (bReset) {
          isRunning = false;
        }
      };
      if (false === asyncCallback) {
        trigger();
      } else {
        setImmediate(() => {
          trigger();
          callfunc(asyncCallback, [isRunning]);
        });
      }
    };

    if (isRunning) {
      run();
      console.warn("Should avoid nested dispath");
    } else {
      isRunning = true;
      run(true);
    }
  };
  return { register, dispatch };
};

export default Dispatcher;
