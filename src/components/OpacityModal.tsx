import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';
import {reverbeffect} from './getfile';
const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;

export default function OpacityModal({
  speed,
  setspeed,
  setLoader,
  settrack,
  setupdate,
  setvisible,
  songs,
}: any) {
  const reverb = async () => {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    await settrack(songs[currentTrackId]);
    setLoader(true);
    reverbeffect(songs[currentTrackId])
      .then(result => {
        setTimeout(() => {
          setspeed(false);
          setLoader(false);
          setupdate(true);
          setvisible(false);
          TrackPlayer.reset();
        }, 2000);
      })
      .catch(err => {
        alert('sorry internal server errror');
        setLoader(false);
        setspeed(false);
      });
  };
  return (
    <Modal transparent visible={speed}>
      <View style={styles.contanier}>
        <View style={styles.mainbar}>
          <TouchableOpacity
            onPress={() => {
              setspeed(false);
            }}
            style={{marginLeft: '10%', color: '#808080'}}>
            <AntDesign name="left" size={24} style={{color: '#808080'}} />
          </TouchableOpacity>
          <Text style={styles.now_playing_text}> Speed </Text>
        </View>
        <View style={styles.slider_view}>
          <TouchableOpacity
            style={styles.iteminlist}
            onPress={() => {
              TrackPlayer.setRate(1.25);
            }}>
            <Text style={styles.dd}>Speed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iteminlist}
            onPress={() => {
              TrackPlayer.setRate(1);
            }}>
            <Text style={styles.dd}>Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iteminlist}
            onPress={() => {
              TrackPlayer.setRate(0.90);
            }}>
            <Text style={styles.dd}>Slowed</Text>
          </TouchableOpacity>
          <View style={styles.lastdiv} />
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
