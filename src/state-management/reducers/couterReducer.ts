interface Action {
  type: "INCREMENT" | "RESET";
}

const couterReducer = (state: number, action: Action): number => {
  if (action.type === "INCREMENT") return state + 1;
  if (action.type === "RESET") return 0;

  // With a proper interface (i.e., union of two string literals), we don't need to throw
  // an error, since an erroneous action would generate a compiler error.
  return state;
};

export default couterReducer;
