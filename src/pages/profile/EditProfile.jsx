import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../Redux/api/profileApi";

function EditProfile() {
  const { data: profileData } = useGetProfileQuery();
  console.log("profile data", profileData);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
  });

  useEffect(() => {
    const p = profileData?.data || profileData || {};
    setFormValues((prev) => ({
      ...prev,
      name: p?.name || p?.fullName || "",
      email: p?.email || "",
      phoneNumber: p?.phoneNumber || "",
      location: p?.location || "",
    }));
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formValues.name);
      form.append("email", formValues.email);
      form.append("phoneNumber", formValues.phoneNumber);
      form.append("location", formValues.location);
      await updateProfile(form).unwrap();
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        error?.data?.message || "Failed to update profile",
        "error"
      );
    }
  };

  return (
    <div className="bg-white px-20 w-[715px] py-5 rounded-md">
      <p className="text-[#0D0D0D] text-center font-bold text-2xl mb-5">
        Edit Your Profile
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
            User Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
            placeholder="Enter full name"
            required
            value={formValues.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
            placeholder="Enter Email"
            required
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
            Contact No
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
            placeholder="Enter Contact Number"
            required
            value={formValues.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
            Address
          </label>
          <input
            type="text"
            name="location"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
            placeholder="Enter Address"
            value={formValues.location}
            onChange={handleChange}
          />
        </div>

        <div className="text-center py-5">
          <button
            disabled={isLoading}
            className="bg-[#FF0000] text-white font-semibold w-full py-3 rounded-lg disabled:opacity-60"
          >
            {isLoading ? "Updating..." : "Save & Change"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
