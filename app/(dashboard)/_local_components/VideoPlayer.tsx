"use client";

import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaFullscreenButton,
  MediaLoadingIndicator,
  MediaLiveButton,
} from "media-chrome/react";
import HlsVideo from "hls-video-element/react";

type PropType = {
  streamUrl: string;
  isLive: boolean;
  viewers: number;
};

function VideoPlayer({ streamUrl, isLive, viewers }: PropType) {
  return (
    <div className="aspect-video rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden w-full">
      <MediaController className="w-full aspect-video bg-black">
        
        {/* VIDEO */}
        <HlsVideo
          slot="media"
          src={streamUrl}
          preload="auto"
          autoplay
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />

        {/* LOADING */}
        <MediaLoadingIndicator className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </MediaLoadingIndicator>

        {/* LIVE BADGE */}
        {isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded-md bg-red-500 text-white text-xs font-medium shadow">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            {viewers.toLocaleString()} watching
          </div>
        )}

        {/* CONTROLS */}
        <MediaControlBar className="bg-gradient-to-t from-black/70 to-transparent border-none px-3 flex items-center justify-between">
          
          {isLive && (
            <MediaLiveButton className="text-red-400 text-xs bg-transparent absolute top-3 right-3" />
          )}

          <MediaPlayButton className="text-white bg-transparent" />

          <div className="flex flex-row gap-2 items-center w-full">
            {!isLive && (
              <MediaTimeDisplay className="text-white text-xs bg-transparent" />
            )}
            {!isLive && (
              <MediaTimeRange className="bg-transparent w-full" />
            )}
          </div>

          <div className="flex flex-row justify-end items-center gap-2">
            <MediaMuteButton className="text-white bg-transparent" />
            <MediaVolumeRange className="w-20 bg-transparent" />
            <MediaFullscreenButton className="text-white bg-transparent" />
          </div>
        </MediaControlBar>
      </MediaController>
    </div>
  );
}

export default VideoPlayer;