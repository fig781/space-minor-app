import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleOptionsMenu } from '../../reduxStore/slices/gameMenuSlice';
import { getCurrentInGameFuel } from '../../reduxStore/slices/gameSlice';

export default function TopNav() {
  const dispatch = useDispatch();
  const currentFuel = useSelector(getCurrentInGameFuel);

  return (
    // show fuel, money and options icon
    <View style={styles.main}>
      <Text style={styles.text}>Fuel: {currentFuel}</Text>
      <Text style={styles.text}>Hull: 100%</Text>
      <Text style={styles.text}>Money: 1000</Text>
      <Text style={styles.text}>Engine: 100%</Text>
      <Text style={styles.text}>Electronics: 100%</Text>
      <Text style={styles.text}>Life  Support: 100%</Text>
      <Text style={styles.text}>Sanity: 100%</Text>
      <IconButton icon="cog" onPress={() => dispatch(toggleOptionsMenu())} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 5,
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: 'grey'
  },
  text: {
    color: 'white'
  }
})