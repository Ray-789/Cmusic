import Slider from '@react-native-community/slider';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

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
const PlayOrPause = ({name}: any) => {
  if (name === 'pause') {
    return <Fontisto name="zipper-mouth" size={20} color="#e75480" />;
  } else {
    return <Fontisto name="open-mouth" size={50} color="#e75480" />;
  }
};

export default function SmallPlay({track, setvisible}) {
  const {position, buffered, duration} = useProgress();
  if (!track) {
    return null;
  } else {
    return (
      <TouchableOpacity
        style={styles.restricted}
        onPress={() => {
          setvisible(true);
        }}>
        <View style={{width:'50%'}} >
          <Text style={styles.dd}>{track.title}</Text>
        </View>
        <PlayOrPause name="play" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  dd: {
    fontSize: 20,
    color: '#e75480',
  },
  restricted: {
    width: '100%',
    height: '10%',
    gap:50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  slider_view: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#808080',
  },
  slider_style: {
    height: '70%',
    width: '60%',
    color: '#808080',
  },
  slider_time: {
    fontSize: 15,
    marginLeft: '6%',
    color: '#808080',
    color: '#808080',
  },
  functions_view: {
    flexDirection: 'row',
    height: '10%',
    width: '100%',
    alignItems: 'center',
    color: '#808080',
  },
  recently_played_view: {
    height: '25%',
    width: '100%',
  },
  recently_played_text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808080',
    marginLeft: '5%',
    marginTop: '6%',
  },
  recently_played_list: {
    backgroundColor: '#FFE3E3',
    height: '50%',
    width: '90%',
    borderRadius: 10,
    marginLeft: '5%',
    marginTop: '5%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  recently_played_image: {
    height: '80%',
    width: '20%',
    borderRadius: 10,
  },
  recently_played_list_text: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
  },
  recently_played_list_text1: {
    fontSize: 15,
    marginLeft: '8%',
  },
  recently_played_list_text2: {
    fontSize: 16,
    color: '#808080',
    marginLeft: '8%',
  },
});
