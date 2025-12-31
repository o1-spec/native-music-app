import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/playerStore';

export function AudioPlayer() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const hasStartedRef = useRef(false);
  const { currentTrack, isPlaying, setCurrentTime, setDuration, setIsPlaying, seekTime, setSeekTime } = usePlayerStore();

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });
  }, []);

  useEffect(() => {
    if (currentTrack?.previewUrl) {
      console.log('Loading sound for track:', currentTrack.title, 'URL:', currentTrack.previewUrl);
      loadSound(currentTrack.previewUrl);
    }
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [currentTrack]);

  const loadSound = async (uri: string) => {
    if (!uri) {
      console.log('No URI provided, skipping load');
      return;
    }
    try {
      console.log('Loading sound for URI:', uri);
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri });
      soundRef.current = sound;
      hasStartedRef.current = false; 
      console.log('Sound loaded successfully');
      sound.setOnPlaybackStatusUpdate((status) => {
        // console.log('Status:', status.isLoaded ? 'Loaded' : 'Not loaded', 'Position:', status.positionMillis);
        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);
          setCurrentTime(status.positionMillis || 0);
          if (isPlaying && !hasStartedRef.current) {
            console.log('Auto-starting playback');
            sound.playAsync();
            hasStartedRef.current = true;
          }
          if (status.didJustFinish) {
            console.log('Track finished');
            setIsPlaying(false);
            hasStartedRef.current = false;
          }
        }
      });
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  useEffect(() => {
    const handlePlayback = async () => {
      console.log('Handling playback, isPlaying:', isPlaying);
      if (!soundRef.current) {
        console.log('No sound ref');
        return;
      }
      try {
        const status = await soundRef.current.getStatusAsync();
        console.log('Sound status isLoaded:', status.isLoaded);
        if (!status.isLoaded) return;
        if (isPlaying) {
          console.log('Calling playAsync');
          await soundRef.current.playAsync();
          hasStartedRef.current = true;
        } else {
          console.log('Calling pauseAsync');
          await soundRef.current.pauseAsync();
          hasStartedRef.current = false;
        }
      } catch (error) {
        console.error('Playback error:', error);
      }
    };
    handlePlayback();
  }, [isPlaying]);

  useEffect(() => {
    const handleSeek = async () => {
      if (!soundRef.current || seekTime === null) {
        console.log('No sound ref or seekTime, skipping seek');
        return;
      }
      try {
        const status = await soundRef.current.getStatusAsync();
        console.log('Handling seek to:', seekTime, 'status.isLoaded:', status.isLoaded);
        if (!status.isLoaded) return;
        await soundRef.current.setPositionAsync(seekTime);
        setSeekTime(null);
        console.log('Seek completed');
      } catch (error) {
        console.error('Seek error:', error);
      }
    };
    handleSeek();
  }, [seekTime]);

  return null;
}