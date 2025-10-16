import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../Redux/api/auth/authApi";
import Swal from "sweetalert2";

function ForgetPassword() {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();

    try {
      const res = await forgotPassword({ email }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Code sent",
        text: res?.message || "Verification code has been sent to your email.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/verification-code");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Request failed",
        text: err?.data?.message || "Unable to send verification code.",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="container mx-auto">
        <div className="flex  justify-center items-center "> 
          <div className="w-full md:w-1/2 lg:w-1/2 p-5 md:px-[100px] md:py-[200px] bg-white  shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded-2xl">
            <h2 className="text-[#0D0D0D] text-2xl  font-bold text-center mb-5">
              Forgot password ?
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="nahidhossain@gmail.com"
                  className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                  required
                />
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="whitespace-nowrap w-1/3 bg-[#FF0000] text-white font-semibold py-2 rounded-lg shadow-lg cursor-pointer mt-5 disabled:opacity-60"
                >
                  {isLoading ? "Sending..." : "Send Code"}
                </button>
              </div>
              {error ? (
                <p className="text-red-600 text-center">{error?.data?.message || "Request failed."}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
