import { useDispatch, useSelector } from 'react-redux';
import { Option, RoleModifier, RoleResult, ScenarioOutcome, ScenarioOutcomeChanges } from '../types/option.interface';
import {
  addToCurrentInventory,
  addToDiscoveredOnPlanets,
  changeInGameDread,
  changeInGameEngine,
  changeInGameFuel,
  changeInGameHull,
  getSelectedPlanet,
} from '../../reduxStore/slices/gameSlice';
import { store } from '../../reduxStore/store';
import { Planet, PlanetDiscoveries } from '../types/planet.interface';
import { calculateModifiedRole, generateRole } from '../functions';
import { InventoryPayload } from '../types/inventoryItem.interface';
import { items } from './items';

// Engine just stops working
function scenarioOptions0(): Option[] {
  return [
    {
      id: 0,
      text: 'Reroute The Plasma Conduits',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        store.dispatch(changeInGameEngine(-1));
        store.dispatch(changeInGameFuel(-1));
        return {
          text: 'You skillfully execute a workaround to restore engine functionality. However, the successful implementation of the plasma conduit bypass comes at the cost of minor damage to the engine.',
          changes: [
            { id: 0, text: 'Engine', count: -1 },
            { id: 1, text: 'Fuel', count: -1 },
          ],
        };
      },
    },
    {
      id: 1,
      text: 'Reroute The Fuel Injector',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-2));
        return {
          text: 'You skillfully execute a workaround to restore engine functionality. However, the successful implementation of the fuel injector bypass comes at the cost of a momentary fuel leakage.',
          changes: [
            { id: 0, text: 'Fuel', count: -2 }
          ],
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
      text: 'Methodical Approach',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-2));
        return {
          text: "With a steady hand at the controls, you methodically assess the impending threat of the asteroid field. Your eyes, fixed on the panoramic viewscreen, scan the chaotic expanse for patterns and openings within the swirling sea of celestial debris. Carefully, you engage the ship's thrusters to successfully navigate through the asteroid field. Your methodical flying causes additional fuel to be used.",
          changes: [
            { id: 0, text: 'Fuel', count: -2 }
          ],
        };
      },
    },
    {
      id: 1,
      text: 'Rely On Your Piloting Ability',
      successNumber: 50,
      isVisible: () => true,
      generateRole: (): RoleResult => {
        const role: number = generateRole();
        const modifiers: RoleModifier[] = []
        const modifiedRole = calculateModifiedRole(role, modifiers);

        return {
          baseRole: role,
          modifiedRole: modifiedRole,
          modifiers: modifiers,
        };
      },
      generateOutcome: (outcomeText: string): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-1));

        if (outcomeText === 'Critical Failure') {
          store.dispatch(changeInGameHull(-1));
          store.dispatch(changeInGameDread(-1));
          return {
            text: 'Relying wholeheartedly on your piloting prowess, you approach the looming asteroid field with a watchful eye. As the spaceship glides through the vastness of space, your attention is fixed on the collection of celestial rocks ahead. With reckless abandon, you attempt to discern the shifting patterns, identifying openings and potential routes through the maze of space debris. You collide with multiple small asteroids. You take major damage to your hull. “Maybe I’m not cut out for this” you say.',
            changes: [
              { id: 0, text: 'Fuel', count: -1 },
              { id: 1, text: 'Hull', count: -1 },
              { id: 2, text: 'Composure', count: -1 }
            ],
          };
        } else if (outcomeText === 'Failure') {
          store.dispatch(changeInGameHull(-1));
          return {
            text: 'Relying wholeheartedly on your piloting prowess, you approach the looming asteroid field with a watchful eye. As the spaceship glides through the vastness of space, your attention is fixed on the collection of celestial rocks ahead. With each careful observation, you skillfully discern the shifting patterns, identifying openings and potential routes through the maze of space debris. You do not make it out unscathed though. You take minor damage to your hull.',
            changes: [
              { id: 0, text: 'Fuel', count: -1 },
              { id: 1, text: 'Hull', count: -1 },

            ],
          };
        } else if (outcomeText === 'Success') {
          return {
            text: `Relying wholeheartedly on your piloting prowess, you approach the looming asteroid field with a watchful eye. As the spaceship glides through the vastness of space, your attention is fixed on the collection of celestial rocks ahead. With each careful observation, you skillfully discern the shifting patterns, identifying openings and potential routes through the maze of space debris. You navigate the asteroid field with no issues.`,
            changes: [
              { id: 1, text: 'Fuel', count: -1 },
            ],
          };
        } else {
          const mineral = items[0];
          const inventoryItem: InventoryPayload = {
            count: 3,
            item: mineral,
          };
          store.dispatch(addToCurrentInventory([inventoryItem]));
          return {
            text: `Relying wholeheartedly on your piloting prowess, you approach the looming asteroid field with a watchful eye. As the spaceship glides through the vastness of space, your attention is fixed on the collection of celestial rocks ahead. With each careful observation, you skillfully discern the shifting patterns, identifying openings and potential routes through the maze of space debris. You navigate the asteroid field with no issues. Additionally, you find some useful ore amongst the debris.`,
            changes: [
              { id: 0, text: mineral.name, count: 3, icon: mineral.icon },
              { id: 1, text: 'Fuel', count: -1 },
            ],
          };
        }
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
          const modifiers: RoleModifier[] = [
            // {
            //   name: 'Mining Skill', //placeholder
            //   number: 3,
            // },
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
          store.dispatch(changeInGameFuel(-1));

          if (outcomeText === 'Critical Failure') {
            store.dispatch(changeInGameHull(-1));
            return {
              text: 'There is a problem with your mining drill which damages your hull.',
              changes: [
                { id: 0, text: 'Fuel', count: -1 },
                { id: 1, text: 'Hull', count: -1 }
              ],
            };
          } else if (outcomeText === 'Failure') {
            return {
              text: 'Unfortunatly, you find nothing...',
              changes: [{ id: 0, text: 'Fuel', count: -1 }],
            };
          } else if (outcomeText === 'Success') {
            const mineralAmount = generateRole(3, 6);
            const inventoryItem: InventoryPayload = {
              count: mineralAmount,
              item: m,
            };
            store.dispatch(addToCurrentInventory([inventoryItem]));
            return {
              text: `You successfully find a vein of ${m.name}.`,
              changes: [
                { id: 0, text: m.name, count: mineralAmount, icon: m.icon },
                { id: 1, text: 'Fuel', count: -1 },
              ],
            };
          } else {
            const mineralAmount = generateRole(7, 10);
            const inventoryItem: InventoryPayload = {
              count: mineralAmount,
              item: m,
            };
            store.dispatch(addToCurrentInventory([inventoryItem]));
            return {
              text: `You successfully find a large vein of ${m.name}.`,
              changes: [
                { id: 0, text: m.name, count: mineralAmount, icon: m.icon },
                { id: 1, text: 'Fuel', count: -1 },
              ],
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
          const modifiers: RoleModifier[] = [
            // {
            //   name: 'Mining Skill', //placeholder
            //   number: 3,
            // },
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
          store.dispatch(changeInGameFuel(-1));

          if (outcomeText === 'Critical Failure') {
            store.dispatch(changeInGameHull(-1));
            return {
              text: 'There is a problem with your mining drill which damages your hull.',
              changes: [
                { id: 0, text: 'Hull', count: -1 },
                { id: 1, text: 'Fuel', count: -1 }
              ],
            };
          } else if (outcomeText === 'Failure') {
            return {
              text: 'Unfortunatly, you find nothing...',
              changes: [{ id: 1, text: 'Fuel', count: -1 }],
            };
          } else if (outcomeText === 'Success') {
            const mineralAmount = generateRole(3, 6);
            const inventoryItem: InventoryPayload = {
              count: mineralAmount,
              item: selectedMineral,
            };
            store.dispatch(addToCurrentInventory([inventoryItem]));
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
            store.dispatch(addToCurrentInventory([inventoryItem]));
            return {
              text: `You successfully find a large vein of ${selectedMineral.name}.`,
              changes: [
                {
                  id: 0,
                  text: selectedMineral.name,
                  count: mineralAmount,
                  icon: selectedMineral.icon,
                },
                { id: 1, text: 'Fuel', count: -1 }
              ],
            };
          }
        },
      },
    ];
  }
}

