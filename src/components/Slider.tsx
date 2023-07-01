import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';
import {reverbeffect} from './getfile';
const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const secondsToHHMMSS = (seconds: number | string) => {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hrs}${mins}${scnds}`;
};

export default function MySlider({
  setSlider,
  first,
  second,
  setFirst,
  setSecond,
  cut,
  setCut,
  setLoader,
  settrack,
  setupdate,
  setvisible,
  songs,
  duration,
}: any) {
  return (
    <View style={styles.hole}>
      <View style={styles.slider_view}>
        <Text style={styles.dd}>{secondsToHHMMSS(Math.floor(first || 0))}</Text>

        <MultiSlider
          selectedStyle={{
            backgroundColor: '#e75480',
          }}
          values={[first, second]}
          sliderLength={duration / (duration / 100)}
          markerStyle={{
            backgroundColor: '#e75480',
          }}
          customMarkerLeft={e => {
            return <Text style={styles.dd}>{first}</Text>;
          }}
          onValuesChangeFinish={values => {
            if (values[0] !== first) {
              TrackPlayer.seekTo(values[0]);
              setFirst(values[0] - 1);
              TrackPlayer.play();
            } else if (values[1] !== second) {
              TrackPlayer.seekTo(values[1]);
              setSecond(values[1] - 1);
              TrackPlayer.play();
            }
          }}
          customMarkerRight={e => {
            return <Text style={styles.dd}>tfcdtaSF</Text>;
          }}
          max={duration}
          min={0}
        />
        <Text style={styles.dd}>
          {secondsToHHMMSS(Math.floor(second || 0))}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setSlider(true);
        }}>
        <AntDesign name="check" size={50} color="#e75480" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  contanier: {
    height: Dev_Height,
    width: Dev_Width,
    backgroundColor: 'rgba(000, 000, 000, 0.7)',
  },
  dd: {
    fontSize: 15,
    color: '#e75480',
    margin: '20%',
  },
  features: {
    width: '100%',
    height: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  slider_time: {
    fontSize: 15,
    color: '#808080',
    color: '#808080',
  },
  mainbar: {
    height: '12%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  now_playing_text: {
    fontSize: 19,
    marginLeft: '24%',
    color: '#808080',
  },
  music_logo_view: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#808080',
  },
  image_view: {
    height: '100%',
    width: '50%',
    borderRadius: 10,
  },
  iteminlist: {
    width: '100%',
    borderBottomColor: '#0e1111',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(000, 000, 000, 0.7)',
  },
  hole: {
    padding: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    color: '#e75480',
  },
  slider_view: {
    padding: '15%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    color: '#e75480',
  },
  lastdiv: {
    display: 'flex',
    width: '100%',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
