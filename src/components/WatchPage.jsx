import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GOOGLE_API_KEY } from "../utils/constants";

const WatchPage = () => {
  const { videoId } = useParams();
  const location = useLocation();

  const [video, setVideo] = useState(location.state?.video || null);
  const [loading, setLoading] = useState(!location.state?.video);
  const [error, setError] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // If video details were already passed from VideoCard,
    // don't make another API request.
    if (location.state?.video) {
      setVideo(location.state.video);
      setLoading(false);
      return;
    }

    // If there is no video data in state,
    // fetch it using the videoId from the URL.
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${GOOGLE_API_KEY}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch video details");
        }

        const json = await res.json();

        console.log("Fetched video:", json);

        if (json.items && json.items.length > 0) {
          setVideo(json.items[0]);
        } else {
          setError("Video not found");
        }
      } catch (error) {
        console.error("Error fetching video:", error);
        setError("Something went wrong while loading the video.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId, location.state]);

  // Loading
  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex justify-center items-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="bg-black min-h-screen text-white flex justify-center items-center">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  // No video data
  if (!video) {
    return (
      <div className="bg-black min-h-screen text-white flex justify-center items-center">
        <p className="text-lg">Video details not available.</p>
      </div>
    );
  }

  const { snippet, statistics, contentDetails } = video;

  // Format views
  const formatViews = (viewCount) => {
    if (!viewCount) return "";

    const views = Number(viewCount);

    if (views >= 1_000_000_000) {
      return `${(views / 1_000_000_000).toFixed(1)}B views`;
    }

    if (views >= 1_000_000) {
      return `${(views / 1_000_000).toFixed(1)}M views`;
    }

    if (views >= 1_000) {
      return `${(views / 1_000).toFixed(1)}K views`;
    }

    return `${views} views`;
  };

  // Format published time
  const formatPublishedTime = (publishedAt) => {
    if (!publishedAt) return "";

    const publishedDate = new Date(publishedAt);
    const now = new Date();

    const diff = Math.floor((now - publishedDate) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    const months = Math.floor(diff / (86400 * 30));
    const years = Math.floor(diff / (86400 * 365));

    if (diff < 60) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (days < 30) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (months < 12) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  };

  // Format YouTube duration
  const formatDuration = (duration) => {
    if (!duration) return "";

    const match = duration.match(
      /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    );

    if (!match) return "";

    const hours = match[1];
    const minutes = match[2] || "0";
    const seconds = match[3] || "0";

    if (hours) {
      return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(
        2,
        "0"
      )}`;
    }

    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  return (
    <div className="bg-black min-h-screen text-white p-6 mx-auto my-16">
      <div className="w-[800px] mx-auto">

        {/* YouTube Video */}
        <iframe
          className="w-full aspect-video rounded-xl my-5"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={snippet.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        {/* Video Title */}
        <h1 className="text-xl font-bold mt-4">
          {snippet.title}
        </h1>

        {/* Channel Name */}
        <div className="mt-4">
          <p className="font-semibold text-lg">
            {snippet.channelTitle}
          </p>
        </div>

        {/* Views + Published Time */}
        <div className="flex gap-2 text-gray-400 text-sm mt-2">
          <span>
            {formatViews(statistics?.viewCount)}
          </span>

          <span>•</span>

          <span>
            {formatPublishedTime(snippet.publishedAt)}
          </span>
        </div>

        {/* Likes */}
        {statistics?.likeCount && (
          <div className="mt-4">
            <span className="bg-[#272727] px-4 py-2 rounded-full">
              👍 {Number(statistics.likeCount).toLocaleString()}
            </span>
          </div>
        )}

        {/* Description */}
        <div className="bg-[#272727] rounded-xl p-4 mt-5">
  <p
    className={`whitespace-pre-line text-sm ${
      !showFullDescription ? "line-clamp-3" : ""
    }`}
  >
    {snippet.description}
  </p>

  <button
    onClick={() => setShowFullDescription(!showFullDescription)}
    className="font-semibold text-sm mt-2"
  >
    {showFullDescription ? "Show less" : "Read more..."}
  </button>
</div>

        {/* Duration */}
        {contentDetails?.duration && (
          <p className="text-gray-400 mt-4 text-sm">
            Duration: {formatDuration(contentDetails.duration)}
          </p>
        )}

        {/* Comments */}
        {statistics?.commentCount && (
          <p className="text-gray-400 mt-4">
            {Number(statistics.commentCount).toLocaleString()} comments
          </p>
        )}
      </div>
    </div>
  );
};

export default WatchPage;







// import React from "react";
// import { useParams } from "react-router-dom";

// const WatchPage = () => {

//   const {videoId} = useParams();
//   console.log(videoId);
  
//   return (
//   <div className="bg-white min-h-screen text-white p-6 mx-auto my-16">
//       <div className="w-[800px] mx-auto">
//         <iframe
//           className="w-full aspect-video rounded-xl my-5"
//           src={`https://www.youtube.com/embed/${videoId}`}
//           title="YouTube video player"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowFullScreen
//         ></iframe>
//       </div>
//     </div>
//     );
// };

// export default WatchPage;



