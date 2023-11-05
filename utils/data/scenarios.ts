import { Scenario } from "../types/scenario.interface";
import { scenarioOptions0 } from "./scenarioOptions";
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
    description: 'test description',
    type: 'traveling',
    options: scenarioOptions0
  },
  {
    id: 1,
    description: 'test description2',
    type: 'traveling',
    options: scenarioOptions0
  },
  {
    id: 2,
    description: 'test description',
    type: 'mining',
    options: scenarioOptions0
  },
  {
    id: 3,
    description: 'test description2',
    type: 'mining',
    options: scenarioOptions0
  },
  {
    id: 4,
    description: 'test description',
    type: 'scanning',
    options: scenarioOptions0
  },
  {
    id: 5,
    description: 'test description2',
    type: 'scanning',
    options: scenarioOptions0
  },
]

export default scenarios;