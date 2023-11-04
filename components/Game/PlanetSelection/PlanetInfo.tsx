import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Planet } from '../../../utils/types/planet.interface'
import { List } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPlanetIdInMenu, getSelectedPlanetIdInMenu } from '../../../reduxStore/slices/gameSlice'

interface Props {
  planet: Planet
}

const PlanetInfo: React.FC<Props> = ({ planet }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const selectedPlanetIdInMenu = useSelector(getSelectedPlanetIdInMenu);

  const handlePress = () => {
    setExpanded(!expanded);
    dispatch(setSelectedPlanetIdInMenu(planet?.id));
  }

  const isSelectedStyles = () => {
    if (planet.id === selectedPlanetIdInMenu) {
      return styles.selected;
    }
  }

  return (
    <List.Accordion
      title={planet.name}
      expanded={expanded}
      onPress={handlePress}
      style={[styles.main, isSelectedStyles()]}
    >
      <Text style={{ color: 'white' }}>test123</Text>
      <List.Item title="First item" />
      <List.Item title="Second item" />
    </List.Accordion>
  )
}

const styles = StyleSheet.create({
  main: {

  },
  selected: {
    borderColor: 'blue',
    borderWidth: 1,
    borderStyle: 'solid'
  }
});

export default PlanetInfo;