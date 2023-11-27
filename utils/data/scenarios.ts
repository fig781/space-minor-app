import { Scenario } from "../types/scenario.interface";
import {
  scenarioOptions0,
  scenarioOptions1,
  scenarioOptions2,
  scenarioOptions3,
  scenarioOptions4
} from "./scenarioOptions";
// Scenarios for traveling between planets
// Scenarios for scanning a planet
// Scenarios for mining

// options 
// - there will be conditions to show them
// - there will be some logic that runs if you choose it
// - after it is chosen, it may end the game, continue to what you were 
//   doing before etc...

const scenarios: Scenario[] = [
  {
    id: 0,
    description: 'As you travel to your destination, the rhythmic hum of the engines serves as a comforting backdrop to your journey. Suddenly, a cascade of warning lights illuminate the cockpit, and the once-steady melody turns into a cacophony of alarms. Panic sets in as you grapple with the controls, desperately seeking answers in the face of engine trouble. How do you fix the engines?',
    type: 'traveling',
    //@ts-ignore
    options: () => scenarioOptions0()
  },
  {
    id: 1,
    description: 'test description2',
    type: 'traveling',
    //@ts-ignore
    options: () => scenarioOptions1()
  },
  {
    id: 2,
    description: 'You mine, choose what to mine',
    type: 'mining',
    options: () => scenarioOptions2()
  },
  {
    id: 3,
    description: 'You attempt to use the item.',
    type: 'use item',
    options: () => scenarioOptions3()
  },
  {
    id: 4,
    description: 'you scan the planet',
    type: 'scanning',
    //@ts-ignore
    options: () => scenarioOptions4()
  }
]

export default scenarios;