/* eslint-disable prettier/prettier */
import TrackPlayer, { Event } from 'react-native-track-player';



const MUsic = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
};

export default MUsic;
