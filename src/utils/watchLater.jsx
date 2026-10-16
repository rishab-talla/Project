export const getWatchLaterVideos = (userId) => {
  if (!userId) return [];

  const key = `watchLaterVideos_${userId}`;

  const videos = localStorage.getItem(key);

  return videos ? JSON.parse(videos) : [];
};


export const saveWatchLaterVideo = (userId, video) => {
  if (!userId || !video) return;

  const key = `watchLaterVideos_${userId}`;

  const videos = getWatchLaterVideos(userId);

  const alreadyExists = videos.some(
    (item) => item.id === video.id
  );

  if (!alreadyExists) {
    videos.push(video);

    localStorage.setItem(
      key,
      JSON.stringify(videos)
    );
  }
};


export const removeWatchLaterVideo = (userId, videoId) => {
  if (!userId || !videoId) return;

  const key = `watchLaterVideos_${userId}`;

  const videos = getWatchLaterVideos(userId);

  const updatedVideos = videos.filter(
    (video) => video.id !== videoId
  );

  localStorage.setItem(
    key,
    JSON.stringify(updatedVideos)
  );
};


export const isVideoInWatchLater = (
  userId,
  videoId
) => {
  if (!userId || !videoId) return false;

  const videos = getWatchLaterVideos(userId);

  return videos.some(
    (video) => video.id === videoId
  );
};