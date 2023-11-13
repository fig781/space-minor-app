import { useDispatch, useSelector } from 'react-redux';
import { Option, RoleResult, ScenarioOutcome } from '../types/option.interface';
import {
  addToCurrentInventory,
  addToDiscoveredOnPlanets,
  getSelectedPlanet,
} from '../../reduxStore/slices/gameSlice';
import { store } from '../../reduxStore/store';
import { Planet, PlanetDiscoveries } from '../types/planet.interface';
import { calculateModifiedRole, generateRole } from '../functions';
import { InventoryPayload } from '../types/inventoryItem.interface';

// Engine just stops working
function scenarioOptions0(): Option[] {
  return [
    {
      id: 0,
      text: 'Try replacing the ',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        return {
          text: 'Follow up text',
          changes: [],
        };
      },
    },
    {
      id: 1,
      text: 'Do Action 2',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        return {
          text: 'Follow up text',
          changes: [],
        };
      },
    },
  ];
}

// Get
function scenarioOptions1(): Option[] {
  return [
    {
      id: 0,
      text: 'Try replacing the ',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        return {
          text: 'Follow up text',
          changes: [],
        };
      },
    },
    {
      id: 1,
      text: 'Do Action 2',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        return {
          text: 'Follow up text',
          changes: [],
        };
      },
    },
  ];
}

// Default Mining
function scenarioOptions2(): Option[] {
  const state = store.getState();
  // @ts-ignore
  const currentPlanet: Planet = state.game.selectedPlanet;
  // @ts-ignore
  const discoveredOnPlanets: PlanetDiscoveries[] = state.game.discoveredOnPlanets;
  let planetDiscoveredIndex = -1;

  for (let x = 0; x < discoveredOnPlanets.length; x++) {
    if (discoveredOnPlanets[x].planetId === currentPlanet.id) {
      planetDiscoveredIndex = x;
    }
  }

  let mineralIdsToMine: any[] = [];
  if (discoveredOnPlanets[planetDiscoveredIndex]?.itemIdsDiscovered) {
    mineralIdsToMine = discoveredOnPlanets[planetDiscoveredIndex].itemIdsDiscovered;
  }

  if (mineralIdsToMine.length > 0) {
    const minerals = currentPlanet.minerals.filter((m) => {
      return mineralIdsToMine.includes(m.id);
    });

    return minerals.map((m) => {
      return {
        id: m.id,
        text: `Mine for ${m.name}`,
        successNumber: m.difficulty,
        isVisible: () => true,
        generateRole: (): RoleResult => {
          const role: number = generateRole();
          const modifiers = [
            {
              name: 'Mining Skill', //placeholder
              number: 3,
            },
          ];
          const modifiedRole = calculateModifiedRole(role, modifiers);

          // will generate a list of modifiers based on equipment and skill
          return {
            baseRole: role,
            modifiedRole: modifiedRole,
            modifiers: modifiers,
          };
        },
        generateOutcome: (outcomeText: string): ScenarioOutcome => {
          if (outcomeText === 'Critical Failure') {
            // damage component redux dispatch
            return {
              text: 'There is a problem with your mining drill which damages your hull.',
              changes: [{ id: 0, text: 'Hull', count: -1 }],
            };
          } else if (outcomeText === 'Failure') {
            return {
              text: 'Unfortunatly, you find nothing...',
              changes: [],
            };
          } else if (outcomeText === 'Success') {
            const mineralAmount = generateRole(3, 6);
            const inventoryItem: InventoryPayload = {
              count: mineralAmount,
              item: m,
            };
            store.dispatch(addToCurrentInventory(inventoryItem));
            return {
              text: `You successfully find a vein of ${m.name}.`,
              changes: [{ id: 0, text: m.name, count: mineralAmount, icon: m.icon }],
            };
          } else {
            const mineralAmount = generateRole(7, 10);
            const inventoryItem: InventoryPayload = {
              count: mineralAmount,
              item: m,
            };
            store.dispatch(addToCurrentInventory(inventoryItem));
            return {
              text: `You successfully find a large vein of ${m.name}.`,
              changes: [{ id: 0, text: m.name, count: mineralAmount, icon: m.icon }],
            };
          }
        },
      };
    });
  } else {
    return [
      {
        id: 0,
        text: 'Mine in a random location on the planet',
        successNumber: 94,
        isVisible: () => true,
        generateRole: (): RoleResult => {
          const role: number = generateRole();
          const modifiers = [
            {
              name: 'Mining Skill', //placeholder
              number: 3,
            },
          ];
          const modifiedRole = calculateModifiedRole(role, modifiers);

          // will generate a list of modifiers based on equipment and skill
          return {
            baseRole: role,
            modifiedRole: modifiedRole,
            modifiers: modifiers,
          };
        },
        generateOutcome: (outcomeText: string): ScenarioOutcome => {
          const minerals = currentPlanet!.minerals;
          const randomIndex = generateRole(0, minerals.length - 1);
          const selectedMineral = minerals[randomIndex];

          if (outcomeText === 'Critical Failure') {
            // damage component redux dispatch
            return {
              text: 'There is a problem with your mining drill which damages your hull.',
              changes: [{ id: 0, text: 'Hull', count: -1 }],
            };
          } else if (outcomeText === 'Failure') {
            return {
              text: 'Unfortunatly, you find nothing...',
              changes: [],
            };
          } else if (outcomeText === 'Success') {
            const mineralAmount = generateRole(3, 6);
            const inventoryItem: InventoryPayload = {
              count: mineralAmount,
              item: selectedMineral,
            };
            store.dispatch(addToCurrentInventory(inventoryItem));
            return {
              text: `You successfully find a vein of ${selectedMineral.name}.`,
              changes: [
                {
                  id: 0,
                  text: selectedMineral.name,
                  count: mineralAmount,
                  icon: selectedMineral.icon,
                },
              ],
            };
          } else {
            const mineralAmount = generateRole(7, 10);
            const inventoryItem: InventoryPayload = {
              count: mineralAmount,
              item: selectedMineral,
            };
            store.dispatch(addToCurrentInventory(inventoryItem));
            return {
              text: `You successfully find a large vein of ${selectedMineral.name}.`,
              changes: [
                {
                  id: 0,
                  text: selectedMineral.name,
                  count: mineralAmount,
                  icon: selectedMineral.icon,
                },
              ],
            };
          }
        },
      },
    ];
  }
}

