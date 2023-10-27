import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice';

//rnfs

export default function GameScreen() {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>gameMenu</Text>
      <Button mode="contained" onPress={() => { dispatch(toggleIsInGame()) }}>back to main menu</Button>
    </View>
  )
}

const styles = StyleSheet.create({})