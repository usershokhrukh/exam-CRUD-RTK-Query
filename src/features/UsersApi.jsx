import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/"}),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["Users"],
    }),
    addUsers: builder.mutation({
      query: (body) => ({
        body,
        method: "POST",
        url: "users",
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUsers: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `users/${id}`,
      }),
      invalidatesTags: ["Users"],
    }),

    editUsers: builder.mutation({
      query: (user) => ({
        body: user,
        method: "PUT",
        url: `users/${user?.id}`,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {useGetUsersQuery, useAddUsersMutation, useDeleteUsersMutation, useEditUsersMutation} = usersApi;