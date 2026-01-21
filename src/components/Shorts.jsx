import React, { useEffect, useState, useRef } from "react";
import { GOOGLE_API_KEY } from "../utils/constants";
import { Link } from "react-router-dom";

const Shorts = () => {
  const [shorts, setShorts] = useState([]);
  const videoRefs = useRef([]);

  const fetchShorts = async () => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=shorts&type=video&videoDuration=short&maxResults=20&key=${GOOGLE_API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();
    setShorts(data.items || []);
  };

  useEffect(() => {
    fetchShorts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target;
          const player = iframe.contentWindow;

          if (entry.isIntersecting) {
            player.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              "*",
            );
          } else {
            player.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*",
            );
          }
        });
      },
      { threshold: 0.7 },
    );

    videoRefs.current.forEach((iframe) => {
      if (iframe) observer.observe(iframe);
    });

    return () => observer.disconnect();
  }, [shorts]);

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {shorts.map((item, index) => (
        <div
          key={item.id.videoId}
          className="h-screen w-full flex items-center justify-center bg-black snap-start relative"
        >
          <iframe
            ref={(el) => (videoRefs.current[index] = el)}
            src={`https://www.youtube.com/embed/${item.id.videoId}?enablejsapi=1&autoplay=0&mute=1&controls=0&playsinline=1&loop=1`}
            className="h-[95%] w-full object-cover"
            allow="autoplay"
          ></iframe>

          <div className="text-sm bg-gray-400 w-15 mr-4 p-2 rounded-lg">
            <Link to={"/"}>Home</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shorts;
