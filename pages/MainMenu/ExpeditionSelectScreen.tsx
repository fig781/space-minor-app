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
import { changeInGameDread, changeInGameFuel, changeInGameHull, changeInGameEngine, setSelectedSolarSystem, setInGameCargoCapacity, setInGameCurrentCargoAmount } from '../../reduxStore/slices/gameSlice'
import { setSelectedSolarSystemIdInMenu, getSelectedSolarSystemIdInMenu } from '../../reduxStore/slices/mainMenuSlice'
import AppStyles from '../../utils/globalStyles';

export default function ExpeditionSelectScreen() {
  const dispatch = useDispatch();
  const selectedExpeditionInMenuId = useSelector(getSelectedSolarSystemIdInMenu);

  const availableSolarSystems = (_solarSystems: SolarSystem[]) => {
    // logic to hide or disable solar systems based on different factors
    return [_solarSystems[0]];
  }

  React.useEffect(() => {
    dispatch(setSelectedSolarSystem(null))
    dispatch(setSelectedSolarSystemIdInMenu(null))
  }, [])

  const launchExpeditionBtnPress = () => {
    for (let s of solarSystems) {
      if (selectedExpeditionInMenuId === s?.id) {
        dispatch(changeInGameFuel(calculateGameFuel()));
        dispatch(changeInGameHull(calculateGameHull()));
        dispatch(changeInGameEngine(calculateGameEngine()));
        dispatch(changeInGameDread(calculateGameDread()));
        dispatch(setSelectedSolarSystem(s));
        dispatch(setInGameCargoCapacity(calculateCargo()));
        dispatch(toggleIsInGame());
        dispatch(setInGameCurrentCargoAmount(0));
        dispatch(setSelectedSolarSystemIdInMenu(null));
      }
    }
  }

  const calculateCargo = (): number => {
    // use equipment to calcular starting cargo
    return 15;
  }

  const calculateGameFuel = (): number => {
    // use equipment to calcular starting fuel
    return 6
  }

  const calculateGameHull = (): number => {
    // use equipment to calcular starting hull
    return 3
  }

  const calculateGameEngine = (): number => {
    // use equipment to calcular starting Engine
    return 3
  }

  const calculateGameDread = (): number => {
    // use equipment to calcular starting dread
    return 3
  }

  return (
    <ScrollView style={styles.main}>
      <Button style={AppStyles.button} labelStyle={AppStyles.buttonText} mode="contained" onPress={() => launchExpeditionBtnPress()} disabled={selectedExpeditionInMenuId === null}>Launch Expedition</Button>
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

const styles = StyleSheet.create({
  main: {
    padding: 5
  }
})