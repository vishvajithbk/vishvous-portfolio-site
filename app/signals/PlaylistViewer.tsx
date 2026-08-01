"use client";

import { useState } from "react";
import styles from "./archive.module.css";
import { playlist } from "./archive";

const playlistId = "PLAVWgRxryYXI";

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function PlaylistViewer() {
  const [selectedVideoId, setSelectedVideoId] = useState(
    playlist.videos[0].id,
  );
  const selectedVideo =
    playlist.videos.find((video) => video.id === selectedVideoId) ??
    playlist.videos[0];
  const embedUrl = `https://www.youtube-nocookie.com/embed/${selectedVideo.id}?rel=0&list=${playlistId}`;

  return (
    <article
      className={styles.playlistCard}
      aria-label={`${playlist.title} playlist viewer`}
    >
      <div className={styles.playerFrame}>
        <iframe
          key={selectedVideo.id}
          src={embedUrl}
          title={`${selectedVideo.title} video preview`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className={styles.playlistRail}>
        <header className={styles.playlistCopy}>
          <p className={styles.playlistMeta}>
            YouTube playlist · {playlist.videoCount} videos
          </p>
          <h3>{playlist.title}</h3>
          <p className={styles.playlistDescription}>{playlist.description}</p>
        </header>

        <ol
          className={styles.videoList}
          aria-label={`${playlist.title} videos`}
        >
          {playlist.videos.map((video, index) => {
            const isSelected = video.id === selectedVideo.id;

            return (
              <li key={video.id}>
                <button
                  type="button"
                  className={styles.videoItem}
                  data-selected={isSelected}
                  aria-current={isSelected ? "true" : undefined}
                  aria-label={`Preview ${video.title}`}
                  onClick={() => setSelectedVideoId(video.id)}
                >
                  <span
                    className={styles.videoThumbnail}
                    style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
                    aria-hidden="true"
                  >
                    <span>{video.duration}</span>
                  </span>

                  <span className={styles.videoItemCopy}>
                    <span className={styles.videoPosition} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.videoTitle}>{video.title}</span>
                    <span className={styles.videoChannel}>{video.channel}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <a
          className={styles.playlistLink}
          href={playlist.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${playlist.title} on YouTube in a new tab`}
        >
          <span>Open on YouTube</span>
          <ExternalArrow />
        </a>
      </div>
    </article>
  );
}
