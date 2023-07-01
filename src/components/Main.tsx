/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useEffect, createContext, useState,useContext} from 'react';
export const NoteContext = createContext();

import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView} from 'react-native';
import {height, width} from '../utils';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import TrackPlayer,{RepeatMode, State,usePlaybackState} from 'react-native-track-player';
import { addTracks, setupPlayer } from './sound';
import {Header} from './Header';
import { Divider, TextInput } from 'react-native-paper';
import { Play, tracks } from './Play';
import { ChangeName, deletefile, eightD } from './getfile';
import SmallPlay from './SmallPlay';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from './Loader';


const  orgonizeTracks = async(arr: unknown)=>{
  return new Promise(async(resolve,reject)=>{
       const arr1 = await Promise.all(arr.map(async(x: { path: any; name: any; },y: any)=>{
              const obj = {url:x.path,title:x.name,id:y};
        return  obj;
       }));
       resolve(arr1);
   });
};



const Item = ({shit,settrack,setModalVisible,isplaying,setupdate}) => {
  const [edit,setEdit] = useState(false);
  const [writing,setWriting] = useState(false);
  const [name,setName] = useState('');
  const [load,setLoder] = useState(false);
  let highlightStyle = {};
  if (isplaying){
      highlightStyle = { backgroundColor: '#e75480' };
  }
  useEffect(()=>{
       setupdate(false)
  },[])
const Changable = ()=>{
  return new Promise((resolve,reject)=>{
    if (name === ''){
      alert('bruv type something');
      resolve();
    }
    setLoder(true);
    ChangeName(shit,name).then(()=>{
      setWriting(false);
      setEdit(false);
      setLoder(false);
      setupdate(true);
      alert('name Changed');
      resolve();
    }).catch((err)=>{
      setWriting(false);
      setEdit(false);
      setLoder(false);
      alert('only letters and numbers bruv');
      resolve();
    });

  });
};
  return (
    <TouchableOpacity style={[styles.button,highlightStyle]} onPress={()=>{
      TrackPlayer.add(shit);
      TrackPlayer.skip(shit.id);
      TrackPlayer.play();
      setModalVisible(true);
    settrack(shit);
    }}  >
    <View style={styles.item}>
      {load && (
        <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={50} color="black" />
      </View>
      )}

      {writing && (
        <View style={styles.changename,{display:'flex',flexDirection:'row'}} >
        <TextInput value={name} onChangeText={(e)=>{
                setName(e);
        }} style={styles.changename} />
        <TouchableOpacity onPress={()=>{
          setWriting(false);
         Changable();
        }} ><AntDesign name="check" size={25} style={{color: '#808080',marginLeft:'20%'}} /></TouchableOpacity>
      </View>
      )
      }
      {!writing && (
          <Text style={styles.name}>{shit.title}</Text>
      )}

      {edit && (
        <View style={styles.edit} >
          <TouchableOpacity onPress={()=>{
            setLoder(true);
            deletefile(shit).then(()=>{
              setEdit(false);
              setLoder(false);
              setupdate(true);
              alert('file deleted');
            });
          }} ><AntDesign name="delete" size={24} style={{color: '#808080'}} /></TouchableOpacity>
          <TouchableOpacity onPress={()=>{
             setWriting(true);
          }} ><AntDesign name="edit" size={24} style={{color: '#808080'}} /></TouchableOpacity>
        </View>
      )}
       {!edit &&
      <TouchableOpacity style={{marginLeft: '20%'}} onPress={()=>{
        setEdit(true);
      }} >
      <Entypo
        name="dots-three-vertical"
        size={20}
        style={{color: '#808080'}}
      />
    </TouchableOpacity>
      }

    </View>
    </TouchableOpacity>
  );
};

const FilterAudio = (array:any)=>{
  const extentions = ['flac','mp3','wav','wma','aac'];
  return Promise.all(array.filter((x:any)=>{
      return x.name.indexOf('.') !== -1 && extentions.indexOf(x.name.slice(x.name.lastIndexOf('.') + 1)) !== -1 && !x.name.includes('_work_');
  }));
};

export default function Main() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackPlayer.Track | null>(null);
  const [songs,setSongs] = useState([]);
  const [nosongs,setnoSongs] = useState(true);
  const [update,setUpdate] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);




  const onTrackItemPress = async (track: TrackPlayer.Track) => {
    await TrackPlayer.add(track);
    await TrackPlayer.skip(track.id);
    await TrackPlayer.play();
   return  setSelectedTrack(track);
};

