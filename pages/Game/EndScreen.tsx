import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Portal, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice';
import { toggleEndScreen } from '../../reduxStore/slices/gameMenuSlice';

//rnfs

export default function EndScreen() {
  const dispatch = useDispatch()

  const homeBtnPressed = () => {
    dispatch(toggleIsInGame());
    dispatch(toggleEndScreen());
  }

  return (
    <View style={styles.main}>
      <Text>end screen</Text>
      <Button mode="contained" onPress={() => homeBtnPressed()}>Back to Home</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%"
  }
})