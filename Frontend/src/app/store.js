

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi"; 
import { courseApi } from "../features/api/courseApi";




const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});

export default store;


// const initializeApp = async()=>{
//   await store.dispatch(authApi.endpoints.loadUser.initiate(
//     {},
//     {forceRefetch:true}
//   ))
// }

const initializeApp = async () => {
  try {
    const user = await store.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })).unwrap();
    console.log("User loaded:", user);
  } catch (error) {
    console.error("Error loading user:", error);
  }
};

initializeApp();




// import {configureStore} from "@reduxjs/toolkit" 
// import rootRedcuer from "./rootRedcuer";
// import { authApi } from "@/features/api/authApi";
// import { courseApi } from "@/features/api/courseApi";
// import { purchaseApi } from "@/features/api/purchaseApi";
// import { courseProgressApi } from "@/features/api/courseProgressApi";

// export const appStore = configureStore({
//     reducer: rootRedcuer,
//     middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
// });

// const initializeApp = async () => {
//     await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
// }
// initializeApp();