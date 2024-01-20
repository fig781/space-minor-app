import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedPlanetIdInMenu, getSelectedSolarSystem, setCurrentScenario, setSelectedPlanet, setSelectedPlanetIdInMenu } from '../../../reduxStore/slices/gameSlice'
import { List, Button } from 'react-native-paper';
import { Planet } from '../../../utils/types/planet.interface';
import PlanetInfo from './PlanetInfo';
import { generateScenario } from '../../../utils/functions';
import { getShowSolarSystemMenu, toggleSolarSystemMenu } from '../../../reduxStore/slices/gameMenuSlice';
import AppStyles from '../../../utils/globalStyles';

export default function PlanetSelect() {
  const dispatch = useDispatch();
  const selectedSolarSystem = useSelector(getSelectedSolarSystem);
  const selectedPlanetIdInMenu = useSelector(getSelectedPlanetIdInMenu);
  const showSolarSystemMenu = useSelector(getShowSolarSystemMenu);

  const availablePlanets = (planets: Planet[]) => {
    // logic to hide or disable solar systems based on different factors
    return planets;
  }

  React.useEffect(() => {
    dispatch(setSelectedPlanetIdInMenu(null))
  }, [])

  const planetSelectBtnPress = () => {
    for (let p of selectedSolarSystem.planets) {
      if (selectedPlanetIdInMenu === p?.id) {
        dispatch(setSelectedPlanet(p));
        if (showSolarSystemMenu) {
          dispatch(toggleSolarSystemMenu());
        }

        // Trigger the scenario handler to do a Travel scenario
        const selectedScenario = generateScenario('traveling');
        dispatch(setCurrentScenario(selectedScenario));
        return;
      }
    }
  }

  return (
    <ScrollView style={styles.topMarg}>
      <Button style={AppStyles.button} labelStyle={AppStyles.buttonText} mode="contained" onPress={() => planetSelectBtnPress()} disabled={selectedPlanetIdInMenu === null}>Travel</Button>
      <View style={styles.topMarg}></View>
      {
        availablePlanets(selectedSolarSystem.planets).map((p: Planet) => {
          return (
            <PlanetInfo planet={p} key={p.id} />
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  topMarg: {
    marginTop: 20,
  }
})