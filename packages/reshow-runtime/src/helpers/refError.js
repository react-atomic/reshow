const refError = () =>
  new ReferenceError(
    "this hasn't been initialised - super() hasn't been called"
  );
export default refError;
