import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleOptionsMenu } from '../../reduxStore/slices/gameMenuSlice';
import { getInGameDread, getInGameEngine, getInGameFuel, getInGameHull, getMoney, getInGameCargoCapacity, getInGameCurrentCargoAmount } from '../../reduxStore/slices/gameSlice';

export default function TopNav() {
  const dispatch = useDispatch();
  const currentFuel = useSelector(getInGameFuel);
  const currentHull = useSelector(getInGameHull);
  const currentEngine = useSelector(getInGameEngine);
  const currentDread = useSelector(getInGameDread);
  const currentMoney = useSelector(getMoney);
  const currentCargoCap = useSelector(getInGameCargoCapacity);
  const currentCargoAmount = useSelector(getInGameCurrentCargoAmount);

  function showRedText(value: number) {
    if (value <= 1) {
      return styles.redtext;
    }
  }

  return (
    <View style={styles.main}>
      <View>
        <Text style={[styles.text, styles.topText]}>Fuel: <Text style={showRedText(currentFuel)}>{currentFuel}</Text></Text>
        <Text style={styles.text}>Hull: <Text style={showRedText(currentHull)}>{currentHull}</Text></Text>
      </View>
      <View>
        <Text style={[styles.text, styles.topText]}>Engine: <Text style={showRedText(currentEngine)}>{currentEngine}</Text></Text>
        <Text style={styles.text}>Composure: <Text style={showRedText(currentDread)}>{currentDread}</Text></Text>
      </View>
      <View>
        <Text style={[styles.text, styles.topText]}>Credits: {currentMoney}</Text>
        {/* <Text style={styles.text}>Cargo: {currentCargoAmount}m³ / {currentCargoCap}m³</Text> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    display: 'flex',
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'grey',
    borderWidth: 2
  },
  text: {
    color: 'white',
  },
  topText: {
    paddingBottom: 3
  },
  redtext: {
    color: 'red'
  }
})