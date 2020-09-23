import React, { useContext, useState } from "react";
import noop from "lodash/noop";

interface SampleContextType {
  counter: number;
  setCounter: (value: number) => void;
}

const sampleContext = React.createContext<SampleContextType>({
  counter: 0,
  setCounter: noop,
});

const { Provider } = sampleContext;

const Child1 = () => {
  const { setCounter, counter } = useContext(sampleContext);
  console.log("child1");
  return (
    <div>
      Child1 <button onClick={() => setCounter(counter + 1)}>Click me</button>
    </div>
  );
};

const Child2 = React.memo(() => {
  console.log("child2");

  return <div>Child2</div>;
});

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <Provider
      value={{
        counter,
        setCounter,
      }}
    >
      App
      <Child1 />
      <Child2 />
    </Provider>
  );
};

export default App;
