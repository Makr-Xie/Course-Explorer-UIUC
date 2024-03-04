import React, { useState } from "react";

const FirstPage: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>First Page</h1>
      <p> Hello World! </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default FirstPage;
