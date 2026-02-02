import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import Swal from "sweetalert2";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../Redux/api/profileApi";
import { Url } from "../../config/envConfig";
import Loader from "../../components/loader/Loader";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUploading }] = useUpdateProfileMutation();
  const [preview, setPreview] = useState("");

  const profile = profileData?.data || {};

  const toAbsolute = (p) => {
    const s = String(p || "").trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;
    const base = (Url || "").replace(/\/+$/, "");
    const path = s.replace(/^\/+/, "");
    return `${base}/${path}`;
  };

  useEffect(() => {
    setPreview("");
  }, [profile?.photo]);
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("data", JSON.stringify({}));
      await updateProfile(form).unwrap();
      Swal.fire("Success", "Profile photo updated", "success");
    } catch (err) {
      Swal.fire("Error", err?.data?.message || "Failed to update photo", "error");
      setPreview("");
    } finally {
      e.target.value = "";
    }
  };
  if (isLoadingProfile || isUploading) {
    return <Loader />;
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50/50">
      <div className="px-5 pb-10 h-full">
        <div className="max-w-6xl mx-auto pt-6">
          <h3 className="font-bold text-2xl text-gray-800 mb-6 px-2">
            Admin Profile
          </h3>

          <div className="flex flex-col items-center">
            <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF0000] to-[#D90000] shadow-xl text-white p-8 md:p-10 transition-all hover:shadow-2xl">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-8 z-10">
                <div className="relative group">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-[6px] border-white/90 shadow-2xl overflow-hidden bg-white">
                    <img
                      src={profile?.photo}
                      alt="profile"
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <label
                    htmlFor="profilePicUpload"
                    className="absolute bottom-1 right-1 bg-white text-[#FF0000] p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors transform hover:scale-105 border border-gray-100"
                    title="Change Profile Photo"
                  >
                    <FaCamera className="text-lg" />
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>

                {/* Profile Info */}
                <div className="text-center md:text-left space-y-2">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
                    {profile?.name || "N/A"}
                  </h2>
                  <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/10">
                    <p className="text-sm md:text-base font-medium tracking-wide uppercase">Admin</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation Section */}
            <div className="flex justify-center items-center gap-3 my-8 bg-white p-1.5 rounded-full shadow-sm border border-gray-100 w-fit mx-auto sticky top-4 z-20">
              <button
                onClick={() => setActiveTab("editProfile")}
                className={`px-8 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${activeTab === "editProfile"
                  ? "bg-[#FF0000] text-white shadow-md transform scale-105"
                  : "text-gray-500 hover:text-[#FF0000] hover:bg-red-50"
                  }`}
              >
                Edit Profile
              </button>
              <button
                onClick={() => setActiveTab("changePassword")}
                className={`px-8 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${activeTab === "changePassword"
                  ? "bg-[#FF0000] text-white shadow-md transform scale-105"
                  : "text-gray-500 hover:text-[#FF0000] hover:bg-red-50"
                  }`}
              >
                Change Password
              </button>
            </div>

            {/* Tab Content Section */}
            <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 min-h-[400px]">
              <div className="animate-fade-in-up">
                {activeTab === "editProfile" && <EditProfile />}
                {activeTab === "changePassword" && <ChangePass />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

