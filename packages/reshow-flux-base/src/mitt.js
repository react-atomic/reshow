const type = all => t => all[t] || (all[t] = []);

const mitt = () => {
  const all = type({});
  return {
    on: (t, handler) => all(t).push(handler),

    off: (t, handler) => {
      all(t).splice(all(t).indexOf(handler) >>> 0, 1);
    },

    emit: (t, params) => {
      all(t)
        .slice()
        .map(handler => handler(params));
    },
  };
};

export default mitt;
