const userDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return (action.data);
    case 'REMOVE_USER_DATA':
      return (
        null
      );
    default: return state;
  }
};

export default userDataReducer;
