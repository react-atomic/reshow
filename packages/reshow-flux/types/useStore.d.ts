export default useStore;
/**
 * How to use?
 *
 *  import { useEffect } from "react";
 *  import { useStore, ImmutableStore } from "reshow-flux";
 *  const [store, dispatch] = ImmutableStore();
 *  const Comp = props => {
 *    const state = useStore(store);
 *    useEffect(()=>dispatch({foo: "bar"}), []);
 *    return <div>{state.get("foo")}</div>;
 *  }
 */
declare function useStore(store: any, heeding: any): any;
