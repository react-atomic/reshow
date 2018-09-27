class Dispatcher {
  cbs = [];

  register = cb => this.cbs.push(cb);

  dispatch = (payload, params) => {
    if (!payload) {
      payload = {};
    }
    if ('string' === typeof payload) {
      payload = {type: payload, params};
      if (!params) {
        delete payload.params;
      }
    }
    this.cbs.forEach(c => c(payload));
  };
}

export default Dispatcher;
