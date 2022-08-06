Reshow Return 
===============

* GIT
   * https://github.com/react-atomic/reshow/tree/main/packages/reshow-return
* NPM
   * https://www.npmjs.com/package/reshow-return

## How to use
```jsx
<Return
  store={/*subscribe store*/}
  initStates={["name1", "name2"]}
>
  {/*your code*/}
</Return>
```

## `useParticalRender`

Help u partical update component, you don't need redesign your big component structure.

```js
  const list = {
    foo: <div className="foo" />,
    bar: <div className="bar" />
  };
  const [renderComponent, particalRender, setRenderKeys] = useParticalRender(
    Object.keys(list),
    list
  );

```
* [Codesandbox](https://codesandbox.io/s/react-partical-render-mo3yu2?file=/src/App.js)
