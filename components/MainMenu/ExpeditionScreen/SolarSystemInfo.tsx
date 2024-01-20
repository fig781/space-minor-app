import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { IconButton, List, Text } from 'react-native-paper'
import { SolarSystem } from '../../../utils/types/solarSystem.interface'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSolarSystemIdInMenu, getSelectedSolarSystemIdInMenu } from '../../../reduxStore/slices/mainMenuSlice'
// rnfes

interface Props {
  solarSystem: SolarSystem,
}

const SolarSystemInfo: React.FC<Props> = ({ solarSystem }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const selectedExpeditionInMenuId = useSelector(getSelectedSolarSystemIdInMenu);
  const planets = solarSystem.planets;

  const handlePress = () => {
    setExpanded(!expanded);
    dispatch(setSelectedSolarSystemIdInMenu(solarSystem?.id));
  }

  const isSelectedStyles = () => {
    if (solarSystem.id === selectedExpeditionInMenuId) {
      return styles.selected;
    }
  }

  const planetsListDisplay = () => {
    return planets.map(planet => {
      return (
        <View key={planet.id} style={styles.planet}>
          <Image source={planet.icon} />
          <Text>{planet.name}</Text>
        </View>
      )
    })
  }

  return (
    <List.Accordion
      title={solarSystem.name}
      expanded={expanded}
      onPress={handlePress}
      titleStyle={styles.title}
      style={[styles.main, isSelectedStyles()]}>

      {planetsListDisplay()}
    </List.Accordion>
  )
}

export default SolarSystemInfo;

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#0000000',
  },
  title: {
    fontSize: 20,
  },
  selected: {
    borderColor: 'grey',
  },
  planet: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
})