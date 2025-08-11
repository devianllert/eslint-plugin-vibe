# Require creating an `interface` or `type` for props (`eslint-plugin-vibe/no-object-literal-types`)

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
export function App(props: { foo: 'bar' }) {
  return (
    <div>
      <h1>{props.foo}</h1>
    </div>
  );
}
```

Examples of **correct** code for this rule:

```jsx
interface AppProps {
  foo: 'bar'
}

export function App(props: AppProps) {
  return (
    <div>
      <h1>{props.foo}</h1>
    </div>
  );
}
```