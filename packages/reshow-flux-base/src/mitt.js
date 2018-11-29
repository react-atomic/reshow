const type = all => t => all[t] || (all[t] = []);

const mitt = () => {
  const all = type({});
  return {
    on: (t, handler) => all(t).push(handler),
    off: (t, handler) => all(t).splice(all(t).indexOf(handler) >>> 0, 1),
    emit: (t, state) => {
      for (let a = all(t).slice(), i = 0, j = a.length; i < j; i++) {
        a[i](state);
      }
    },
  };
};

export default mitt;
