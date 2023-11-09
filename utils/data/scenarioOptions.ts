import { useDispatch, useSelector } from "react-redux"
import { Option } from "../types/option.interface"
import { addToPlanetIdsScanned, getSelectedPlanet } from "../../reduxStore/slices/gameSlice";
import { store } from "../../reduxStore/store";
import { Planet } from "../types/planet.interface";

function scenarioOptions0(): Option[] {
  return [
    {
      id: 0,
      text: 'Do Action 1',
      followUpText: 'strig',
      isVisible: () => true,
      action: () => { }
    },
    {
      id: 1,
      text: 'Do Action 2',
      followUpText: 'strig',
      isVisible: () => true,
      action: () => { },
    },
  ]
}

// Scanning
function scenarioOptions4(): Option[] {
  const state = store.getState();
  const currentPlanet = state.game.selectedPlanet;

  return [
    {
      id: 0,
      text: 'Continue',
      followUpText: 'Here is what you have discovered',
      //@ts-ignore
      discoveredItems: currentPlanet?.minerals,
      discoveredAnomalies: [],
      isVisible: () => true,
      action: () => {
        console.log(currentPlanet)
        //@ts-ignore
        store.dispatch(addToPlanetIdsScanned(currentPlanet?.id))
      }
    }
  ]
}

export {
  scenarioOptions0,
  scenarioOptions4
}