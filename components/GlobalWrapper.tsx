import { StyleSheet } from 'react-native'
import React from 'react'
import GameScreen from '../pages/Game/GameScreen';
import MainMenuScreen from '../pages/MainMenu/MainMenuScreen';
import { useSelector } from 'react-redux';

export default function GlobalWrapper() {
  const isInGame = useSelector((state: any) => state.pagesState.isInGame);

  return (
    <>
      {isInGame ? <GameScreen /> : <MainMenuScreen />}
    </>
  )
}

const styles = StyleSheet.create({})