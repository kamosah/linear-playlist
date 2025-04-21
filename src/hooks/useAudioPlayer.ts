import { useContext } from "react";
import { PlayerContext } from "../context";

// Hook for easy access to the player context
export const useAudioPlayer = () => {
  const context = useContext(PlayerContext);

  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }

  return context;
};
