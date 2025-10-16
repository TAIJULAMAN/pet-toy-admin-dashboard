import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decodeAuthToken } from "../../utils/decode-access-token";
import { useResetPasswordMutation } from "../../Redux/api/auth/authApi";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);
  const decoded = decodeAuthToken(token);
  // console.log("decoded", decoded);
  const userId = decoded?.id;

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Missing user",
        text: "User is not authenticated.",
      });
      return;
    }
    if (!password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Required",
        text: "Please fill both password fields.",
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    try {
      const res = await resetPassword({
        userId: String(userId),
        password,
      }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Password updated",
        text: res?.message || "Your password has been reset.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/sign-in");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err?.data?.message || "Unable to reset password.",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="container mx-auto">
        <div className="flex  justify-center items-center">
          <div className="w-full lg:w-1/2 bg-white p-5 md:px-18 md:py-28 shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded-2xl">
            <h2 className="text-[#0D0D0D] text-2xl  font-bold text-center mb-5">
              Set a new password
            </h2>
            <p className="text-[#6A6D76] text-center mb-10">
              Create a new password. Ensure it differs from previous ones for
              security
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
                  New Password
                </label>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="**********"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
                  Confirm New Password
                </label>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="**********"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-1/2 md:w-1/3 bg-[#FF0000] text-white font-semibold py-2 rounded-lg shadow-lg cursor-pointer mt-5 whitespace-nowrap disabled:opacity-60"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
              {error ? (
                <p className="text-red-600 text-center">
                  {error?.data?.message || "Unable to reset password."}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
