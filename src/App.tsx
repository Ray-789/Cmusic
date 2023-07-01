/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Divider, Provider as PaperProvider} from 'react-native-paper';
import Main from './components/Main';
import {darktheme, lighttheme} from'./utils/theme.ts';
import {useColorScheme,PermissionsAndroid} from 'react-native';
import {Play} from './components/Play';
const App=()=>{
  const colorScheme = useColorScheme();
  useEffect(() => {
    const requestReadPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'musica wants to read  audio files',
            message:
              'Cool Photo App needs access to your files systeme ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'nope',
            buttonPositive: 'k',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can read files ');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    const requestWritePermission = async () => {
      try {
        const granted =await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'musica wants to write audio files',
            message:
              'Cool Photo App needs access to your files systeme ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'nope',
            buttonPositive: 'k',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can write files');
        } else {
          console.log('cant write');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestWritePermission()
    requestReadPermission()
    
  }, []);
  const theme = colorScheme === 'light' ? darktheme : lighttheme;
  return (
    <SafeAreaProvider style={styles.container}>
      <PaperProvider theme={theme}>
        
         <Main /> 
        {/* <Play/>  */}
      </PaperProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:" #FFDD03"
  },
});

export default App;
