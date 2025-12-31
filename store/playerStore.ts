import { create } from "zustand";
import { Track } from "../types/music";

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  seekTime: number | null;
  setCurrentTrack: (track: Track | null) => void;
  setQueue: (queue: Track[]) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setSeekTime: (time: number | null) => void;
  playPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  seekTime: null,
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setQueue: (queue) => set({ queue }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setSeekTime: (time) => set({ seekTime: time }),
  playPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  nextTrack: () => {
    const { queue, currentTrack } = get();
    const currentIndex = queue.findIndex((t) => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    set({ currentTrack: queue[nextIndex] });
  },
  previousTrack: () => {
    const { queue, currentTrack } = get();
    const currentIndex = queue.findIndex((t) => t.id === currentTrack?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
    set({ currentTrack: queue[prevIndex] });
  },
}));
