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
    uploadAudio: builder.mutation({
      query: (files) => {
        const formData = new FormData();
        if (Array.isArray(files)) {
          files.forEach((f) => formData.append("files", f));
        } else if (files) {
          formData.append("files", files);
        }
        return {
          url: "audio/upload_audio_files",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["audio"],
    }),
    
  }),
});

export const { useGetAllAudiosQuery, useDeleteAudioMutation, useUploadAudioMutation } = audioApi;