// Scanning on planet 1
function scenarioOptions4(): Option[] {
  const state = store.getState();
  // @ts-ignore
  const currentPlanet: Planet = state.game.selectedPlanet;
  // @ts-ignore
  const planetDiscoveries: PlanetDiscoveries = state.game.discoveredOnPlanets;
  return [
    {
      id: 0,
      text: 'Continue',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        console.log(currentPlanet);
        //@ts-ignore
        // based on scanner, may find different things
        // let totalChanges = [];
        // check if
        const mineralChanges = currentPlanet.minerals.map((m) => {
          return { id: Math.random(), text: m.name };
        });
        const minerlaIDs = currentPlanet.minerals.map((m) => {
          return m.id;
        });
        // const anomalieChanges = []
        // add anomalie info here too
        // totalChanges = mineralChanges.concat(anomalieChanges);

        const dicoverPayload = {
          planetId: currentPlanet.id,
          itemIdsDiscovered: minerlaIDs,
          anomalieIdsDiscovered: [],
        };
        store.dispatch(addToDiscoveredOnPlanets(dicoverPayload));

        return {
          text: 'Here is what you have found:',
          changes: mineralChanges,
        };
        // if(totalChanges.length === 0) {
        //   return {
        //     text: 'You found nothing new',
        //     changes: []
        //   };
        // } else {
        //   return {
        //     text: 'Here is what you have found:',
        //     changes: totalChanges
        //   };
        // }
      },
    },
  ];
}

export { scenarioOptions0, scenarioOptions1, scenarioOptions2, scenarioOptions4 };
