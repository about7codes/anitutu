import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Box } from "@mui/material";
import Plyr from "plyr";
import Hls from "hls.js";
import "plyr/dist/plyr.css";
import { EpisodeStream } from "../../pages/anime/[id]/watch";

type VideoPlayerProps = {
  episodeStreamInfo: EpisodeStream | null;
};

const VideoPlayer = ({ episodeStreamInfo }: VideoPlayerProps) => {
  const video = useRef<HTMLVideoElement>(null!);
  const playerInstance = useRef<Plyr>(null!);

  useEffect(() => {
    const source = episodeStreamInfo?.sources[0].url || "";
    playerInstance.current = new Plyr(video.current, {
      clickToPlay: true,
      quality: {
        options: [360, 720, 1080],
        forced: true,
        onChange: (e) => {
          console.log("run", e);
        },
      },
    });

    // playerInstance.current.source = {
    //   type: "video",
    //   title: "Example title",
    //   sources: [
    //     {
    //       src: source,
    //       // type: 'video/mp4',
    //       size: 720,
    //     },
    //     {
    //       src: source,
    //       // type: 'video/webm',
    //       size: 1080,
    //     },
    //   ],
    // };

    const hls = new Hls();
    hls.loadSource(source);

    hls.attachMedia(video.current);
    window.hls = hls;
    window.player = playerInstance.current;

    // return () => {
    //   playerInstance.current.destroy();
    // };
  }, []);

  return (
    <Box>
      <video
        id="player"
        ref={video}
        className="video-js"
        autoPlay={true}
        preload="auto"
      ></video>
    </Box>
  );
};

export default VideoPlayer;
