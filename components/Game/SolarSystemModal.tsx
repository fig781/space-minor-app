import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Modal, Button, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice';
import { toggleSolarSystemMenu } from '../../reduxStore/slices/gameMenuSlice';

export default function SolarSystemModal() {
  const dispatch = useDispatch();
  const showSolarSystemMenu = useSelector((state: any) => state.gameMenu.showSolarSystemMenu);

  return (
    <Modal visible={showSolarSystemMenu}
      onDismiss={() => dispatch(toggleSolarSystemMenu())}
      contentContainerStyle={styles.modal}>
      <Text>solar system modal</Text>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'grey',
    padding: 10
  }
});