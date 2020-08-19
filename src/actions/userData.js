export const setUserData = (data) => ({
  type: 'SET_USER_DATA',
  data,
});

export const removeUserData = (id) => ({
  type: 'REMOVE_USER_DATA',
  id,
});
