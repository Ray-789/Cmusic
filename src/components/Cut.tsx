import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';
import React, {useEffect, useState} from 'react';
import {Deleteshit, cutVideo, mute, reverbeffect} from './getfile';
const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MySlider from './Slider';
import Repeat from './Repeat';

const secondsToHHMMSS = (seconds: number | string) => {
  // credits - https://stackoverflow.com/a/37096512
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hrs}${mins}${scnds}`;
};

export default function Cut({
  cut,
  setCut,
  setLoader,
  settrack,
  setupdate,
  setvisible,
  songs,
  duration,
}: any) {
  const [repeat, setRepeat] = useState(false);
  const [slider, setSlider] = useState(false);
  const [second, setSecond] = useState(duration);
  const [third, setThird] = useState(0);
  const [first, setFirst] = useState(0);
  useEffect(() => {
    const currentShit = async () => {
      const currentTrackId = await TrackPlayer.getCurrentTrack();
      await settrack(songs[currentTrackId]);
    };
    currentShit();
  }, [duration]);
  const Delete = async () => {
    return new Promise(async (resolve, reject) => {
      if (second === duration && first === 0) {
        alert('Bro Move the markers please.');
        reject();
      }
      const currentTrackId = await TrackPlayer.getCurrentTrack();
      setLoader(true);
      await Deleteshit(songs[currentTrackId], first, second, duration)
        .then(result => {
          setLoader(false);
          setupdate(true);
          setvisible(false);
          TrackPlayer.reset();
        })
        .catch(err => {
          setLoader(false);
          setupdate(true);
          setvisible(false);
          TrackPlayer.reset();
        });
    });
  };
  const Miute = async () => {
    return new Promise(async (resolve, reject) => {
      if (second === duration && first === 0) {
        alert('Bro Move the markers please.');
        reject();
      }

      const currentTrackId = await TrackPlayer.getCurrentTrack();
      setLoader(true);
      await mute(songs[currentTrackId], first, second)
        .then(result => {
          setLoader(false);

          setupdate(true);

          setvisible(false);
          TrackPlayer.reset();
        })
        .catch(err => {
          alert(err.message);
        });
    });
  };
  return (
    <Modal transparent visible={cut}>
      <View style={styles.contanier}>
        <View style={styles.mainbar}>
          <TouchableOpacity
            onPress={() => {
              setCut(false);
            }}
            style={{marginLeft: '10%', color: '#808080'}}>
            <AntDesign name="left" size={24} style={{color: '#808080'}} />
          </TouchableOpacity>
          <Text style={styles.now_playing_text}> custom </Text>
        </View>
        <View style={styles.slider_view}>
          {repeat && (
            <Repeat
              slider={slider}
              setSlider={setSlider}
              cut={cut}
              setCut={setCut}
              setLoader={setLoader}
              settrack={settrack}
              setupdate={setupdate}
              setvisible={setvisible}
              songs={songs}
              duration={duration}
              third={third}
              first={first}
              second={second}
              repeat={repeat}
              setRepeat={setRepeat}
              setThird={setThird}
            />
          )}

          {!slider && (
            <MySlider
              slider={slider}
              setSlider={setSlider}
              cut={cut}
              setCut={setCut}
              setLoader={setLoader}
              settrack={settrack}
              setupdate={setupdate}
              setvisible={setvisible}
              songs={songs}
              duration={duration}
              first={first}
              second={second}
              setSecond={setSecond}
              setFirst={setFirst}
            />
          )}
          {slider && !repeat && (
            <>
              <TouchableOpacity
                style={styles.iteminlist}
                onPress={() => {
                  Delete();
                }}>
                <Text style={styles.dd}>delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iteminlist}
                onPress={() => {
                  setRepeat(true);
                }}>
                <Text style={styles.dd}>Repeat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iteminlist}
                onPress={() => {
                  Miute();
                }}>
                <Text style={styles.dd}>Mute</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
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
