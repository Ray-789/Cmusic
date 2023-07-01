/* eslint-disable prettier/prettier */
import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
const MusicRoute = () => <Text style={styles.bottom}>Music</Text>;
const AlbumsRoute = () => <Text>Albums</Text>;
export const Bottom = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Music', icon: 'queue-music'},
    {key: 'albums', title: 'Albums', icon: 'album'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'red',
    height: '1000%',
  },
  search: {
    backgroundColor: 'transparent',
    width: '75%',
  },
});
