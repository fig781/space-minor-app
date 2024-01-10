import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleOptionsMenu } from '../../reduxStore/slices/gameMenuSlice';
import { getMoney } from '../../reduxStore/slices/gameSlice';

export default function TopNav() {
  const dispatch = useDispatch();
  const money = useSelector(getMoney);
  return (
    // show fuel, money and options icon
    <View style={styles.main}>
      <Text style={styles.text}>Fuel: 1</Text>
      <Text style={styles.text}>Hull: 1</Text>
      <Text style={styles.text}>Money: {money}</Text>
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