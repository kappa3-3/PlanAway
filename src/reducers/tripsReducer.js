const tripsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return ({
        ...state,
        currentTrip: action.currentTrip,
      });
    case 'ADD_CONNECTION':
      if (state.flights) {
        return ({
          ...state,
          flights: [...state.flights, action.connection],
        });
      }
      return ({
        ...state,
        flights: [action.connection],
      });
    case 'CLEAR_CONNECTION':
      return ({});
    default: return state;
  }
};

export default tripsReducer;
