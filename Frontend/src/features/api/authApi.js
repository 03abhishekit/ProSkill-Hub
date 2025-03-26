





import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user/";



export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(
    { baseUrl: USER_API,
         credentials: "include",
         prepareHeaders: (headers) => {
          const token = localStorage.getItem("token"); 
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
     }
    ),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if(result.data.token){
            localStorage.setItem("token", result.data.token);
          }
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.error("Login failed:", error?.data?.message || "Unknown error");
        }
      },
    }),

    logoutUser : builder.mutation({
         query :()=>({
          url:"logout",
          method:"GET",
         }),

         async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            localStorage.removeItem("token"); 
            dispatch(userLoggedOut());
          } catch (error) {
            console.error("Logout failed:", error?.data?.message || "Unknown error");
          }
        },
    }),

    
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
       
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          if (error.error?.status === 401) { 
            localStorage.removeItem("token"); // ✅ Remove expired token
            dispatch(userLoggedOut());
          }
          console.error("Login failed:", error?.data?.message || "Unknown error");
        }
      },
    }),

    updateUser : builder.mutation({
        query:(FormData)=>({
           url :"profile/update",
           method:"PUT",
           body:FormData,
           credentials:"include"
        })
    })
    
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLoadUserQuery, useUpdateUserMutation, useLogoutUserMutation } = authApi;
