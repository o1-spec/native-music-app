import { create } from 'zustand';
import { Track } from '../types/music';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  queue: Track[];
  currentIndex: number;
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (dur: number) => void;
  setQueue: (tracks: Track[]) => void;
  playPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set: (partial: Partial<PlayerState> | ((state: PlayerState) => Partial<PlayerState>)) => void, get: () => PlayerState) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  queue: [],
  currentIndex: -1,
  setCurrentTrack: (track: Track) => set({ currentTrack: track }),
  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),
  setCurrentTime: (time: number) => set({ currentTime: time }),
  setDuration: (dur: number) => set({ duration: dur }),
  setQueue: (tracks: Track[]) => set({ queue: tracks, currentIndex: tracks.length > 0 ? 0 : -1 }),
  playPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  nextTrack: () => {
    const { queue, currentIndex } = get();
    if (currentIndex < queue.length - 1) {
      const newIndex = currentIndex + 1;
      set({ currentIndex: newIndex, currentTrack: queue[newIndex], currentTime: 0 });
    }
  },
  previousTrack: () => {
    const { queue, currentIndex } = get();
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      set({ currentIndex: newIndex, currentTrack: queue[newIndex], currentTime: 0 });
    }
  },
}));