import React from "react";

const App = () => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    return () => {
      console.log(123);
    };
  }, [counter]);

  return (
    <div>
      <h1>World {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Click</button>
    </div>
  );
};

export default App;
