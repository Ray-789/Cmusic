import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';

const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;
import TrackPlayer, {
  RepeatMode,
  useTrackPlayerEvents,
  Event,
  State,
  useProgress,
} from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import {eightD} from './getfile';
import OpacityModal from './OpacityModal';
import Loader from './Loader';
import Cut from './Cut';
// import {playbackService} from './sound';

const PlayOrPause = ({name}: any) => {
  if (name === 'pause') {
    return <Fontisto name="zipper-mouth" size={50} color="#e75480" />;
  } else {
    return <Fontisto name="open-mouth" size={50} color="#e75480" />;
  }
};

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
export const Play = ({
  update,
  setupdate,
  track,
  songs,
  visible,
  settrack,
  setvisible,
  playNextPrev,
  selected,
}: any) => {
  const images = [
    require('./first.jpg'),
    require('./second.jpg'),
    require('./third.jpg'),
    require('./fourth.jpg'),
    require('./design.png'),
    require('./design2.png'),
    require('./design3.png'),
    require('./design4.png'),
    require('./design5.png'),
    require('./design6.png'),
    require('./design7.png'),
    require('./design8.png'),
  ];
  const [currentImage, setCurrentImage] = useState(images[1]);
  const {position, buffered, duration} = useProgress();
  const [progress, setProgress] = useState(position);
  const [loader, setLoader] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [cut, setCut] = useState(false);
  const [isPlaying, setPlaying] = useState(true);
  const [queue, setQueue] = useState(RepeatMode.Queue);
  const [shuffle, setShuffle] = useState(false);

  const trackplay = async (q: any) => {
    if (q === RepeatMode.Queue) {
      setQueue(RepeatMode.Track);
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
    } else {
      setQueue(RepeatMode.Queue);
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    }
  };
  const onPlayPausePress = async () => {
    const state = await TrackPlayer.getState();
    console.log(TrackPlayer.STATE_PAUSED);
    if (state === 'playing') {
      TrackPlayer.pause();
      setPlaying(false);
    } else {
      TrackPlayer.play();
      setPlaying(true);
    }
  };
  const calleight = async () => {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    await settrack(songs[currentTrackId]);
    setLoader(true);
    eightD(songs[currentTrackId])
      .then(result => {
        setLoader(false);
        setupdate(true);
        setvisible(false);
        TrackPlayer.reset();
      })
      .catch(err => {
        alert(err.message);
      });
  };

  useEffect(() => {
    setPlaying(true);

    const currentShit = async () => {
      const currentTrackId = await TrackPlayer.getCurrentTrack();
      await settrack(songs[currentTrackId]);
    };
    currentShit();
    const intervalId = setInterval(() => {
      setCurrentImage(images[Math.floor(Math.random() * 8)]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [duration, track]);

  return (
    <Modal animationType="slide" visible={visible}>
      {speed && (
        <OpacityModal
          speed={speed}
          setspeed={setSpeed}
          setLoader={setLoader}
          setvisible={setvisible}
          settrack={settrack}
          setupdate={setupdate}
          songs={songs}
        />
      )}
      {cut && (
        <Cut
          cut={cut}
          setCut={setCut}
          setLoader={setLoader}
          setvisible={setvisible}
          settrack={settrack}
          setupdate={setupdate}
          songs={songs}
          progress={position}
          duration={duration}
        />
      )}
      <View style={styles.contanier}>
        <View style={styles.mainbar}>
          <TouchableOpacity
            onPress={setvisible(false)}
            style={{marginLeft: '5%', color: '#808080'}}>
            <AntDesign name="left" size={24} style={{color: '#808080'}} />
          </TouchableOpacity>
          <Text style={styles.now_playing_text}> Now Playing </Text>

          <TouchableOpacity style={{marginLeft: '20%'}}>
            <Entypo
              name="dots-three-horizontal"
              size={24}
              style={{color: '#808080'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.music_logo_view}>
          {loader && <Loader />}
          {!loader && <Image source={currentImage} style={styles.image_view} />}
        </View>

        <View style={styles.name_of_song_View}>
          <Text style={styles.name_of_song_Text1}>{track.title}</Text>
        </View>

        <View style={styles.slider_view}>
          <Text style={styles.slider_time}>
            {secondsToHHMMSS(Math.floor(position || 0))}
          </Text>
          <Slider
            style={styles.slider_style}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor="#e75480"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#e75480"
            value={position}
            onSlidingComplete={x => {
              TrackPlayer.seekTo(x);
              console.log(x);
            }}
          />
          <Text style={styles.slider_time}>
            {secondsToHHMMSS(Math.floor(duration || 0))}
          </Text>
        </View>

        <View style={styles.functions_view}>
          <TouchableOpacity
            style={{marginLeft: '9%'}}
            onPress={async () => {
              if (!shuffle) {
                await TrackPlayer.setRepeatMode(RepeatMode.Off);
                setShuffle(true);
              } else {
                await TrackPlayer.setRepeatMode(queue);
                setShuffle(false);
              }
            }}>
            {shuffle === false ? (
              <Entypo name="shuffle" size={24} color="#e75480" />
            ) : (
              <Entypo name="shuffle" size={24} color="#808080" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: '12%'}}
            onPress={() => playNextPrev('prev')}>
            <Entypo name="controller-fast-backward" size={24} color="#e75480" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: '12%'}}
            onPress={() => {
              onPlayPausePress('prev');
            }}>
            <PlayOrPause name={isPlaying ? 'play' : 'pause'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: '12%'}}
            onPress={() => {
              playNextPrev('next');
            }}>
            <Entypo name="controller-fast-forward" size={24} color="#e75480" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: '10%'}}
            onPress={() => {
              trackplay(queue);
            }}>
            {queue === RepeatMode.Queue ? (
              <Feather name="repeat" size={20} color="#e75480" />
            ) : (
              <Entypo name="loop" size={20} color="#e75480" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.features}>
          <TouchableOpacity
            onPress={async () => {
              setQueue(RepeatMode.Track);
              await TrackPlayer.setRepeatMode(RepeatMode.Track);
              setCut(true);
            }}>
            <Entypo name="scissors" size={50} color="#e75480" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSpeed(true);
            }}>
            <MaterialIcons name="slow-motion-video" size={50} color="#e75480" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              calleight();
            }}>
            <Text style={styles.dd}>8D</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contanier: {
    height: Dev_Height,
    width: Dev_Width,
    backgroundColor: 'black',
  },
  dd: {
    fontSize: 50,
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
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
  name_of_song_View: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#808080',
  },
  name_of_song_Text1: {
    fontSize: 19,
    fontWeight: '500',
    color: '#808080',
  },
  name_of_song_Text2: {
    color: '#808080',
    marginTop: '4%',
    color: '#808080',
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
