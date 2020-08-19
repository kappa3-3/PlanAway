const isAuthReducer = (state = false, action) => {
  switch (action.type) {
    case 'APPROVED':
      return (
        true
      );
    case 'DENIED':
      return (
        false
      );
    default: return state;
  }
};

export default isAuthReducer;
