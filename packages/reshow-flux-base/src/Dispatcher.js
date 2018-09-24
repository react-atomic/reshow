class Dispatcher {
  callbacks = [];

  register(callback) {
    this.callbacks.push(callback);
  }

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
    this.callbacks.forEach(c => c(payload));
  };
}

export default Dispatcher;
