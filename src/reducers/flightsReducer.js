const flightsReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_FLIGHTS':
      return (action.results);
    case 'CLEAR_FLIGHTS':
      return ([]);
    default: return state;
  }
};

export default flightsReducer;
