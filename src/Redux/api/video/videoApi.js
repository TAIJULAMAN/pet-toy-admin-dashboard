import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "auth/find_by_admin_all_users",
        method: "GET",
        params, // e.g., { page: 1, limit: 10, search: "" }
      }),

      providesTags: ["user"],
    }),
    blockUser: builder.mutation({
      query: ({ id, status }) => ({
        url: `auth/change_status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation } = userApi;
