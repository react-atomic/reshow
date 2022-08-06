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

## `usePartialRender`

Help u partial update component, don't need redesign a complex component structure.

```js
  const list = {
    foo: <div className="foo" />,
    bar: <div className="bar" />
  };
  const [renderComponent, partialRender, setRenderKeys] = usePartialRender(
    Object.keys(list),
    list
  );

```
* [Codesandbox](https://codesandbox.io/s/react-partial-render-mo3yu2?file=/src/App.js)