const playNextPrev = async (prevOrNext: 'prev' | 'next') => {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (!currentTrackId && prevOrNext === 'prev' ) {
      await TrackPlayer.reset();
      await TrackPlayer.add(songs[0]);
      await TrackPlayer.play();
   return  setSelectedTrack(songs[0]);
    }
    const trkIndex = songs.findIndex((trk: {
      [x: string]: number; id: number;
}) => trk.id === currentTrackId);

    if (prevOrNext === 'next' && trkIndex < songs.length - 1 ) {
      return onTrackItemPress(songs[trkIndex + 1]);
    }
    if (prevOrNext === 'prev' && trkIndex > 0) {
      return onTrackItemPress(songs[trkIndex - 1]);
    }
};


const getMusic = ()=>{
return new Promise((resolve,reject)=>{
  RNFS.readDir(RNFS.DownloadDirectoryPath)
  .then((result) => {
     resolve(FilterAudio(result));
  })
  .catch((err) => {
  reject(err.message);
  });
});
};

const getMusicCache = ()=>{
  return new Promise((resolve,reject)=>{
    RNFS.readDir(RNFS.CachesDirectoryPath)
    .then((result) => {
       resolve(FilterAudio(result));
    })
    .catch((err) => {
    reject(err.message);
    });
  });
  };


useEffect(()=>{
  console.log('yes yes !');
  setUpdate(false);
  setModalVisible(false);
  async function setup(arr: unknown) {
    let isSetup = await setupPlayer();
    const queue = await TrackPlayer.getQueue();

    if (isSetup && queue.length <= 0) {
      await addTracks(arr);
      TrackPlayer.setRepeatMode(RepeatMode.Off);
    }
    setIsPlayerReady(isSetup);
          TrackPlayer.setRepeatMode(RepeatMode.Off);
  }
  getMusic().then((results)=>{
    getMusicCache().then((res)=>{
    orgonizeTracks([...results,...res]).then((x)=>{
      if (x.length > 0){
        setnoSongs(false);
       }
       setup(x);
       setSongs(x);
       
    });
  });
  });
},[update]);

if (nosongs) {
  return (
    <SafeAreaView style={styles.hole}>
      <Header back={undefined} songname={undefined} songs={songs}
            setSelectedTrack={setSelectedTrack}
            setModalVisible={setModalVisible}
            setupdate={setUpdate} />
      <Text style={styles.sorry} >Sorry u dont have any music in this device</Text>
    </SafeAreaView>
  );
}
  return (
    <NoteContext.Provider value={{
      settrack:setSelectedTrack,
      setModalVisible
    }}>
    <View style={styles.hole}>
      <Header setupdate={setUpdate} songs={songs} setSongs={setSongs} back={undefined} songname={undefined} />
        <Divider />

        {modalVisible && <Play upate={update} setupdate={setUpdate} track={selectedTrack} songs={songs} settrack={setSelectedTrack} playNextPrev={playNextPrev} visible={modalVisible} setvisible={()=>setModalVisible} />

      }
      <FlatList
         data={songs}
         keyExtractor={(item) => item.id}
         renderItem={({item}) =>{
          return (
         <Item shit={item} settrack={setSelectedTrack} setModalVisible={setModalVisible} isplaying={selectedTrack && selectedTrack.id === item.id} setupdate={setUpdate} />
          );
        }}
     />
    <SmallPlay track={selectedTrack} setvisible={setModalVisible}  />
    </View>
    </NoteContext.Provider>
  );
}
const styles = StyleSheet.create({
edit:{
  gap:10,
  display:'flex',
  flexDirection:'row',
},
  hole: {
    flex: 1,
    backgroundColor: '#151515',
    color:'white',
  },
  restricted:{
   width:'100%',
   height:'10%',
   backgroundColor:'purple',

  },
  sorry:{
    marginTop:'50%',
textAlign:'center',
color:'#e75480',
fontSize:width(5.5),
  },
  item: {
    display: 'flex',
    paddingRight:'5%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    color:'white',
    height: height(10),
    borderBottomColor:'#0e1111',
    borderBottomWidth:1,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },

  name: {
    width:'65%',
    paddingLeft: width(8),
    fontSize:width(3.5),
    color:'#FBFCD4',
    marginTop:width(1.5),
  },
  photo:{
    height:'80%',
    marginTop:width(2),
    marginLeft:width(1.5),
    borderRadius:width(2.5),
    width:'20%',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  changename:{
    backgroundColor:'transparent',
    width:'75%',
  },
});
