export const chooseTrip = (currentTrip) => ({
  type: 'SET_CURRENT',
  currentTrip,
});

export const addConnection = (connection) => ({
  type: 'ADD_CONNECTION',
  connection,
});

export const deleteConnection = (connection) => ({
  type: 'DELETE_CONNECTION',
  connection,
});

export const clearConnection = (connection) => ({
  type: 'CLEAR_CONNECTION',
  connection,
});
