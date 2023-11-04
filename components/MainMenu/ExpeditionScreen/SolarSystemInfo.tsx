import { StyleSheet, View } from 'react-native'
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

  const handlePress = () => {
    setExpanded(!expanded);
    dispatch(setSelectedSolarSystemIdInMenu(solarSystem?.id));
  }

  const isSelectedStyles = () => {
    if (solarSystem.id === selectedExpeditionInMenuId) {
      return styles.selected;
    }
  }

  return (
    <List.Accordion
      title={solarSystem.name}
      expanded={expanded}
      onPress={handlePress}
      style={[styles.main, isSelectedStyles()]}>
      <Text style={{ color: 'white' }}>test123</Text>
      <List.Item title="First item" />
      <List.Item title="Second item" />
    </List.Accordion>
  )
}

export default SolarSystemInfo;

const styles = StyleSheet.create({
  main: {

  },
  selected: {
    borderColor: 'blue',
    borderWidth: 1,
    borderStyle: 'solid'
  }
})