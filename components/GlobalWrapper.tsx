import { StyleSheet } from 'react-native'
import React from 'react'
import MainMenuScreen from '../pages/MainMenu/MainMenuScreen';
import { useDispatch, useSelector } from 'react-redux';
import GameWrapper from './Game/GameWrapper';
import { getIsFirstTimeInApp, getShowIntroPage } from '../reduxStore/slices/pagesStateSlice';
import TitlePage from '../pages/TitlePage';
import IntroPage from '../pages/IntroPage';

export default function GlobalWrapper() {
  const isInGame = useSelector((state: any) => state.pagesState.isInGame);
  const firstTimeInApp = useSelector(getIsFirstTimeInApp);
  const showIntroPage = useSelector(getShowIntroPage);

  const showPage = () => {
    if (firstTimeInApp) {
      return <TitlePage />
    } else if (showIntroPage) {
      return <IntroPage />
    } else if (isInGame) {
      return <GameWrapper />
    } else {
      return <MainMenuScreen />
    }
  }
  return (
    <>
      {showPage()}
    </>
  )
}

const styles = StyleSheet.create({})