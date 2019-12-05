import dedup from 'array.dedup';
import {CHANGE} from 'reshow-flux-base';

const DEFAULT_OPTIONS = {withProps: false};
const keys = Object.keys;
const getProps = (props, opt) => (opt.withProps && props ? props : {});
const getState = (self, prevState, maybeProps, opt) =>
  self.calculateState(prevState, getProps(maybeProps, opt));
const getStores = (self, maybeProps, opt) =>
  self.getStores(getProps(maybeProps, opt));

const connect = (Base, options) => {
  const thisOptions = {...DEFAULT_OPTIONS, ...(options || {})};

  class ConnectedClass extends Base {
    __stores = [];

    __handleChange = () => {
      if (!this.__stores) {
        // avoid race condition
        return;
      }
      const con = this.constructor;
      this.setState((prevState, currentProps) =>
        getState(con, prevState, currentProps, thisOptions),
      );
    };

    __setStores = stores => {
      if (this.__stores) {
        this.__resetStores();
      }
      stores = dedup(stores);
      stores.forEach(store => store.addListener(this.__handleChange, CHANGE));
      this.__stores = stores;
    };

    __resetStores = () => {
      if (!this.__stores) {
        return;
      }
      this.__stores.forEach(store =>
        store.removeListener(this.__handleChange, CHANGE),
      );
      this.__stores = null;
    };

    constructor(props) {
      super(props);
      const con = this.constructor;
      if (!con.calculateState) {
        con.calculateState = super.calculateState;
        con.getStores = super.getStores;
      }
      if (props.withConstructor) {
        this.__setStores(getStores(con, props, thisOptions));
      }

      if (!this.state) {
        this.state = {};
      }

      if (!thisOptions.withProps) {
        const calculatedState = getState(con, undefined, props, thisOptions);
        if (calculatedState) {
          keys(calculatedState).forEach(
            key => (this.state[key] = calculatedState[key]),
          );
        }
      }
    }

    componentDidMount() {
      if (super.componentDidMount) {
        super.componentDidMount();
      }
      if (this.props && !this.props.withConstructor) {
        this.__setStores(getStores(this.constructor, this.props, thisOptions));
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (super.componentDidUpdate) {
        super.componentDidUpdate(prevProps, prevState);
      }
      if (thisOptions.withProps) {
        this.__setStores(getStores(this.constructor, this.props, thisOptions));
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      let thisStates = null;
      if (super.getDerivedStateFromProps) {
        thisStates = super.getDerivedStateFromProps(nextProps, prevState);
      }
      if (thisOptions.withProps) {
        const calState = getState(
          ConnectedClass,
          {...prevState, ...thisStates},
          nextProps,
          thisOptions,
        );
        thisStates = {
          ...thisStates,
          ...calState,
        };
      }
      return thisStates;
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
      this.__resetStores();
    }
  }
  const componentName = Base.displayName || Base.name;
  ConnectedClass.displayName = 'FluxConnected(' + componentName + ')';
  return ConnectedClass;
};

export default connect;
