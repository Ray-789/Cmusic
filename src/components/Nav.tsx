import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { width } from '../utils';
export default function Nav({songName}:any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="down" size={30} />
      </TouchableOpacity>
      <Text style={styles.song}>gyusdfkbjlsfd.ldf</Text>
      <TouchableOpacity>
        <Icon name="staro" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '10%',
    backgroundColor: 'yellow',
  },
  song: {
    fontSize: width(4.5),
    textAlign: 'center',
    width: '70%',
  },
});
