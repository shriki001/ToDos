const initState = {
  todos: [
    // {
    //   _id: "dfvscaa",
    //   description: "dfjsnds",
    //   deadline: new Date(),
    //   status: true,
    // },
  ],
  total: 0,
  rowPerPage: 5,
};

const TodosReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.todos,
        total: action.total,
        rowPerPage: action.rowPerPage,
      };
    default:
      return state;
  }
};
export default TodosReducer;
