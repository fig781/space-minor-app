import { StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { Planet } from '../../../utils/types/planet.interface';
import { Text, Icon } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedPlanetIdInMenu,
  getSelectedPlanetIdInMenu,
  getVisitedPlanetsIDs,
  getSelectedPlanet
} from '../../../reduxStore/slices/gameSlice';

interface Props {
  planet: Planet;
}

const PlanetInfo: React.FC<Props> = ({ planet }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const selectedPlanetIdInMenu = useSelector(getSelectedPlanetIdInMenu);
  const visitedPlanetIDs = useSelector(getVisitedPlanetsIDs);
  const isVisited = visitedPlanetIDs.includes(planet.id);
  const currentPlanet = useSelector(getSelectedPlanet);

  const handlePress = () => {
    setExpanded(!expanded);
    dispatch(setSelectedPlanetIdInMenu(planet?.id));
  };

  const isSelectedStyles = () => {
    if (planet.id === selectedPlanetIdInMenu) {
      return styles.selected;
    }
  };

  const unVisitedPlanetContent = (planet: any) => {
    return (
      <Pressable disabled={currentPlanet?.id === planet.id} onPress={() => handlePress()} key={planet.id} style={[styles.main, isSelectedStyles()]}>
        <Icon size={48} source={"help-circle-outline"} />
        <Text style={[styles.name, { marginLeft: 15 }]}>???</Text>
      </Pressable>
    )
  }

  const visitedPlanetContent = (planet: any) => {
    return (
      <Pressable disabled={currentPlanet?.id === planet.id} onPress={() => handlePress()} key={planet.id} style={[styles.main, isSelectedStyles()]}>
        <Image style={styles.img} source={planet.icon} />
        <Text style={styles.name}>{planet.name}</Text>
      </Pressable>
    )
  }

  return (
    isVisited ? visitedPlanetContent(planet) : unVisitedPlanetContent(planet)
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#00000000',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  selected: {
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  name: {
    fontSize: 20,
  },
  img: {
    marginRight: 15,
  },
});

export default PlanetInfo;
