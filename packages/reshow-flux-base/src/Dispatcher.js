import "setimmediate";
import { STRING } from "reshow-constant";

const Dispatcher = () => {
  const cbs = [];
  const register = (cb) => cbs.push(cb);

  const dispatch = (payload, params) => {
    payload = payload || {};
    if (STRING === typeof payload) {
      payload = { type: payload, params };
      !params && delete payload.params;
    }
    setImmediate(() => cbs.forEach((c) => c(payload)));
  };
  return { register, dispatch };
};

export default Dispatcher;
