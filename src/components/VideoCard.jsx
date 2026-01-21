import React from "react";

const VideoCard = ({ info }) => {
  if (!info) return null;

  const { snippet, statistics } = info;
  if (!snippet) return null;

  /* View Count */
  let viewsText = "";

  if (statistics?.viewCount) {
    let views = Number(statistics.viewCount);
    let symbol = "";

    if (views >= 1_000 && views < 1_000_000) {
      views = Math.floor(views / 1_000);
      symbol = "K";
    } else if (views >= 1_000_000 && views < 1_000_000_000) {
      views = Math.floor((views / 1_000_000) * 10) / 10;
      symbol = "M";
    } else if (views >= 1_000_000_000) {
      views = Math.floor((views / 1_000_000_000) * 10) / 10;
      symbol = "B";
    }

    viewsText = `${views}${symbol} views`;
  }

  /* Published Time */
  let publishedTime = "";

  if (snippet.publishedAt) {
    const publishedDate = new Date(snippet.publishedAt);
    const now = new Date();
    const diff = Math.floor((now - publishedDate) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    const months = Math.floor(diff / (86400 * 30));
    const years = Math.floor(diff / (86400 * 365));

    if (diff < 60) publishedTime = "just now";
    else if (minutes < 60)
      publishedTime = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    else if (hours < 24)
      publishedTime = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    else if (days < 30) publishedTime = `${days} day${days > 1 ? "s" : ""} ago`;
    else if (months < 12)
      publishedTime = `${months} month${months > 1 ? "s" : ""} ago`;
    else publishedTime = `${years} year${years > 1 ? "s" : ""} ago`;
  }

  /* Video ID(Search + Video API) */

  const videoId = info.id?.videoId || info.id;

  const { title, channelTitle, thumbnails } = snippet;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-[24rem] p-2 cursor-pointer">
        <img
          className="rounded-lg w-full"
          src={thumbnails?.medium?.url}
          alt="thumbnail"
        />

        <ul>
          <li className="mt-3 mb-1 font-semibold text-[1rem] line-clamp-2">
            {title}
          </li>

          <li className="text-[0.85rem] text-gray-450">{channelTitle}</li>

          {(viewsText || publishedTime) && (
            <li className="text-[0.8rem] text-gray-450">
              {viewsText}
              {viewsText && publishedTime && " • "}
              {publishedTime}
            </li>
          )}
        </ul>
      </div>
    </a>
  );
};

export default VideoCard;
