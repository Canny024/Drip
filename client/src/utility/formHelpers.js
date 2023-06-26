export const isCorrect = (schema, fieldDetails) => {
  for (const field in schema) {
    if (schema[field].required && fieldDetails[field] === "") return false;
    else if (schema[field].type === String) {
      if (schema[field].minlength > fieldDetails[field].length) return false;
      if (schema[field].maxlength < fieldDetails[field].length) return false;
    }
  }

  return true;
};

export const getInitialState = (schema) => {
  const state = {};
  for (const field in schema) {
    if (schema[field].default) {
      state[field] = schema[field].default;
    }
    else{
      switch (schema[field].type) {
        case String:
          state[field] = "";
          break;
        case Boolean:
          state[field] = false;
          break;
        case Number:
          state[field] = 0;
          break;
        default:
          state[field] = "";
      }
    }
  }
  return state;
};
