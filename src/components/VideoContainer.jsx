import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import { categories } from "./categories";
import { GOOGLE_API_KEY } from "../utils/constants";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [pageToken, setPageToken] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  // Reset when category or search changes
  useEffect(() => {
    setVideos([]);
    setPageToken("");
    fetchVideos("", true);
  }, [selectedCategory, searchQuery]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 200 &&
        !loading
      ) {
        fetchVideos(pageToken);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageToken, loading]);

  const fetchVideos = async (token = "", reset = false) => {
    if (loading) return;
    setLoading(true);

    let url = "";

    if (searchQuery) {
      // SEARCH VIDEOS
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${searchQuery}&pageToken=${token}&key=${GOOGLE_API_KEY}`;
    } else if (selectedCategory === -1) {
      // LIVE
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=20&pageToken=${token}&key=${GOOGLE_API_KEY}`;
    } else {
      // HOME
      url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=20&pageToken=${token}${
        selectedCategory !== 0 ? `&videoCategoryId=${selectedCategory}` : ""
      }&regionCode=IN&key=${GOOGLE_API_KEY}`;
    }

    const res = await fetch(url);
    const json = await res.json();
    console.log(json)

    setVideos((prev) => [...prev, ...(json.items || [])]);
    setPageToken(json.nextPageToken || "");
    setLoading(false);
  };

  return (
    <div className="ml-40 bg-white dark:bg-black text-black dark:text-white">
      {!searchQuery && (
        <div className="flex gap-3 mt-4 overflow-x-auto ml-2 fixed top-16 w-full pb-6 pt-2 z-10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === c.id
                  ? "bg-white text-black"
                  : "bg-[#2b2b2b] text-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 gap-x-2 gap-y-10 flex flex-wrap pt-28">
        {videos.map((video, index) => (
          <VideoCard
            key={`${video.id?.videoId || video.id}-${index}`}
            info={video}
          />
        ))}
      </div>

      {loading && <p className="text-center py-6">Loading...</p>}
    </div>
  );
};

export default VideoContainer;
