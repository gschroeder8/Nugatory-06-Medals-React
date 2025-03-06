import React from "react";

function Medals({ type, count, setCount }) {
  return (
    <div className="medal">
      <p>{type}: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>-</button>
    </div>
  );
}

export default Medals;
