# `createReducer`

> `
> Similar with react useReducer, but let you use anywhere.
> `

* GIT
   * https://github.com/react-atomic/reshow/tree/main/packages/reshow-flux-base
* NPM
   * https://www.npmjs.com/package/reshow-flux-base



## Usage

Accepts a reducer of type `(state, action) => newState`, and returns the current store with a dispatch method.

```js
import { createReducer } from "reshow-flux-base";
const [store, dispatch] = createReducer(reducer, initial[Arg|Function]);

/**
 * reducer -> (state, action) => newState
 */

```

### `Store` will have three method.
| *Methods* | *Explain* |
| --- | --- |
| getState | Return current state. |
| addListener |You could register any callback function such as react useState. |
| removeListener | Remove register callback, such as unmount a component. |


## `Full App Example`

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const [store, dispatch] = createReducer(reducer, initialState);

function Counter() {
  const [state, setState] = useState(() => store.getState());
  useEffect(()=>{
     store.addListener(setState);
     return ()=>{
        store.removeListener(setState);
     };
  }, []);
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

## Codesandbox
https://codesandbox.io/s/reshow-flux-base-34umk
