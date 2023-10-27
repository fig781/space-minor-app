import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice'

export default function ExpeditionSelectScreen() {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>ExpeditionSelectScreen</Text>
      <Button mode="contained" onPress={() => { dispatch(toggleIsInGame()) }}>New Expedition</Button>
      {/* select a solar system from the list, then press btn */}
    </View>
  )
}

const styles = StyleSheet.create({})