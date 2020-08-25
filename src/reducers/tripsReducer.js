const tripsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return ({
        ...state,
        currentTrip: action.currentTrip,
      });
    case 'ADD_CONNECTION':
      let flights;
      if (state.flights) {
        state.flights.push(action.connection);
      } else {
        flights = [action.connection];
      }
      return ({
        ...state,
        flights,
      });
      case 'DELETE_CONNECTION':
    return ({
      ...state,
    });
    default: return state;
  }
};

export default tripsReducer;