// Attempt to use an item that has no use here
function scenarioOptions3(): Option[] {
  return [
    {
      id: 0,
      text: 'Continue',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-1));
        return {
          text: 'Nothing results from your attempts to use the item except for the loss of time.',
          changes: [{ id: 0, text: 'Fuel', count: -1 }],
        };
      },
    },
  ];
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
        //@ts-ignore
        // based on scanner, may find different things
        // let totalChanges = [];
        // check if
        const mineralChanges: ScenarioOutcomeChanges[] = currentPlanet.minerals.map((m) => {
          return { id: Math.random(), text: m.name, icon: m.icon };
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
        store.dispatch(changeInGameFuel(-1));
        mineralChanges.push({ id: Math.random(), text: 'Fuel', count: -1 })

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

function scenarioOptions5(): Option[] {
  return [
    {
      id: 0,
      text: 'Fix The Navigation System',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-1));
        store.dispatch(changeInGameDread(-1));
        return {
          text: 'With a methodical approach, you pinpoint the error—a subtle glitch in the star map calculations. A series of deft keystrokes reconfigures the coordinates, aligning the ship with its intended course. The once-fluctuating trajectory stabilizes, and the warning alarms gradually subside. “I don’t usually make mistakes like this”, you think to yourself.',
          changes: [
            { id: 0, text: 'Dread', count: -1 },
            { id: 1, text: 'Fuel', count: -1 },
          ],
        };
      },
    }
  ];
}

