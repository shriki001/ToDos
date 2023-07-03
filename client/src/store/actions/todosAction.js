import axios from "axios";

export const CheckStatuses = () => async (_) => {
  try {
    await axios.get(`http://localhost:3001/api/status`);
  } catch (e) {
    /* no data to show right now*/
  }
};

export const GetTodos = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3001/api?page=${page}`);
    const { todos, total, rowPerPage } = res.data;
    dispatch({ type: "GET_TODOS", todos, total, rowPerPage });
  } catch (e) {
    /* no data to show right now*/
  }
};

export const UpdateTodo = (id, data, page) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3001/api/${id}`, data);
  } catch (e) {}
  dispatch(GetTodos(page));
};

export const RemoveTodo = (id, page) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/api/${id}`);
  } catch (e) {}
  dispatch(GetTodos(page));
};

export const CreateTodo = (data, page) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:3001/api/`, data);
  } catch (e) {}
  dispatch(GetTodos(page));
};
