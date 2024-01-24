import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSelectedPlanet,
  setCurrentScenario,
  addToVisitedPlanetIDs,
} from '../../reduxStore/slices/gameSlice';
import { toggleEndScreen, toggleOptionsMenu } from '../../reduxStore/slices/gameMenuSlice';
import { Button, Text, FAB } from 'react-native-paper';
import { Planet as IPlanet } from '../../utils/types/planet.interface';
import { getScenarioById } from '../../utils/functions';
import AppStyles from '../../utils/globalStyles';


interface Props {
  planet: IPlanet;
}

const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

const Planet: React.FC<Props> = ({ planet }) => {
  React.useEffect(() => {
    dispatch(addToVisitedPlanetIDs(planet.id));
  }, []);

  const dispatch = useDispatch();

  const showMineBtn = () => {
    const isPlanet = planet.type === 'solid planet';
    const isAsteroid = planet.type === 'asteroid';
    const isStar = planet.type === 'star';

    return isPlanet || isAsteroid || isStar;
  };

  const mineBtnPress = () => {
    // trigger mine event
    const mineScenario = getScenarioById(2);
    dispatch(setCurrentScenario(mineScenario));
  };

  const showSalvageBtn = () => {
    const isWreck = planet.type === 'wreck';

    return isWreck;
  };

  const salvageBtnPress = () => {
    // trigger salvage event
  };

  const showScanBtn = () => {
    return true;
  };

  const scanBtnPress = () => {
    const scanScenario = getScenarioById(4);
    dispatch(setCurrentScenario(scanScenario));
  };

  const showExploreBtn = () => {
    const isWreck = planet.type === 'wreck';
    const isPlanet = planet.type === 'solid planet';
    const isAsteroid = planet.type === 'asteroid';

    return isWreck || isPlanet || isAsteroid;
  };

  const exploreBtnPress = () => {
    // trigger explore event
  };

  const endGamePressed = () => {
    dispatch(toggleEndScreen());
    dispatch(toggleOptionsMenu());
  };

  // Mine, salvage, scan, explore, special
  return (
    <View style={styles.main}>
      <Text style={styles.title}>{planet.name}</Text>
      <Image style={{ height: 94, width: 94 }} source={planet.icon} />
      {showMineBtn() && (
        <Button
          style={AppStyles.button}
          labelStyle={AppStyles.buttonText}
          onPress={() => mineBtnPress()}
          mode='contained'>
          Mine
        </Button>
      )}
      {/* {
        showSalvageBtn() && <Button onPress={() => salvageBtnPress()} mode="contained">Salvage</Button>
      } */}
      {showScanBtn() && (
        <Button
          style={AppStyles.button}
          labelStyle={AppStyles.buttonText}
          onPress={() => scanBtnPress()}
          mode='contained'>
          Scan
        </Button>
      )}
      {/* <Button style={AppStyles.button} labelStyle={AppStyles.buttonText} mode='contained' onPress={() => endGamePressed()}>
        Conclude Expedition
      </Button> */}
      <FAB
        icon="home"
        style={styles.fab}
        label="Conclude Expedition"
        onPress={() => endGamePressed()}
        variant='surface'
      />
      {/* {
        showExploreBtn() && <Button onPress={() => exploreBtnPress()} mode="contained">Explore</Button>
      } */}
    </View>
  );
};

export default Planet;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    // @ts-ignore
    height: '100%',
    padding: 10,
    paddingBottom: 55,
    lineHeight: 1.2,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    paddingTop: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 135,
    right: 10,
    fontSize: 16
  }
});
