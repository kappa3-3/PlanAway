const tripsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return ({
        ...state,
        currentTrip: action.currentTrip,
      });
    default: return state;
  }
};

export default tripsReducer;
