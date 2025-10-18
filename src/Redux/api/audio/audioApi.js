import { baseApi } from "../baseApi";

export const audioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAudios: builder.query({
      query: (params) => ({
        url: "audio/find_by_all_audio",
        method: "GET",
        params,
      }),

      providesTags: ["audio"],
    }),
    deleteAudio: builder.mutation({
      query: (id) => ({
        url: `audio/delete_audio_file/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["audio"],
    }),
  }),
});

export const { useGetAllAudiosQuery, useDeleteAudioMutation } = audioApi;
