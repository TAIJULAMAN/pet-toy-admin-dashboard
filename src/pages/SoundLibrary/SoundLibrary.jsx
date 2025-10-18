import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaTrash, FaUpload, FaMusic } from "react-icons/fa";
import "./SoundLibrary.css";
import {
  useGetAllAudiosQuery,
  useDeleteAudioMutation,
  useUploadAudioMutation,
} from "../../Redux/api/audio/audioApi";
import { Url } from "../../config/envConfig";

function SoundLibrary() {
  const [sounds, setSounds] = useState([]);
  console.log("sounds ", sounds);
  const { data: audiosData, refetch } = useGetAllAudiosQuery();
  const [deleteAudio] = useDeleteAudioMutation();
  const [uploadAudio, { isLoading: isUploading }] = useUploadAudioMutation();
  // console.log("data from audio", data);
  useEffect(() => {
    if (!audiosData) return;
    const list = Array.isArray(audiosData?.data?.liveEvent)
      ? audiosData.data.liveEvent
      : [];
    const base = Url.replace(/\/+$/, "");
    const mapped = list.map((a, idx) => {
      const id = a?._id;
      const name = a?.title || a?.name || a?.fileName || `Audio ${idx + 1}`;
      const raw = a?.audioUrl || a?.url || a?.fileUrl || "";
      const path = String(raw || "").replace(/^\/+/, "");
      const url = `${base}/${path}`;
      return { id, name, url, isPlaying: false };
    });
    setSounds(mapped);
  }, [audiosData]);

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

  const handleDelete = async (id) => {
    try {
      await deleteAudio(id).unwrap();
    } catch (e) {
      // noop: keep UI responsive even if API fails
    } finally {
      setSounds((prev) => prev.filter((s) => s.id !== id));
      try {
        await refetch();
      } catch {}
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.includes("audio")) return;
    try {
      await uploadAudio(file).unwrap();
      await refetch();
    } catch (e) {
      // optionally toast error
    } finally {
      // reset input value so same file can be selected again
      event.target.value = "";
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
