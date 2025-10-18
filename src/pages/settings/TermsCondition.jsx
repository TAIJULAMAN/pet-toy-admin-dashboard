/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import JoditComponent from "./JoditComponent.jsx";
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/api/termsApi.js";

const TermsCondition = () => {
  const [content, setContent] = useState("this is terms and conditions");

  const { data } = useGetTermsAndConditionsQuery("setting/terms_conditions");
  const [updateTermsAndConditions, { isLoading: isSubmitting }] =
    useUpdateTermsAndConditionsMutation();

  useEffect(() => {
    if (data?.data?.TermsConditions) {
      setContent(data.data.TermsConditions);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const requestData = {
        TermsConditions: content, // ✅ backend expects this key
      };
      console.log("requestData of terms", requestData);

      const res = await updateTermsAndConditions({ requestData }).unwrap();
      if (res?.success) {
        Swal.fire(
          "Success",
          res?.message || "Terms & Conditions updated successfully!",
          "success"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.data?.message || "Something went wrong!",
        "error"
      );
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Terms & Conditions</h1>
      <JoditComponent setContent={setContent} content={content} />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-red-500 !text-white font-semibold w-full py-3 px-5 rounded-lg disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Updating..." : "Submit"}
      </button>
    </>
  );
};

export default TermsCondition;
