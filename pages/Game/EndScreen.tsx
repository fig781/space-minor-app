import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { Button, Portal, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { toggleIsInGame } from '../../reduxStore/slices/pagesStateSlice';
import { toggleEndScreen } from '../../reduxStore/slices/gameMenuSlice';
import {
  changeMoney,
  getCurrentInGameInventory,
  getInGameDread,
  getInGameEngine,
  getInGameFuel,
  getInGameHull,
  resetGameEndgameStates,
} from '../../reduxStore/slices/gameSlice';
import { resetGameMenuStates } from '../../reduxStore/slices/gameMenuSlice';
import { addToMainInventory } from '../../reduxStore/slices/mainMenuSlice';
import AppStyles from '../../utils/globalStyles';
import { InventoryItem } from '../../utils/types/inventoryItem.interface';

export default function EndScreen() {
  const dispatch = useDispatch();
  const inGameInventory = useSelector(getCurrentInGameInventory);
  const currentFuel = useSelector(getInGameFuel);
  const currentHull = useSelector(getInGameHull);
  const currentEngine = useSelector(getInGameEngine);
  const currentDread = useSelector(getInGameDread);

  const [showMoneyLoss, setShowMoneyLoss] = React.useState(false);
  const homeBtnPressed = () => {
    dispatch(addToMainInventory(inGameInventory));
    dispatch(toggleIsInGame());
    dispatch(resetGameMenuStates());
    dispatch(resetGameEndgameStates());
  };

  React.useEffect(() => {
    if (
      currentFuel === 0 ||
      currentHull === 0 ||
      currentEngine === 0 ||
      currentDread === 0
    ) {
      dispatch(changeMoney(-100));
      setShowMoneyLoss(true);
    }
  }, []);

  const endGameConditionDesc = (): string => {
    if (currentFuel === 0) {
      return "Your fuel reserves dwindle to nothingness. As the ship's engines sputter and fall silent, you find yourself adrift in the cold vacuum of space. In a twist of cosmic fortune, a passing cargo ship detects your distress signal. A beacon of hope emerges on the horizon as the vessel alters its course to intercept your stranded spacecraft. Soon, the cargo ship pulls alongside, extending a lifeline to rescue you from the vast emptiness. They request a payment from you of 100 credits for their assistance. Help is rarely free in this line of work…";
    } else if (currentHull === 0) {
      return "The hull sustains damage beyond the point of repair. The cold vacuum of space seeps into the fragile breaches, and the vessel becomes a vulnerable shell adrift in the cosmic void. Panic grips you as vital life support systems flicker, and the comforting hum of the ship's engines fades into an ominous silence. By a twist of cosmic fate, a passing ship detects distress signals emanating from your crippled spacecraft. The rescuing vessel, a beacon of hope against the desolation of space, alters its course to intercept your dwindling lifeline. As it pulls alongside, the rescuing crew swiftly executes a daring maneuver, facilitating your transition to their functional ship. They request a payment from you of 100 credits for their assistance. Help is rarely free in this line of work…";
    } else if (currentEngine === 0) {
      return 'Your engine ceases to function beyond the scope of repair. Stranded in the vastness of the cosmos, your vessel drifts in silence, a lone beacon of technological failure against the backdrop of stars. Fortune, however, takes a turn as a passing ship detects your distress signals. Responding to the cosmic call for help, the rescuing vessel maneuvers toward your disabled spacecraft. Soon, the ship pulls alongside, extending a lifeline to rescue you from the vast emptiness. They request a payment from you of 100 credits for their assistance. Help is rarely free in this line of work…';
    } else if (currentDread === 0) {
      return 'In the isolation of deep space during a prolonged and challenging expedition, the unrelenting vastness takes its toll on your mental resilience. Gradually, the solitude becomes a haunting echo, amplifying the weight of cosmic emptiness. As the days stretch into an indistinguishable continuum, a disconcerting unraveling of composure begins. Amidst this cosmic turmoil, a passing ship, by chance or cosmic intervention, detects distress signals emanating from your deteriorating vessel. Responding to the call, the rescuing ship arrives just in time. Its crew witnesses the harrowing scene of a disoriented spacefarer, and they extend a lifeline to bring you aboard their ship. They request a payment from you of 100 credits for their assistance. Help is rarely free in this line of work…';
    } else {
      return "Guided by calculated decisions and strategic foresight, you successfully conclude your expedition. Your ship, gracefully exits the solar system. The once-teasing celestial debris, whether a trove of resources or a potential peril, fades into the cosmic backdrop as you chart a course for open space. The ship's engines hum a reassuring melody as you leave the system behind.";
    }
  };

  const itemsFound = () => {
    return inGameInventory.map((item: InventoryItem, i: number) => {
      return (
        <View key={i} style={styles.finding}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item?.item.icon && <Image source={item.item.icon} />}
            <Text style={[styles.font16, { paddingLeft: 15 }]}>
              {item.item.name}
            </Text>
          </View>
          <Text style={styles.font16}>{item?.count}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.mainText}>You Conclude Your Expedition</Text>
      {showMoneyLoss && <Text style={{ paddingVertical: 10 }}>Credits: -100</Text>}
      <Text style={AppStyles.paragraph}>{endGameConditionDesc()}</Text>
      <View>
        <Text style={styles.findings}>Expedition Findings</Text>
        {itemsFound()}
      </View>
      <Button
        style={[AppStyles.button, { marginTop: 15 }]}
        labelStyle={AppStyles.buttonText}
        mode='contained'
        onPress={() => homeBtnPressed()}>
        Back to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    padding: 10,
    backgroundColor: 'black',
  },
  mainText: {
    textAlign: 'center',
    fontSize: 30,
    paddingTop: 30,
    paddingBottom: 15,
  },
  findings: {
    fontSize: 20,
    paddingVertical: 15,
  },
  finding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#181818',
    fontSize: 16,
    marginBottom: 10,
  },
  font16: {
    fontSize: 16,
  },
});
