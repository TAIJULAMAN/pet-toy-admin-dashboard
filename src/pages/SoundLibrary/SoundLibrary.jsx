import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaTrash, FaUpload, FaMusic } from "react-icons/fa";
import "./SoundLibrary.css";
import { useGetAllAudiosQuery } from "../../Redux/api/audio/audioApi";
import { Url } from "../../config/envConfig";

function SoundLibrary() {
  const [sounds, setSounds] = useState([]);
  const { data } = useGetAllAudiosQuery();
  console.log("data from audio", data);
  useEffect(() => {
    if (!data) return;
    if (sounds.length > 0) return;
    const list = Array.isArray(data?.data?.liveEvent)
      ? data.data.liveEvent
      : Array.isArray(data?.data?.liveEvent)
      ? data.data.liveEvent
      : Array.isArray(data?.data?.liveEvent)
      ? data.data.liveEvent
      : [];
    const base = Url.replace(/\/+$/, "");
    const mapped = list.map((a, idx) => {
      const id = a?._id || a?.id || `api-${idx}`;
      const name = a?.title || a?.name || a?.fileName || `Audio ${idx + 1}`;
      const raw = a?.audioUrl || a?.url || a?.fileUrl || "";
      const path = String(raw || "").replace(/^\/+/, "");
      const url = `${base}/${path}`;
      return { id, name, url, isPlaying: false };
    });
    setSounds(mapped);
  }, [data]);

  const audioRefs = useRef({});

  const handlePlay = (id) => {
    setSounds(
      sounds.map((sound) => {
        if (sound.id === id) {
          if (!sound.isPlaying) {
            audioRefs.current[id].play();
          } else {
            audioRefs.current[id].pause();
          }
          return { ...sound, isPlaying: !sound.isPlaying };
        }
        return sound;
      })
    );
  };

  const handleDelete = (id) => {
    setSounds(sounds.filter((sound) => sound.id !== id));
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("audio")) {
      const url = URL.createObjectURL(file);
      const newSound = {
        id: Date.now(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        url: url,
        isPlaying: false,
      };
      setSounds([...sounds, newSound]);
    }
  };

  return (
    <div className="sound-library">
      <div className="sound-library-header">
        <div className="header-title">
          <FaMusic className="music-icon" />
          <h1 className="text-2xl font-bold">Add Sound Library</h1>
        </div>
        <label className="upload-btn">
          <input
            type="file"
            accept="audio/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
          <FaUpload className="upload-icon" />
          <span>Upload Sound</span>
        </label>
      </div>

      <div className="sound-list">
        {sounds.map((sound) => (
          <div key={sound.id} className="sound-item">
            <audio
              ref={(el) => (audioRefs.current[sound.id] = el)}
              src={sound.url}
              onEnded={() => handlePlay(sound.id)}
            />
            <div className="sound-info">
              <FaMusic className="sound-icon" />
              <span className="sound-name">{sound.name}</span>
            </div>
            <div className="sound-controls">
              <button
                className={`control-btn play ${
                  sound.isPlaying ? "playing" : ""
                }`}
                onClick={() => handlePlay(sound.id)}
                title={sound.isPlaying ? "Pause" : "Play"}
              >
                {sound.isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                className="control-btn delete"
                onClick={() => handleDelete(sound.id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {sounds.length === 0 && (
          <div className="empty-state">
            <FaMusic className="empty-icon" />
            <p>No sounds available. Upload some sounds to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoundLibrary;
