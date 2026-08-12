import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getLikedVideos,
  removeLikedVideo,
} from "../utils/likedVideos";

const LikedVideos = () => {
  const { user } = useAuth();

  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    if (user) {
      const videos = getLikedVideos(user.uid);

      setLikedVideos(videos);
    }
  }, [user]);

  const handleRemove = (videoId) => {
    removeLikedVideo(user.uid, videoId);

    setLikedVideos((prevVideos) =>
      prevVideos.filter(
        (video) => video.id !== videoId
      )
    );
  };

  if (!user) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">
          Please login to see your liked videos
        </h1>

        <Link
          to="/login"
          className="bg-red-600 px-5 py-3 rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-6">

      <h1 className="text-2xl font-bold mb-6">
        Liked Videos
      </h1>

      {likedVideos.length === 0 ? (
        <div className="text-gray-400">
          <p className="text-lg">
            You haven't liked any videos yet.
          </p>

          <p className="mt-2">
            Videos you like will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          {likedVideos.map((video) => (
            <div
              key={video.id}
              className="bg-[#181818] rounded-xl overflow-hidden"
            >

              <Link
                to={`/watch/${video.id}`}
                state={{ video }}
              >
                <img
                  src={
                    video.snippet?.thumbnails?.medium?.url ||
                    video.snippet?.thumbnails?.high?.url
                  }
                  alt={video.snippet?.title}
                  className="w-full aspect-video object-cover"
                />

                <div className="p-3">

                  <h2 className="font-semibold text-white line-clamp-2">
                    {video.snippet?.title}
                  </h2>

                  <p className="text-gray-400 text-sm mt-2">
                    {video.snippet?.channelTitle}
                  </p>

                </div>
              </Link>

              <div className="px-3 pb-3">

                <button
                  onClick={() =>
                    handleRemove(video.id)
                  }
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm"
                >
                  Remove from Liked
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default LikedVideos;