import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Portal } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice';
import TopNav from '../../components/Game/TopNav';
import BottomNav from '../../components/Game/BottomNav';
import OptionModal from '../../components/Game/Modals/OptionModal';
import SolarSystemModal from '../../components/Game/Modals/SolarSystemModal';
import PlanetSelect from '../../components/Game/PlanetSelection/PlanetSelect';
//rnfs

export default function GameScreen() {

  return (
    <View style={styles.main}>
      <Portal>
        <OptionModal />
        <SolarSystemModal />
      </Portal>
      <TopNav />
      <PlanetSelect />
      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%"
  }
})