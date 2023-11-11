import { useDispatch, useSelector } from "react-redux"
import { Option, RoleResult, ScenarioOutcome } from "../types/option.interface"
import { addToCurrentInventory, addToPlanetIdsScanned, getSelectedPlanet } from "../../reduxStore/slices/gameSlice";
import { store } from "../../reduxStore/store";
import { Planet } from "../types/planet.interface";
import { calculateModifiedRole, generateRole } from "../functions";
import { InventoryPayload } from "../types/inventoryItem.interface";

// Engine just stops working
function scenarioOptions0(): Option[] {

  return [
    {
      id: 0,
      text: 'Try replacing the ',
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

// Get 
function scenarioOptions1(): Option[] {

  return [
    {
      id: 0,
      text: 'Try replacing the ',
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

// Mining
function scenarioOptions2(): Option[] {
  // need to generate options based on if you have scanned the planet
  /**
   * if you have scanned, show an option for each mineral
   * if you have not scanned, show only one option to mine randomly
   */
  const state = store.getState();
  const currentPlanet: Planet | null = state.game.selectedPlanet;
  const planetIdsScanned: number[] = state.game.planetIdsScanned;
  let planetIsScanned = false;

  if (currentPlanet) {
    planetIsScanned = planetIdsScanned.some((id: number) => {
      // @ts-ignore
      return id === currentPlanet.id;
    })
  }

  if (false) {

  } else {
    return [
      {
        id: 0,
        text: 'Mine in a random location on the planet',
        successNumber: 30,
        isVisible: () => true,
        generateRole: (): RoleResult => {
          const role: number = generateRole();
          const modifiers = [
            {
              name: 'Mining Skill', //placeholder
              number: 3
            }
          ]
          const modifiedRole = calculateModifiedRole(role, modifiers);

          // will generate a list of modifiers based on equipment and skill
          return {
            baseRole: role,
            modifiedRole: modifiedRole,
            modifiers: modifiers
          }
        },
        action: (outcomeText: string): ScenarioOutcome => {
          const minerals = currentPlanet!.minerals;
          const randomIndex = generateRole(0, minerals.length - 1);
          const selectedMineral = minerals[randomIndex];

          if (outcomeText === 'Critical Failure') {
            // damage component redux dispatch
            return {
              text: 'There is a problem with your mining drill which damages your hull.',
              changes: [{ id: 0, text: 'Hull', count: -1 }]
            }
          } else if (outcomeText === 'Failure') {
            return {
              text: 'Unfortunatly, you find nothing...',
              changes: []
            }
          } else if (outcomeText === 'Success') {
            const mineralAmount = generateRole(3, 6);
            const inventoryItem: InventoryPayload = { count: mineralAmount, item: selectedMineral }
            store.dispatch(addToCurrentInventory(inventoryItem));
            return {
              text: `You successfully find a small vein of ${selectedMineral.name}.`,
              changes: [{ id: 0, text: selectedMineral.name, count: mineralAmount }]
            }
          } else {
            const mineralAmount = generateRole(7, 10);
            const inventoryItem: InventoryPayload = { count: mineralAmount, item: selectedMineral }
            store.dispatch(addToCurrentInventory(inventoryItem));
            return {
              text: `You successfully find a large vein of ${selectedMineral.name}.`,
              changes: [{ id: 0, text: selectedMineral.name, count: mineralAmount }]
            }
          }
        }
      }
    ]
  }



  return [
    {
      id: 0,
      text: 'Try replacing the ',
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
  scenarioOptions1,
  scenarioOptions2,
  scenarioOptions4
}