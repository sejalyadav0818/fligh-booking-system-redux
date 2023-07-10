import { createStore, applyMiddleware } from "redux";
import reducer from "../redux/reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to local storage
import { loadState , saveState } from "../redux/localstorage";

// // Load state from localStorage
// export const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("allData");
//     console.log(serializedState);
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (error) {
//     console.error("Error loading state from localStorage:", error);
//     return undefined;
//   }
// };




// // Save state to localStorage
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     console.log("jrloemgjrlemgj",state);
//     localStorage.setItem("allData", serializedState);

//   } catch (error) {
//     console.error("Error saving state to localStorage:", error);
//   }
// };

export const store = createStore(
  reducer,
  //   applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Save state to localStorage whenever it changes
store.subscribe(() => {
  saveState(store.getState());
});

// const store = createStore(reducer);

// console.log(store.getState());


