import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://human-store-server.vercel.app" }),
    tagTypes: ['added-user', 'delete-user', 'edit-user'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            providesTags: ['added-user', 'delete-user', 'edit-user', 'toggle-like']
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: "/add-user",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['added-user']
        }),
        deleteUser: builder.mutation({
            query: (_id) => ({
                url: `/delete-user/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['delete-user']
        }),
        editUserInfo: builder.mutation({
            query: (updatedData) => ({
                url: "/edit-user",
                method: "PATCH",
                body: updatedData
            }),
            invalidatesTags: ['edit-user']
        }),
        toggleLike: builder.mutation({
            query: (toggle) => ({
                url: "/toggle-like",
                method: "PATCH",
                body: toggle
            }),
            invalidatesTags: ['toggle-like']
        })
    }),
});


export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useEditUserInfoMutation, useToggleLikeMutation } = usersApi;