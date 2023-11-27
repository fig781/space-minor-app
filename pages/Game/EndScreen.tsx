import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Portal, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice';
import { toggleEndScreen } from '../../reduxStore/slices/gameMenuSlice';
import { changeMoney, getCurrentInGameInventory, getInGameDread, getInGameEngine, getInGameFuel, getInGameHull, resetGameEndgameStates } from '../../reduxStore/slices/gameSlice';
import { resetGameMenuStates } from '../../reduxStore/slices/gameMenuSlice';
import { addToMainInventory } from '../../reduxStore/slices/mainMenuSlice';
//rnfs

export default function EndScreen() {
  const dispatch = useDispatch();
  const inGameInventory = useSelector(getCurrentInGameInventory);
  const currentFuel = useSelector(getInGameFuel);
  const currentHull = useSelector(getInGameHull);
  const currentEngine = useSelector(getInGameEngine);
  const currentDread = useSelector(getInGameDread);

  const homeBtnPressed = () => {
    dispatch(addToMainInventory(inGameInventory))
    dispatch(toggleIsInGame());
    dispatch(resetGameMenuStates());
    dispatch(resetGameEndgameStates());
  }

  React.useEffect(() => {
    if (currentFuel === 0 || currentHull === 0 || currentEngine === 0 || currentDread === 0) {
      dispatch(changeMoney(-100));
    }
  }, [])

  const endGameConditionDesc = (): string => {
    if (currentFuel === 0) {
      return 'You ran out of fuel. You lose money'
    } else if (currentHull === 0) {
      return 'You ran out of hull. You lose money'
    } else if (currentEngine === 0) {
      return 'Your engine is broken beyond repair. You lose money'
    } else if (currentDread === 0) {
      return 'You lose your mind. You lose money'
    } else {
      return 'You leave without any issues.'
    }
  }

  return (
    <View style={styles.main}>
      <Text>{endGameConditionDesc()}</Text>
      <Button mode="contained" onPress={() => homeBtnPressed()}>Back to Home</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%"
  }
})