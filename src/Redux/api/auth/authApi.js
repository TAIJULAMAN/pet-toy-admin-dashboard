import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        console.log("Data being sent to the API:", data);
        return {
          url: "auth/login_user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "user/forgot_password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ verificationCode }) => ({
        url: "user/user_verification",
        method: "PATCH",
        body: { verificationCode },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetToken, newPassword }) => ({
        url: "auth/reset-password",
        method: "POST",
        body: { resetToken, newPassword },
        headers: {
          Authorization: `Bearer ${resetToken}`,
        },
      }),

      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authApi;

export default authApi;
