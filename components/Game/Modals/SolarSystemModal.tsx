import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Modal, Button, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../../reduxStore/slices/pagesStateSlice';
import { toggleSolarSystemMenu } from '../../../reduxStore/slices/gameMenuSlice';
import PlanetSelect from '../PlanetSelection/PlanetSelect';
import AppStyles from '../../../utils/globalStyles';

export default function SolarSystemModal() {
  const dispatch = useDispatch();
  const showSolarSystemMenu = useSelector((state: any) => state.gameMenu.showSolarSystemMenu);

  return (
    <Modal visible={showSolarSystemMenu}
      onDismiss={() => dispatch(toggleSolarSystemMenu())}
      contentContainerStyle={styles.modal}
      style={AppStyles.modalBackgroundColor}>
      <Text style={styles.title}>Navigation</Text>
      <PlanetSelect />
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
  },
  modal: {
    padding: 10,
    margin: 10,
    backgroundColor: '#212529',
  }
});