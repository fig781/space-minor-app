import { StyleSheet, View, Image, Pressable } from 'react-native'
import React from 'react'
import { IconButton, List, Text, Icon } from 'react-native-paper'
import { SolarSystem } from '../../../utils/types/solarSystem.interface'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSolarSystemIdInMenu, getSelectedSolarSystemIdInMenu } from '../../../reduxStore/slices/mainMenuSlice'
import { getMoney, getVisitedPlanetsIDs } from '../../../reduxStore/slices/gameSlice'


interface Props {
  solarSystem: SolarSystem,
}

const SolarSystemInfo: React.FC<Props> = ({ solarSystem }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const selectedExpeditionInMenuId = useSelector(getSelectedSolarSystemIdInMenu);
  const planets = solarSystem.planets;
  const visitedPlanetIDs = useSelector(getVisitedPlanetsIDs);
  const currentMoney = useSelector(getMoney);

  const handlePress = () => {
    dispatch(setSelectedSolarSystemIdInMenu(solarSystem?.id));
  }

  const handleExpand = () => {
    setExpanded(!expanded);
  }

  const isSelectedStyles = () => {
    if (solarSystem.id === selectedExpeditionInMenuId) {
      return styles.selected;
    }
  }

  const unVisitedPlanetContent = (planet: any) => {
    return (
      <View key={planet.id} style={styles.planet}>
        <Icon size={32} source={"help-circle-outline"} />
        <Text>???</Text>
      </View>
    )
  }

  const visitedPlanetContent = (planet: any) => {
    return (
      <View key={planet.id} style={styles.planet}>
        <Image style={{ height: 32, width: 32 }} source={planet.icon} />
        <Text>{planet.name}</Text>
      </View>
    )
  }

  const planetsListDisplay = () => {
    return planets.map(planet => {
      const isVisited = visitedPlanetIDs.includes(planet.id);
      return (
        isVisited ? visitedPlanetContent(planet) : unVisitedPlanetContent(planet)
      )
    })
  }

  return (
    <View style={styles.main}>
      <View style={[styles.header, isSelectedStyles()]}>
        <Pressable disabled={currentMoney < solarSystem.cost} onPress={() => handlePress()} style={styles.headerLeft}>
          <Text style={styles.title}>{solarSystem.name}</Text>
          <Text style={styles.cost}>${solarSystem.cost}</Text>
        </Pressable>
        <Pressable onPress={() => handleExpand()} style={styles.headerRight}>
          <Icon
            source={expanded ? "chevron-up" : "chevron-down"}
            color={'white'}
            size={30}
          />
        </Pressable>
      </View>

      {expanded && planetsListDisplay()}
    </View>
  )
}

export default SolarSystemInfo;

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
  },
  header: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#0000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    padding: 20,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
  },
  cost: {
    paddingLeft: 20,
  },
  selected: {
    borderColor: 'grey',
  },
  planet: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  planetUnknown: {

  }
})