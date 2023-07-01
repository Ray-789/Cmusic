import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {height, width} from '../utils';
import RNFS from 'react-native-fs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import TrackPlayer from 'react-native-track-player';
import {ChangeName, deletefile} from './getfile';
import {NoteContext} from './Main';

const Item = ({shit, settrack, setModalVisible, isplaying, setupdate}) => {
  const contextValue = useContext(NoteContext);
  const [edit, setEdit] = useState(false);
  const [writing, setWriting] = useState(false);
  const [name, setName] = useState('');
  const [load, setLoder] = useState(false);
  let highlightStyle = {};
  if (isplaying) {
    highlightStyle = {backgroundColor: '#e75480'};
  }
  const Changable = () => {
    return new Promise((resolve, reject) => {
      if (name === '') {
        alert('bruv type something');
        resolve();
      }
      setLoder(true);
      ChangeName(shit, name)
        .then(() => {
          setWriting(false);
          setEdit(false);
          setLoder(false);
          setupdate(true);
          alert('name Changed');
          resolve();
        })
        .catch(err => {
          setWriting(false);
          setEdit(false);
          setLoder(false);
          alert('only letters and numbers bruv');
          resolve();
        });
    });
  };
  return (
    <TouchableOpacity
      style={[styles.button, highlightStyle]}
      onPress={() => {
        TrackPlayer.add(shit);
        TrackPlayer.skip(shit.id);
        TrackPlayer.play();
        contextValue.settrack(shit);
        contextValue.setModalVisible(true);
      }}>
      <View style={styles.item}>
        {load && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={50} color="black" />
          </View>
        )}

        {writing && (
          <View
            style={
              (styles.changename, {display: 'flex', flexDirection: 'row'})
            }>
            <TextInput
              value={name}
              onChangeText={e => {
                setName(e);
              }}
              style={styles.changename}
            />
            <TouchableOpacity
              onPress={() => {
                setWriting(false);
                Changable();
              }}>
              <AntDesign
                name="check"
                size={25}
                style={{color: '#808080', marginLeft: '20%'}}
              />
            </TouchableOpacity>
          </View>
        )}
        {!writing && <Text style={styles.name}>{shit.title}</Text>}

        {edit && (
          <View style={styles.edit}>
            <TouchableOpacity
              onPress={() => {
                setLoder(true);
                deletefile(shit).then(() => {
                  setEdit(false);
                  setLoder(false);
                  setupdate(true);
                  alert('file deleted');
                });
              }}>
              <AntDesign name="delete" size={24} style={{color: '#808080'}} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setWriting(true);
              }}>
              <AntDesign name="edit" size={24} style={{color: '#808080'}} />
            </TouchableOpacity>
          </View>
        )}
        {!edit && (
          <TouchableOpacity
            style={{marginLeft: '20%'}}
            onPress={() => {
              setEdit(true);
            }}>
            <Entypo
              name="dots-three-vertical"
              size={20}
              style={{color: '#808080'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function SearchList({
  search,
  songs,
  setSelectedTrack,
  searchvalue,
  setSearchvalue,
  setModalVisible,
  setUpdate,
}: any) {
  return (
    <View style={styles.hole}>
      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Item
              searchvalue={searchvalue}
              setSearchvalue={setSearchvalue}
              shit={item}
              settrack={setSelectedTrack}
              setModalVisible={setModalVisible}
              setupdate={setUpdate}
            />
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  edit: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  hole: {
    flex: 1,
    backgroundColor: '#151515',
    width: '100%',

    height: 0,
    color: 'white',
  },
  restricted: {
    width: '100%',
    height: '10%',
    backgroundColor: 'purple',
  },
  sorry: {
    marginTop: '50%',
    textAlign: 'center',
    color: '#e75480',
    fontSize: width(5.5),
  },
  item: {
    display: 'flex',
    paddingRight: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    height: height(10),
    borderBottomColor: '#0e1111',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112',
  },

  name: {
    width: '65%',
    paddingLeft: width(8),
    fontSize: width(3.5),
    color: '#FBFCD4',
    marginTop: width(1.5),
  },
  photo: {
    height: '80%',
    marginTop: width(2),
    marginLeft: width(1.5),
    borderRadius: width(2.5),
    width: '20%',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  changename: {
    backgroundColor: 'transparent',
    width: '75%',
  },
});
