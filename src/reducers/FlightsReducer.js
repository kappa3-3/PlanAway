const FlightsReducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case 'ADD_FLIGHTS':
      return ([
        ...state,
        {
          id: action.task.id,
          title: action.task.title,
          description: action.task.description,
          isFinished: action.task.isFinished,
          isEdit: action.task.isEdit,
        },
      ]);
    default: return state;
  }
};

export default FlightsReducer;
