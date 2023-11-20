import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Portal } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice';
import { getCurrentScenario, getSelectedPlanet } from '../../reduxStore/slices/gameSlice';
import TopNav from '../../components/Game/TopNav';
import BottomNav from '../../components/Game/BottomNav';
import OptionModal from '../../components/Game/Modals/OptionModal';
import SolarSystemModal from '../../components/Game/Modals/SolarSystemModal';
import PlanetSelect from '../../components/Game/PlanetSelection/PlanetSelect';
import Planet from '../../components/Game/Planet';
import Scenario from '../../components/Game/Scenario';
import InGameInventoryModal from '../../components/Game/Modals/InGameInventoryModal';

export default function GameScreen() {
  const currentPlanet = useSelector(getSelectedPlanet);
  const currentScenario = useSelector(getCurrentScenario);

  const pageToshow = () => {
    if (!currentPlanet && !currentScenario) {
      return <PlanetSelect />
    } else if (currentScenario) {
      return <Scenario scenario={currentScenario} />
    } else {
      return <Planet planet={currentPlanet} />
    }
  }

  return (
    <View style={styles.main}>
      <Portal>
        <OptionModal />
        <SolarSystemModal />
        <InGameInventoryModal />
      </Portal>
      <TopNav />
      {pageToshow()}
      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%"
  }
})