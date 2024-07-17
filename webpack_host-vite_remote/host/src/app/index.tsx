import { lazy } from "react";

// @ts-ignore
const Hello = lazy(() => import('vite_service_example/hello'))


export const App = () => {
  return (
    <div>
      <p>Hello World</p>
      <Hello/>
    </div>
  );
};