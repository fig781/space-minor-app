import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice'
import solarSystems from '../../utils/data/solarSystems';
import InfoExpand from '../../components/MainMenu/ExpeditionScreen/SolarSystemInfo'
import { SolarSystem } from '../../utils/types/solarSystem.interface'
import SolarSystemInfo from '../../components/MainMenu/ExpeditionScreen/SolarSystemInfo'
import { ScrollView } from 'react-native'
import { increaseInGameCurrentFuel, setSelectedSolarSystem } from '../../reduxStore/slices/gameSlice'
import { setSelectedSolarSystemIdInMenu, getSelectedSolarSystemIdInMenu } from '../../reduxStore/slices/mainMenuSlice'

export default function ExpeditionSelectScreen() {
  const dispatch = useDispatch();
  const selectedExpeditionInMenuId = useSelector(getSelectedSolarSystemIdInMenu);

  const availableSolarSystems = (_solarSystems: SolarSystem[]) => {
    // logic to hide or disable solar systems based on different factors
    return _solarSystems;
  }

  React.useEffect(() => {
    dispatch(setSelectedSolarSystem(null))
    dispatch(setSelectedSolarSystemIdInMenu(null))
  }, [])

  const launchExpeditionBtnPress = () => {
    for (let s of solarSystems) {
      if (selectedExpeditionInMenuId === s?.id) {
        dispatch(increaseInGameCurrentFuel(calculateGameFuel()));
        dispatch(setSelectedSolarSystem(s));
        dispatch(toggleIsInGame());
      }
    }
  }

  const calculateGameFuel = (): number => {
    // use equipment to calcular starting fuel
    return 5
  }

  return (
    <ScrollView>
      <Text>ExpeditionSelectScreen</Text>
      <Button mode="contained" onPress={() => launchExpeditionBtnPress()} disabled={selectedExpeditionInMenuId === null}>New Expedition</Button>
      {
        availableSolarSystems(solarSystems).map((s: SolarSystem) => {
          return (
            <SolarSystemInfo solarSystem={s} key={s.id} />
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({})