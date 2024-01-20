import { StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Planet } from '../../../utils/types/planet.interface'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPlanetIdInMenu, getSelectedPlanetIdInMenu } from '../../../reduxStore/slices/gameSlice';

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
    <Pressable style={[styles.main, isSelectedStyles()]} onPress={() => handlePress()}>
      <Image style={styles.img} source={planet.icon} />
      <Text style={styles.name}>{planet.name}</Text>
    </Pressable>
    // <List.Accordion
    //   title={planet.name}
    //   expanded={expanded}
    //   onPress={handlePress}
    //   }
    // >
    //   <Text style={{ color: 'white' }}>test123</Text>
    //   <List.Item title="First item" />
    //   <List.Item title="Second item" />
    // </List.Accordion>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
    borderColor: '#00000000',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  selected: {
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  name: {
    fontSize: 20,
  },
  img: {
    marginRight: 15
  }
});

export default PlanetInfo;