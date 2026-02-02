/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useEffect, useMemo, useState, useRef } from "react";
import { Modal, Pagination } from "antd";
import {
  useGetAllVideosQuery,
  useDeleteVideoMutation,
} from "../../Redux/api/video/videoApi";
import { Url } from "../../config/envConfig";

export default function VideoList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetAllVideosQuery({
    page: String(Number(page) || 1),
    limit: String(Number(limit) || 10),
  });
  const list = useMemo(
    () => {
      const rawList = data?.data?.allVideos || [];
      return Array.isArray(rawList) ? rawList : [];
    },
    [data]
  );

  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 300);
    return () => clearTimeout(id);
  }, [search]);

  const filtered = useMemo(() => {
    const s = debouncedSearch;
    if (!s) return list;
    const contains = (v) => String(v || "").toLowerCase().includes(s);
    return list.filter((v) => contains(v?.title) || contains(v?.userId?.name));
  }, [list, debouncedSearch]);

  const total = data?.data?.meta?.total || 0;

  const videoRefs = useRef({});

  const handlePlay = (id) => {
    Object.keys(videoRefs.current).forEach((key) => {
      if (key !== id && videoRefs.current[key]) {
        videoRefs.current[key].pause();
      }
    });
  };

  return (
    <div className="mb-5">
      <div className="flex flex-col md:flex-row justify-end md:gap-5 items-center my-5">
        <div className="relative w-full md:w-[320px]">
          <input
            type="text"
            placeholder="Search..."
            className="border border-[#e5eaf2] py-3 pl-10 pr-[65px] outline-none w-full md:w-full rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-gray-500 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center py-10">Loading videos...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {filtered.map((video) => (
              <PetVideoCard
                key={video?._id}
                content={video}
                onPlay={() => handlePlay(video?._id)}
                videoRef={(el) => (videoRefs.current[video?._id] = el)}
              />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No videos found
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-4">
            <Pagination
              current={page}
              pageSize={limit}
              total={total}
              showSizeChanger={false}
              onChange={(p, ps) => {
                if (ps !== limit) {
                  setLimit(ps);
                  setPage(1);
                } else {
                  setPage(p);
                }
              }}
              disabled={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}

function PetVideoCard({ content, onPlay, videoRef }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md bg-[#F2F2F2] h-full">
      <div className="relative pb-[56.25%] w-full">
        <video
          className="absolute top-0 left-0 w-full h-full"
          src={(() => {
            const raw = content?.videoUrl || "";
            if (raw.startsWith("http")) return raw;
            const base = Url.replace(/\/+$/, "");
            const path = String(raw).replace(/^\/+/, "");
            return `${base}/${path}`;
          })()}
          controls
          preload="metadata"
          ref={videoRef}
          onPlay={onPlay}
        />
      </div>

      <div className="p-5 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 border border-gray-200 rounded-full overflow-hidden">
            <img
              src={content?.userId?.photo || "/avatar.png"}
              alt={content?.userId?.name}
              width={36}
              height={36}
              className="rounded-full w-9 h-9 object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-sm">{content?.userId?.name}</p>
            <p className="text-xs text-gray-500 truncate max-w-[180px]">{content?.title}</p>
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
          <div className="flex flex-col justify-center items-center py-12">
            <h1 className="text-3xl text-center text-[#0D0D0D]">
              Are you sure you want to delete?
            </h1>

            <div className="text-center py-6 w-full">
              <button
                onClick={async () => {
                  try {
                    await deleteVideo(content?._id).unwrap();
                  } catch (e) {
                    // noop
                  } finally {
                    setIsModalOpen(false);
                  }
                }}
                className="bg-[#FF0000] text-white font-semibold w-full py-3 px-5 rounded-lg"
              >
                {isDeleting ? "Deleting..." : "Yes"}
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
