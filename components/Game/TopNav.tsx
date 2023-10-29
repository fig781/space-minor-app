import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'

export default function TopNav() {
  return (
    // show fuel, money and options icon
    <View style={styles.main}>
      <Text style={styles.text}>Fuel: 1</Text>
      <Text style={styles.text}>Hull: 1</Text>
      <Text style={styles.text}>Money: 1000</Text>
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