import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Repeatshit} from './getfile';
const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;
export default function Repeat({
  setSlider,
  third,
  second,
  setThird,
  setSecond,
  repeat,
  setRepeat,
  cut,
  setCut,
  first,
  setLoader,
  settrack,
  setupdate,
  setvisible,
  songs,
  duration,
}) {
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

  const Repeatit = async () => {
    return new Promise(async (resolve, reject) => {
      const currentTrackId = await TrackPlayer.getCurrentTrack();
      await settrack(songs[currentTrackId]);
      setLoader(true);
      Repeatshit(songs[currentTrackId], first, second, third, duration)
        .then(async result => {
          await TrackPlayer.reset();
          setLoader(false);
          setupdate(true);
          setvisible(false);
          alert('Please change File Name');
          resolve();
        })
        .catch(async err => {
          await TrackPlayer.reset();
          setLoader(false);
          setupdate(true);
          setvisible(false);
          alert(
            'Please Change File Name G,it Might Take Some Time for The File to Appear ',
          );
          resolve();
        });
    });
  };
  return (
    <View>
      <View style={styles.hole}>
        <View style={styles.slider_view}>
          <Text style={styles.dd}>
            {secondsToHHMMSS(Math.floor(third || 0))}
          </Text>

          <MultiSlider
            selectedStyle={{
              backgroundColor: '#e75480',
            }}
            values={[third]}
            sliderLength={duration / (duration / 100)}
            markerStyle={{
              backgroundColor: '#e75480',
            }}
            customMarkerLeft={e => {
              return <Text style={styles.dd}>{first}</Text>;
            }}
            onValuesChangeFinish={values => {
              if (values[0] !== third) {
                TrackPlayer.seekTo(values[0]);
                setThird(values[0]);
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
            {secondsToHHMMSS(Math.floor(duration || 0))}
          </Text>
          <TouchableOpacity
            style={{marginTop: '10%'}}
            onPress={() => {
              Repeatit().then(x => {
                setupdate(true);
              });
            }}>
            <AntDesign name="check" size={50} color="#e75480" />
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 20,
    color: '#e75480',
  },
  features: {
    width: '100%',
    height: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  slider_view: {
    marginTop: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '50%',
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
