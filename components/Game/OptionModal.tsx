import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal, Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice';
import { toggleEndScreen, toggleOptionsMenu } from '../../reduxStore/slices/gameMenuSlice';

export default function OptionModal() {
  const dispatch = useDispatch();
  const showOptionsMenu = useSelector((state: any) => state.gameMenu.showOptionsMenu);

  const endGamePressed = () => {
    dispatch(toggleEndScreen());
    dispatch(toggleOptionsMenu());
  }

  return (
    <Modal visible={showOptionsMenu} onDismiss={() => dispatch(toggleOptionsMenu())}>
      <Button mode="contained" onPress={() => endGamePressed()}>Leave Expedition Early</Button>
    </Modal>
  )
}

const styles = StyleSheet.create({});