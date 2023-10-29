import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import EndScreen from '../../pages/Game/EndScreen';
import GameScreen from '../../pages/Game/GameScreen';

export default function GameWrapper() {
  const showEndScreen = useSelector((state: any) => state.gameMenu.showEndScreen);

  const renderScreens = () => {
    if (false) {
      //  initial screen here
    } else if (showEndScreen) {
      return <EndScreen />
    } else {
      return <GameScreen />
    }

  }

  return (
    renderScreens()
  )
}

const styles = StyleSheet.create({})