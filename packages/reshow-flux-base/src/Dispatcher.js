import { STRING } from "reshow-constant";
import callfunc from "call-func";

const Dispatcher = () => {
  let isRunning = false;
  const cbs = [];
  const register = (cb) => cbs.push(cb);

  /**
   * Set asyncCallback to false for dispatch run as sync
   */
  const dispatch = (payload, params, asyncCallback) => {
    payload = payload || {};
    if (STRING === typeof payload) {
      payload = { type: payload, params };
      !params && delete payload.params;
    }

    const run = (bAsync, warning) => {
      const trigger = () => {
        cbs.forEach((c) => c(payload));
        callfunc(asyncCallback, [isRunning]);
        if (warning && (isRunning || dispatch.debug)) {
          console.warn("Should avoid nested dispath", { bAsync });
        } else if (dispatch.debug) {
          console.warn("DEBUG:: [Normal dispatch]", { bAsync });
        }
      };
      if (bAsync) {
        setTimeout(trigger);
      } else {
        trigger();
      }
    };

    if (isRunning) {
      run(false !== asyncCallback, true);
    } else {
      try {
        isRunning = true;
        run(false);
        isRunning = false;
      } catch (ex) {
        isRunning = false;
        throw ex;
      }
    }
  };
  return { register, dispatch };
};

export default Dispatcher;