function scenarioOptions7(): Option[] {
  return [
    {
      id: 0,
      text: 'Mine The Asteroid',
      successNumber: 70,
      isVisible: () => true,
      generateRole: (): RoleResult => {
        const role: number = generateRole();
        const modifiers: RoleModifier[] = [];
        const modifiedRole = calculateModifiedRole(role, modifiers);

        return {
          baseRole: role,
          modifiedRole: modifiedRole,
          modifiers: modifiers,
        };

      },
      generateOutcome: (outcomeText: string): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-1));

        if (outcomeText === 'Critical Failure') {
          store.dispatch(changeInGameHull(-2));

          return {
            text: " Skillfully guiding your spaceship toward the celestial bounty, mining lasers hum to life as they carve into the rocky exterior, extracting valuable minerals. However, the cosmos, unpredictable as ever, has a twist in store. Unbeknownst to you, the asteroid conceals an unexpected structural instability. As the mining operation progresses, a hidden fault line ruptures, sending a cascade of debris hurtling toward your ship. Warning alarms blare, and the control panel flickers with urgency as you hastily try to evade the oncoming danger. Despite nimble maneuvers, the ship sustains damage.",
            changes: [
              { id: 0, text: 'Hull', count: -2 },
              { id: 1, text: 'Fuel', count: -1 },
            ],
          };
        } else if (outcomeText === 'Failure') {
          return {
            text: 'Unfortunately, you find nothing… Disheartened, you continue on your way.',
            changes: [{ id: 0, text: 'Fuel', count: -1 }],
          };
        } else if (outcomeText === 'Success') {
          const mineral = items[generateRole(0, 2)];
          const mineralCount = generateRole(1, 3);

          const inventoryItem: InventoryPayload = {
            count: mineralCount,
            item: mineral,
          };
          store.dispatch(addToCurrentInventory([inventoryItem]));
          return {
            text: `Your spaceship gracefully maneuvers closer, mining lasers humming to life as they carve into the rocky exterior. As the extraction progresses, the ship's scanners alert you to a hidden bounty—a promising vein of a rare and valuable mineral concealed within the asteroid. Excitement fills the cockpit as your careful mining reveals the glittering treasure.`,
            changes: [
              {
                id: 0,
                text: mineral.name,
                count: mineralCount,
                icon: mineral.icon,
              },
              { id: 1, text: 'Fuel', count: -1 },
            ],
          };
        } else {
          const mineral = items[generateRole(0, 2)];
          const mineralCount = generateRole(4, 9);

          const inventoryItem: InventoryPayload = {
            count: mineralCount,
            item: mineral,
          };
          store.dispatch(addToCurrentInventory([inventoryItem]));
          return {
            text: `Your spaceship gracefully maneuvers closer, mining lasers humming to life as they carve into the rocky exterior. As the extraction progresses, the ship's scanners alert you to a hidden bounty—a promising vein of a valuable <mineral> concealed within the asteroid. Excitement fills the cockpit as your careful mining reveals the glittering treasure. Success echoes through the cosmos as your cargo hold fills with the precious resource.`,
            changes: [
              {
                id: 0,
                text: mineral.name,
                count: mineralCount,
                icon: mineral.icon,
              },
              { id: 1, text: 'Fuel', count: -1 },
            ],
          };
        }
      },
    },
    {
      id: 1,
      text: 'Leave It Be',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-1));
        return {
          text: 'You conclude that the risks are too great and you continue on your way.',
          changes: [
            { id: 1, text: 'Fuel', count: -1 },
          ],
        };
      },
    }
  ];
}

