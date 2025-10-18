import { baseApi } from "../baseApi";

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: (params) => ({
        url: "video/find_all_video",
        method: "GET",
        params,
      }),

      providesTags: ["video"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `video/delete_video_file/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["video"],
    }),
  }),
});

export const { useGetAllVideosQuery, useDeleteVideoMutation } = videoApi;
