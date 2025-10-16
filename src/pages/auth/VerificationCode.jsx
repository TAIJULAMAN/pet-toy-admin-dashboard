import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../Redux/api/auth/authApi";
import Swal from "sweetalert2";

function VerificationCode() {
  const [code, setCode] = useState(new Array(4).fill(""));

  const navigate = useNavigate();
  const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const joined = code.join("");
    if (!/^\d{4}$/.test(joined)) {
      Swal.fire({
        icon: "error",
        title: "Invalid code",
        text: "Please enter the 4 digit code.",
      });
      return;
    }
    const verificationCode = Number(joined);
    try {
      const res = await verifyEmail({ verificationCode }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Verified",
        text: res?.message || "Code verified successfully.",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate(`/new-password`);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Verification failed",
        text: err?.data?.message || "Invalid or expired code.",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-5">
      <div className="container mx-auto">
        <div className="flex  justify-center items-center">
          <div className="w-full lg:w-1/2 bg-white p-5 md:px-18 md:py-28 shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded-2xl">
            <h2 className="text-[#0D0D0D] text-2xl  font-bold text-center mb-5">
              Verification code
            </h2>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-[#6A6D76] mb-10 w-full md:w-2/3 ">
                We sent a reset link to contact@dscode...com enter 4 digit code
                that is mentioned in the email.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="shadow-xs w-12 h-12 text-2xl text-center border border-[#6A6D76] text-[#0d0d0d] rounded-lg focus:outline-none"
                  />
                ))}
              </div>
              <div className="flex justify-center items-center my-5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-1/3 bg-[#FF0000] text-white font-semibold py-2 rounded-lg shadow-lg cursor-pointer mt-5 disabled:opacity-60"
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </button>
              </div>
              {error ? (
                <p className="text-red-600 text-center">
                  {error?.data?.message || "Verification failed."}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
