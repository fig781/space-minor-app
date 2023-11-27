import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleOptionsMenu } from '../../reduxStore/slices/gameMenuSlice';
import { getInGameDread, getInGameEngine, getInGameFuel, getInGameHull, getMoney } from '../../reduxStore/slices/gameSlice';

export default function TopNav() {
  const dispatch = useDispatch();
  const currentFuel = useSelector(getInGameFuel);
  const currentHull = useSelector(getInGameHull);
  const currentEngine = useSelector(getInGameEngine);
  const currentDread = useSelector(getInGameDread);
  const currentMoney = useSelector(getMoney);

  return (
    // show fuel, money and options icon
    <View style={styles.main}>
      <Text style={styles.text}>Fuel: {currentFuel}</Text>
      <Text style={styles.text}>Hull: {currentHull}</Text>
      <Text style={styles.text}>Engine: {currentEngine}</Text>
      <Text style={styles.text}>Composure: {currentDread}</Text>
      <Text style={styles.text}>Money: {currentMoney}</Text>
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