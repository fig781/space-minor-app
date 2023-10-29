import { StyleSheet } from 'react-native'
import React from 'react'
import MainMenuScreen from '../pages/MainMenu/MainMenuScreen';
import { useSelector } from 'react-redux';
import GameWrapper from './Game/GameWrapper';

export default function GlobalWrapper() {
  const isInGame = useSelector((state: any) => state.pagesState.isInGame);

  return (
    <>
      {isInGame ? <GameWrapper /> : <MainMenuScreen />}
    </>
  )
}

const styles = StyleSheet.create({})