import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedSolarSystem, setSelectedPlanet, setSelectedPlanetIdInMenu } from '../../../reduxStore/slices/gameSlice'
import { List, Button } from 'react-native-paper';
import { Planet } from '../../../utils/types/planet.interface';
import PlanetInfo from './PlanetInfo';

export default function PlanetSelect() {
  const dispatch = useDispatch();
  const selectedSolarSystem = useSelector(getSelectedSolarSystem);

  const availablePlanets = (planets: Planet[]) => {
    // logic to hide or disable solar systems based on different factors
    return planets;
  }

  React.useEffect(() => {
    dispatch(setSelectedPlanetIdInMenu(null))
  }, [])

  const planetSelectBtnPress = () => {
    for (let p of selectedSolarSystem.planets) {
      if (setSelectedPlanetIdInMenu === p?.id) {
        dispatch(setSelectedPlanet(p));

      }
    }
  }

  return (
    <ScrollView>
      <Text>Planet Selection</Text>
      <Button mode="contained" onPress={() => planetSelectBtnPress()} disabled={setSelectedPlanetIdInMenu === null}>Travel to Planet</Button>
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

const styles = StyleSheet.create({})