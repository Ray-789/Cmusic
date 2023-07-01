import * as React from 'react';
import {Appbar, TextInput} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {transparent} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import SearchList from './SearchList';

export const Header = ({
  songs,
  setSongs,
  back,
  songname,
  setSelectedTrack,
  setModalVisible,
  setupdate,
}: any) => {
  const [search, setSearch] = React.useState(true);
  const [searchvalue, setSearchvalue] = React.useState('');
  const [filtred, setFiltred] = React.useState([]);
  const searchFilterFunction = (text: any) => {
    return new Promise(async (resolve, reject) => {
      const newsit = songs.filter(x => {
        return (
          x.title.toLowerCase().startsWith(text.toLowerCase()) ||
          x.title.toLowerCase().indexOf(text.toLowerCase()) !== -1 
        );
      });
      setFiltred(newsit);
    });
  };
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  if (back) {
    return (
      <Appbar.Header
        style={{
          borderColor: 'transparent',
        }}>
        <Appbar.BackAction onPress={_goBack} />
        <View />
        <Appbar.Content title={songname} subtitle="Subtitle" />

        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
    );
  } else {
    return (
      <View
        style={{
          width: '100%',
          height: searchvalue !== '' ? '100%' : '14%',
          flexDirection: 'column',
        }}>
        <Appbar.Header>
          <Appbar.Action icon="home" />
          <View />
          <Searchbar
            value={searchvalue}
            traileringIconColor={'red'}
            onClearIconPress={e => {
              setSearch(false);
              setSearchvalue('');
            }}
            showDivider={false}
            onChangeText={e => {
              setSearchvalue(e);
              searchFilterFunction(e);
              setSearch(true);
            }}
            placeholder="Search"
            style={styles.search}
          />

          <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
        {search && (
          <SearchList
            search={search}
            songs={filtred}
            setSelectedTrack={setSelectedTrack}
            setModalVisible={setModalVisible}
            setupdate={setupdate}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#151515',
    color: ' #FFDD03',
  },
  song: {
    alignSelf: 'center',
  },
  search: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    width: '75%',
    border: 'none',
  },
});
