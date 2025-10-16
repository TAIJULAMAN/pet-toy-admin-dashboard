import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalCount: builder.query({
      query: (params) => ({
        url: "video/dashboard_count",
        method: "GET",
        params, // e.g., { page: 1, limit: 10 }
      }),
      providesTags: ["dashboard"],
    }),
    getUserOverview: builder.query({
      query: ({ year } = {}) => ({
        url: "user/find_by_user_growth",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
    getVideoOverview: builder.query({
      query: ({ year } = {}) => ({
        url: "video/find_by_video_growth",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetTotalCountQuery, useGetUserOverviewQuery, useGetVideoOverviewQuery } =
  dashboardApi;
