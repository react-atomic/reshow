class Dispatcher {
  callbacks = [];

  register(callback) {
    this.callbacks.push(callback);
  }

  dispatch(payload) {
    if (!payload) {
        payload = {};
    }
    if ('string' === typeof payload) {
        payload = {type: payload};
    }
    this.callbacks.forEach(c => c(payload));
  }
}

export default Dispatcher;
