import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Modal, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { toggleIsInGame } from '../../../reduxStore/slices/pagesStateSlice';
import {
  toggleEndScreen,
  toggleOptionsMenu,
} from '../../../reduxStore/slices/gameMenuSlice';
import AppStyles from '../../../utils/globalStyles';

export default function OptionModal() {
  const dispatch = useDispatch();
  const showOptionsMenu = useSelector(
    (state: any) => state.gameMenu.showOptionsMenu
  );

  // const endGamePressed = () => {
  //   dispatch(toggleEndScreen());
  //   dispatch(toggleOptionsMenu());
  // };

  return (
    <Modal visible={showOptionsMenu} onDismiss={() => dispatch(toggleOptionsMenu())} contentContainerStyle={styles.modal} style={AppStyles.modalBackgroundColor}>
      <Text style={styles.title}>Options</Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 20,
  },
  modal: {
    padding: 10,
    margin: 10,
    backgroundColor: '#212529',
  }
});
