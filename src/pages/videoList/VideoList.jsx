/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { Modal } from "antd";


const petContent = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/rTuxUAuJRyY?si=3rALyaAO9Y-xL3iK",
    date: "25-04-2025",
    author: "Jacob",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/rTuxUAuJRyY?si=3rALyaAO9Y-xL3iK",
    date: "25-04-2025",
    author: "Jacob",
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/embed/rTuxUAuJRyY?si=3rALyaAO9Y-xL3iK",
    date: "26-04-2025",
    author: "Emma",
  },
  {
    id: 4,
    videoUrl: "https://www.youtube.com/embed/rTuxUAuJRyY?si=3rALyaAO9Y-xL3iK",
    date: "27-04-2025",
    author: "Lucas",
  },
  {
    id: 5,
    videoUrl: "https://www.youtube.com/embed/rTuxUAuJRyY?si=3rALyaAO9Y-xL3iK",
    date: "28-04-2025",
    author: "Olivia",
  },
  {
    id: 6,
    videoUrl: "https://www.youtube.com/embed/rTuxUAuJRyY?si=3rALyaAO9Y-xL3iK",
    date: "29-04-2025",
    author: "Sophia",
  },
];

export default function VideoList() {
  return (
    <div className="mb-10">
      {/* <div className="flex justify-end items-end"> */}
        <div className="flex flex-col md:flex-row justify-end md:gap-5 items-center">
          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search..."
              className="border border-[#e5eaf2] py-3 pl-10 pr-[65px] outline-none w-full md:w-[] rounded-md"
            />
            <span className=" text-gray-500 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
          <DatePicker />
        </div>
      {/* </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {petContent.map((content) => (
          <PetVideoCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}

function PetVideoCard({ content }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md bg-[#F2F2F2] h-full">
      {/* Dynamically setting the video URL */}
      <div className="relative pb-[56.25%] w-full">
        {" "}
        {/* Aspect ratio container */}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={content.videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 border border-gray-200 rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/14"
              alt={content.author}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold text-sm">{content.author}</p>
            <p className="text-xs text-gray-500">{content.date}</p>
          </div>
        </div>
        <button className="text-red-500 hover:text-red-700 transition-colors">
          <FiTrash2 onClick={showModal} className="h-5 w-5" />
        </button>
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              Are you sure you want to delete?
            </h1>

            <div className="text-center py-5 w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#FF0000] text-white font-semibold w-full py-3 px-5 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="border-2 border-[#FF0000] text-[#FF0000] font-semibold w-full py-3 px-5 rounded-lg mt-5"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
