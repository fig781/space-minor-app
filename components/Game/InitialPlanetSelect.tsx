import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlanetSelect from './PlanetSelection/PlanetSelect';
import { useSelector } from 'react-redux';
import { getSelectedSolarSystem } from '../../reduxStore/slices/gameSlice';
import { SolarSystem } from '../../utils/types/solarSystem.interface';

const InitialPlanetSelect = () => {
  const selectedSolarSystem: SolarSystem = useSelector(getSelectedSolarSystem);

  return (
    <View>
      <Text style={styles.text}>
        You arrive at the edge of the {selectedSolarSystem.name} solar system.
      </Text>
      <PlanetSelect />
    </View>
  );
};

export default InitialPlanetSelect;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    paddingHorizontal: 10,
    paddingTop: 10
  },
});
