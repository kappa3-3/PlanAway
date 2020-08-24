const flightsReducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case 'STORE_FLIGHTS':
      return (action.results);
    default: return state;
  }
};

export default flightsReducer;
