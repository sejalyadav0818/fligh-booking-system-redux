// export const addTodo = (allData) => {
//   return {
//     type: "ADD_DATA",
//     payload: allData,
//   };
// };
export const select = (allData) => {
  return {
    type: "SUBMIT_DATA",
    payload: allData,
  };
};
export const deletee = (id) => {
  return {
    type: "DELETE_DATA",
    payload: id,
  };
};
// export const updateTodo = (id, updatedTodo) => {
//   return {
//     type: "UPDATE_TODO",
//     payload: { id, updatedTodo },
//   };
// };

// export const deleteTodo = (id) => {
//   return {
//     type: "DELETE_TODO",
//     payload: id,
//   };
// };
