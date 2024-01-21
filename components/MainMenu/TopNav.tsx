import { StyleSheet, View } from 'react-native';
import { IconButton, Text, Portal } from 'react-native-paper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenuSettingsModal } from '../../reduxStore/slices/mainMenuSlice';
import { getMoney } from '../../reduxStore/slices/gameSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainSettingsModal from './MainSettingsModal';

export default function TopNav() {
  const dispatch = useDispatch();
  const money = useSelector(getMoney);
  return (
    // show fuel, money and options icon
    <SafeAreaView>
      <Portal>
        <MainSettingsModal />
      </Portal>
      <View style={styles.main}>
        <Text style={styles.text}>Credits: {money}</Text>
        <IconButton icon='cog' onPress={() => dispatch(toggleMenuSettingsModal())} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    borderColor: 'grey',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: 'white',
  },
});
