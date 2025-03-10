/* eslint-disable react/prop-types */
import { FiTrash2 } from "react-icons/fi";

// Updated pet content with 6 videos
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {petContent.map((content) => (
        <PetVideoCard key={content.id} content={content} />
      ))}
    </div>
  );
}

function PetVideoCard({ content }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md bg-[#F2F2F2] h-full">
      {/* Dynamically setting the video URL */}
      <iframe
        width="560"
        height="315"
        src={content.videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

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
          <FiTrash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
