export const storeFlights = (results) => ({
  type: 'STORE_FLIGHTS',
  results,
});

export const clearFlights = (flights) => ({
  type: 'CLEAR_FLIGHTS',
  flights,
});
