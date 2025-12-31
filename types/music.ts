export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  artworkUrl?: string;
  previewUrl?: string;
  duration: number; // in seconds
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  artworkUrl?: string;
  tracks: Track[];
}

export interface Playlist {
  id: number;
  title: string;
  description?: string;
  artworkUrl?: string;
  tracks: Track[];
}