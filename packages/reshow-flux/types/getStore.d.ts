export default getStore;
export type StoreObject<StateType, ActionType> = import("reshow-flux-base").StoreObject<StateType, ActionType>;
/**
 * @returns {object}
 */
declare function getStore({ props, options }: {
    props: any;
    options: any;
}): object;
