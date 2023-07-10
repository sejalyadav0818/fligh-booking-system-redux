import { loadState, saveState } from "../redux/localstorage";
const data = loadState();
const initialState = {
  allData: data,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_DATA":
      return {
        ...state,
        allData: [...state.allData, action.payload],
      };
    case "DELETE_DATA":
      const filteredTodos = state.allData.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        allData: filteredTodos,
      };
    
    case "UPDATE_TODO":
      const { id, updatedTodo } = action.payload;
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    
    default:
      return state;
  }
};

export default reducer;
