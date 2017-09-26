class Dispatcher {
  callbacks = [];

  register(callback) {
    this.callbacks.push(callback);
  }

  dispatch(payload) {
    this.callbacks.forEach(c => c(payload));
  }
}

export default Dispatcher;
