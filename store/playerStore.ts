import { create } from 'zustand';
import { searchMusic } from '../lib/musicApi';
import { Track } from '../types/music';

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  seekTime: number | null;
  pausedPosition: number | null;
  setCurrentTrack: (track: Track | null) => void;
  setQueue: (queue: Track[]) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setSeekTime: (time: number | null) => void;
  setPausedPosition: (pos: number | null) => void;
  playPause: () => void;
  nextTrack: () => Promise<void>;
  previousTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  seekTime: null,
  pausedPosition: null,
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setQueue: (queue) => set({ queue }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setSeekTime: (time) => set({ seekTime: time }),
  setPausedPosition: (pos) => set({ pausedPosition: pos }),
  playPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  nextTrack: async () => {
    const { queue, currentTrack } = get();
    const currentIndex = queue.findIndex((t) => t.id === currentTrack?.id);
    let nextIndex = (currentIndex + 1) % queue.length;
    console.log('nextTrack: queue length', queue.length, 'currentIndex', currentIndex, 'nextIndex', nextIndex);
    if (nextIndex === currentIndex) {
      console.log('Queue has one track, fetching more by artist');
      if (currentTrack) {
        try {
          const data = await searchMusic(currentTrack.artist);
          const newTracks = data.tracks.filter(t => t.id !== currentTrack.id).slice(0, 10);
          set({ queue: [...queue, ...newTracks] });
          nextIndex = 1;
          console.log('Added', newTracks.length, 'new tracks');
        } catch (error) {
          console.error('Error fetching more tracks:', error);
          return;
        }
      }
    }
    const updatedQueue = get().queue;
    set({ currentTrack: updatedQueue[nextIndex] });
  },
  previousTrack: () => {
    const { queue, currentTrack } = get();
    const currentIndex = queue.findIndex((t) => t.id === currentTrack?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
    set({ currentTrack: queue[prevIndex] });
  },
}));