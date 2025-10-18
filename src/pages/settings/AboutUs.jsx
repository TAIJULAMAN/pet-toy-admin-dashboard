/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import JoditComponent from "./JoditComponent.jsx";
import {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../Redux/api/aboutUS/aboutUSApi.js";

const AboutUs = () => {
  const [content, setContent] = useState(" this is about us asedf");

  const { data } = useGetAboutUsQuery({});
  const [updateAboutUs, { isLoading: isSubmitting }] =
    useUpdateAboutUsMutation();

  // Load data into editor
  useEffect(() => {
    if (data?.data?.aboutUs) {
      setContent(data.data.aboutUs);
    }
  }, [data]);

  // Submit handler
  const handleSubmit = async () => {
    try {
      const requestData = {
        aboutUs: content,
      };
      // console.log("requestData of aboutUs", requestData);

      const res = await updateAboutUs({ requestData }).unwrap();
      if (res?.success) {
        Swal.fire(
          "Success",
          res?.message || "About Us updated successfully!",
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
      <h1 className="text-start text-3xl font-bold mb-5">About Us</h1>

      <JoditComponent setContent={setContent} content={content} />
      <div className="mt-5">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-red-500 !text-white font-semibold w-full py-3 px-5 rounded-lg disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default AboutUs;
