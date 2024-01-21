import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import AppStyles from '../utils/globalStyles';
import {
  toggleFirstTimeInApp,
  toggleShowIntroPage,
} from '../reduxStore/slices/pagesStateSlice';
import { useDispatch } from 'react-redux';

const TitlePage = () => {
  const dispatch = useDispatch();

  const onNewGamePress = () => {
    dispatch(toggleFirstTimeInApp());
    dispatch(toggleShowIntroPage());
  };

  return (
    <View style={styles.main}>
      <View style={styles.middle}>
        <Text style={styles.title}>Into the Stary Night</Text>
        <Button
          style={AppStyles.button}
          labelStyle={AppStyles.buttonText}
          mode='contained'
          onPress={() => onNewGamePress()}>
          New Game
        </Button>
        {/* <Button
          style={AppStyles.button}
          labelStyle={AppStyles.buttonText}
          mode='contained'>
          Settings
        </Button> */}
      </View>
      <Text style={styles.version}>Version: 0.01</Text>
    </View>
  );
};

export default TitlePage;

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
  },
  version: {
    textAlign: 'right',
    color: 'white',
    position: 'absolute',
    bottom: 11,
    right: 11,
  },
});
