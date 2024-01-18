import { useReducer } from "react";

import couterReducer from "./reducers/couterReducer";

const Counter = () => {
  const [value, dispath] = useReducer(couterReducer, 0);

  return (
    <div>
      Counter ({value})
      <button
        onClick={() => dispath({ type: "INCREMENT" })}
        className="btn btn-primary mx-1"
      >
        Increment
      </button>
      <button
        onClick={() => dispath({ type: "RESET" })}
        className="btn btn-primary mx-1"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
