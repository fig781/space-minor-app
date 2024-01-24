import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedPlanet, getCurrentScenario } from '../../reduxStore/slices/gameSlice';
import { toggleInventoryMenu, toggleOptionsMenu, toggleSolarSystemMenu } from '../../reduxStore/slices/gameMenuSlice';
export default function BottomNav() {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const dispatch = useDispatch();

  const currentPlanet = useSelector(getSelectedPlanet);
  const currentScenario = useSelector(getCurrentScenario);

  const [currentPage, setCurrentPage] = React.useState("InitialPlanetSelect")
  React.useEffect(() => {
    setCurrentPage(pageToshow());
  }, [currentPlanet, currentScenario])

  const pageToshow = () => {
    if (!currentPlanet && !currentScenario) {
      return "InitialPlanetSelect"
    } else if (currentScenario) {
      return "Scenario"
    } else {
      return "Planet"
    }
  }

  return (
    // icons for inventory, missions, solarsystem map, equipment, options
    <Appbar
      style={[
        styles.bottom,
        {
          height: 55 + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      <Appbar.Action disabled={currentPage !== "Planet"} icon="rocket-launch" onPress={() => dispatch(toggleSolarSystemMenu())} />
      <Appbar.Action icon="package-variant-closed" onPress={() => dispatch(toggleInventoryMenu())} />
      {/* <Appbar.Action icon="cog" onPress={() => dispatch(toggleOptionsMenu())} /> */}
    </Appbar>
  )
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
  }
})