import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import Swal from "sweetalert2";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../Redux/api/profileApi";
import { Url } from "../../config/envConfig";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const { data: profileData } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUploading }] = useUpdateProfileMutation();
  const [preview, setPreview] = useState("");

  const profile = profileData?.data || profileData || {};
  

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
      form.append("photo", file);
      await updateProfile(form).unwrap();
      await refetch();
      Swal.fire("Success", "Profile photo updated", "success");
    } catch (err) {
      Swal.fire("Error", err?.data?.message || "Failed to update photo", "error");
      setPreview("");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="overflow-y-auto">
      <div className="px-5 pb-5 h-full">
        <h3 className="font-semibold pb-5 text-xl text-[#242424]">
          Admin Profile(Super Admin)
        </h3>
        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex flex-col md:flex-row justify-center items-center bg-[#FF0000] mt-5 text-white w-full max-w-4xl mx-auto p-4 md:p-5 gap-4 md:gap-5 rounded-lg">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center">
                <img
                  src={preview || toAbsolute(profile?.photo) || "https://avatar.iran.liara.run/public/44"}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
                {/* Upload Icon */}
                <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <FaCamera className="text-[#575757]" />
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl md:text-3xl font-bold">{profile?.name || "User"}</p>
              <p className="text-xl font-semibold">Admin</p>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "editProfile"
                  ? "text-[#FF0000] border-b-2 border-[#FF0000]"
                  : "text-[#6A6D76]"
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer pb-1 ${
                activeTab === "changePassword"
                  ? "text-[#FF0000] border-b-2 border-[#FF0000]"
                  : "text-[#6A6D76]"
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center p-5 rounded-md">
            <div className="w-full max-w-7xl mx-auto">
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

