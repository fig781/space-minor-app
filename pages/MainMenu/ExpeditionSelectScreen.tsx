import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'

export default function ExpeditionSelectScreen() {
  return (
    <View>
      <Text>ExpeditionSelectScreen</Text>
      <Button mode="contained" onPress={() => { }}>New Expedition</Button>
      {/* select a solar system from the list, then press btn */}
    </View>
  )
}

const styles = StyleSheet.create({})