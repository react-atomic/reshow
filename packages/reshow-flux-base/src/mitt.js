const type = (all) => (t) => all[t] || (all[t] = []);

const mitt = () => {
  const all = type({});
  return {
    on: (t, handler) => all(t).push(handler),
    off: (t, handler) => all(t).splice(all(t).indexOf(handler) >>> 0, 1),
    emit: (t, state) => all(t).forEach((func) => func(state)),
  };
};

export default mitt;