function scenarioOptions6(): Option[] {
  return [
    {
      id: 0,
      text: 'Investigate',
      successNumber: 60,
      isVisible: () => true,
      generateRole: (): RoleResult => {
        const role: number = generateRole();
        const modifiers: RoleModifier[] = [];
        const modifiedRole = calculateModifiedRole(role, modifiers);

        return {
          baseRole: role,
          modifiedRole: modifiedRole,
          modifiers: modifiers,
        };

      },
      generateOutcome: (outcomeText: string): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-1));

        if (outcomeText === 'Critical Failure') {
          store.dispatch(changeInGameHull(-2));

          return {
            text: "Fueled by curiosity and the promise of potential discoveries, you decide to investigate the orbiting debris. As you maneuver closer, the ship's sensors come alive, scanning the wreckage for any signs of utility. The ship's sensors, rather than revealing treasure, detect an unstable structure within the debris. A sudden eruption of concealed fragments ensues, hurling shrapnel toward your spaceship with unexpected force. Warning alarms blare, and the control panel flickers as you desperately attempt evasive maneuvers. Despite your best efforts, the ship sustains damage from the celestial onslaught.",
            changes: [
              { id: 0, text: 'Hull', count: -2 },
              { id: 1, text: 'Fuel', count: -1 },
            ],
          };
        } else if (outcomeText === 'Failure') {
          return {
            text: 'Unfortunately, you find nothing… Disheartened, you continue on your way.',
            changes: [{ id: 0, text: 'Fuel', count: -1 }],
          };
        } else if (outcomeText === 'Success') {
          const component = items[3];
          const inventoryItem: InventoryPayload = {
            count: 1,
            item: component,
          };
          store.dispatch(addToCurrentInventory([inventoryItem]));
          return {
            text: `Fueled by curiosity and the promise of potential discoveries, you decide to investigate the orbiting debris. As you maneuver closer, the ship's sensors come alive, scanning the wreckage for any signs of utility. To your delight, hidden among the tangled remnants, you uncover a piece of valuable material. Your decision to explore the celestial debris has paid off.`,
            changes: [
              {
                id: 0,
                text: component.name,
                count: 1,
                icon: component.icon,
              },
              { id: 1, text: 'Fuel', count: -1 },
            ],
          };
        } else {
          const component1 = items[3];
          const component2 = items[4];
          const inventoryItem1: InventoryPayload = {
            count: 1,
            item: component1,
          };
          const inventoryItem2: InventoryPayload = {
            count: 1,
            item: component2,
          };
          store.dispatch(addToCurrentInventory([inventoryItem1, inventoryItem2]));
          return {
            text: `Fueled by curiosity and the promise of potential discoveries, you decide to investigate the orbiting debris. As you maneuver closer, the ship's sensors come alive, scanning the wreckage for any signs of utility. To your delight, hidden among the tangled remnants, you uncover a cache of salvageable materials. Your decision to explore the celestial debris has paid off, revealing a treasure trove of useful resources.`,
            changes: [
              {
                id: 0,
                text: component1.name,
                count: 1,
                icon: component1.icon,
              },
              {
                id: 1,
                text: component2.name,
                count: 1,
                icon: component2.icon,
              },
              { id: 2, text: 'Fuel', count: -1 },
            ],
          };
        }
      },
    },
    {
      id: 1,
      text: 'Leave It Be',
      isVisible: () => true,
      generateOutcome: (): ScenarioOutcome => {
        store.dispatch(changeInGameFuel(-1));
        return {
          text: 'You conclude that the risks are too great and you continue on your way.',
          changes: [
            { id: 1, text: 'Fuel', count: -1 },
          ],
        };
      },
    }
  ];
}

export {
  scenarioOptions0,
  scenarioOptions1,
  scenarioOptions2,
  scenarioOptions3,
  scenarioOptions4,
  scenarioOptions5,
  scenarioOptions6,
  scenarioOptions7
};
