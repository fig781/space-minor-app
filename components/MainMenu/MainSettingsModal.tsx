import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Modal, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  getShowMenuSettingsModal,
  toggleMenuSettingsModal,
} from '../../reduxStore/slices/mainMenuSlice';
import { resetAllData as resetMenu } from '../../reduxStore/slices/mainMenuSlice';
import { resetAllData as resetGameData } from '../../reduxStore/slices/gameSlice';
import { resetAllData as resetPages } from '../../reduxStore/slices/pagesStateSlice';
import AppStyles from '../../utils/globalStyles';
const MainSettingsModal = () => {
  const show = useSelector(getShowMenuSettingsModal);
  const dispatch = useDispatch();

  const resetGame = () => {
    dispatch(resetMenu());
    dispatch(resetGameData());
    dispatch(resetPages());
  };

  return (
    <Modal
      contentContainerStyle={styles.main}
      visible={show}
      onDismiss={() => dispatch(toggleMenuSettingsModal())}>
      <Text style={styles.title}>Settings</Text>
      <Button
        style={AppStyles.button}
        buttonColor={'#c81d25'}
        textColor={'white'}
        labelStyle={AppStyles.buttonText}
        mode='contained'
        onPress={() => resetGame()}>
        Reset All Data
      </Button>
    </Modal>
  );
};

export default MainSettingsModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#212529',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 20,
  },
});
