import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks(arr) {
  await TrackPlayer.add(arr);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}
export async function changeRepeatMode(mode: any) {
  await TrackPlayer.setRepeatMode(mode);
}
import {SetState, create} from 'zustand';
type ProgressStateStore = {
  map: Record<string, number>;
  setProgress: (id: string, progress: number) => void;
};

export const useProgressStateStore = create<ProgressStateStore>(
  (set: SetState<ProgressStateStore>) => ({
    map: {},
    setProgress: (id: string, progress: number) =>
      set(state => {
        state.map[id] = progress;
      }),
  }),
);
import {useCallback} from 'react';

export const useTrackProgress = (id: string | number): number => {
  return useProgressStateStore(
    useCallback(
      state => {
        return state.map[id.toString()] || 0;
      },
      [id],
    ),
  );
};

export async function playbackService() {
  // TODO: Attach remote event handlers
}
