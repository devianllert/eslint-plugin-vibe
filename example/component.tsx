export function App1(props: { foo: 'bar' }) {
  return (
    <div>
      <h1>{props.foo}</h1>
    </div>
  );
}

function sum(options: { a: number; b: number }) {}

const sum1 = (options: { a: number; b: number }) => {}

const object: { foo: 'bar'} = { foo: 'bar' };

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