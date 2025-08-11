import React from "react";

export function AppFunc(props: { foo: 'bar' }) {
  return (
    <div>
      <h1>{props.foo}</h1>
    </div>
  );
}

export const AppConst = (props: { foo: 'bar' }) => {
  return (
    <div>
      <h1>{props.foo}</h1>
    </div>
  );
}

export const AppMemo = React.memo((props: { foo: 'bar' }) => {
  return (
    <div>
      <h1>{props.foo}</h1>
    </div>
  );
})

export const AppRef = React.forwardRef((props: { foo: 'bar' }, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <h1>{props.foo}</h1>
    </div>
  );
})


export const AppNotComponent = (props: { foo: 'bar' }) => {
  return props.foo
}

export function sum(options: { a: number; b: number }) {
  return options.a + options.b
}

export const sum1 = (options: { a: number; b: number }) => {
  return options.a + options.b
}

export const object: { foo: 'bar'} = { foo: 'bar' };

interface App2Props {
  foo: 'bar'
}

export function App2(props: App2Props) {
  return (
    <div>
      <h1>{props.foo}</h1>
    </div>
  );
}