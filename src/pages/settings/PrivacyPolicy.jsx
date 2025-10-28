import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} from "../../Redux/api/privacyApi";
import JoditComponent from "./JoditComponent.jsx";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("this is privacy policy");

  const { data } = useGetPrivacyQuery();
  const [updatePrivacy, { isLoading: isSubmitting }] =
    useUpdatePrivacyMutation();

  const handleSubmit = async () => {
    if (!content) {
      Swal.fire("Validation", "Privacy policy content cannot be empty!", "warning");
      return;
    }

    const requestData = {
      PrivacyPolicy: content, // ✅ backend expects this key
    };

    try {
      const res = await updatePrivacy({ requestData }).unwrap();
      console.log("Response from updatePrivacy:", res);

      if (res?.success) {
        Swal.fire("Success", res?.message || "Privacy policy updated successfully!", "success");
      }
    } catch (error) {
      Swal.fire("Error", error?.data?.message || "Something went wrong!", "error");
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.data?.PrivacyPolicy) {
      setContent(data.data.PrivacyPolicy);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-start text-3xl font-bold my-5">Privacy Policy</h1>
      <JoditComponent setContent={setContent} content={content} />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-red-500 !text-white font-semibold w-full py-3 px-5 my-5 rounded-lg disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Updating..." : "Submit"}
      </button>
    </>
  );
};

export default PrivacyPolicy;
