export const getLikedVideos = (userId) => {
  if (!userId) return [];

  const key = `likedVideos_${userId}`;

  const likedVideos = localStorage.getItem(key);

  return likedVideos ? JSON.parse(likedVideos) : [];
};

export const saveLikedVideo = (userId, video) => {
  if (!userId || !video) return;

  const key = `likedVideos_${userId}`;

  const likedVideos = getLikedVideos(userId);

  const alreadyLiked = likedVideos.some(
    (likedVideo) => likedVideo.id === video.id
  );

  if (!alreadyLiked) {
    likedVideos.push(video);

    localStorage.setItem(
      key,
      JSON.stringify(likedVideos)
    );
  }
};

export const removeLikedVideo = (userId, videoId) => {
  if (!userId || !videoId) return;

  const key = `likedVideos_${userId}`;

  const likedVideos = getLikedVideos(userId);

  const updatedVideos = likedVideos.filter(
    (video) => video.id !== videoId
  );

  localStorage.setItem(
    key,
    JSON.stringify(updatedVideos)
  );
};

export const isVideoLiked = (userId, videoId) => {
  if (!userId || !videoId) return false;

  const likedVideos = getLikedVideos(userId);

  return likedVideos.some(
    (video) => video.id === videoId
  );
};