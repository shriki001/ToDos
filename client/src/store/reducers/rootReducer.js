import TodosReducer from "./todosReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  todos: TodosReducer,
});
export default rootReducer;
