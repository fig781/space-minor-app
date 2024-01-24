import { Scenario } from "../types/scenario.interface";
import {
  scenarioOptions0,
  scenarioOptions1,
  scenarioOptions2,
  scenarioOptions3,
  scenarioOptions4,
  scenarioOptions5,
  scenarioOptions6,
  scenarioOptions7
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
    description: "As you travel to your destination, the tranquility of space is abruptly shattered by the sudden appearance of a dense asteroid field. Jagged rocks, remnants of cosmic collisions, loom ominously in your path, their surfaces pockmarked by eons of interstellar bombardment. The ship's proximity alarms blare urgently, signaling the imminent danger. How do you survive?",
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
    description: "As your ship hovers in low orbit, you initiate the planet scanning process with a series of calibrated instruments. The ship's sensors come to life, emitting a soft hum as they activate, and a myriad of data streams begin to flow across the control panels.",
    type: 'scanning',
    //@ts-ignore
    options: () => scenarioOptions4()
  },
  {
    id: 5,
    description: 'In a twist of fate, a momentary lapse in navigation causes your spacecraft to veer off its intended course. The once-stable trajectory falters, and the ship drifts into uncharted territory. Warning alarms blare, echoing the sudden deviation, as your surroundings morph from the familiar to the unknown. Stars shift positions, and the vastness of space takes on an unsettling new dimension.',
    type: 'traveling',
    //@ts-ignore
    options: () => scenarioOptions5()
  },
  {
    id: 6,
    description: 'As you approach your destination, a low level energy signature appears on your scanner. An ominous piece of ship debris floats in high orbit. The remnants, a ghostly echo of some past celestial clash, appear to carry the potential for valuable salvage. Do you investigate the debris?',
    type: 'traveling',
    //@ts-ignore
    options: () => scenarioOptions6()
  },
  {
    id: 7,
    description: 'As you travel to your destination, a gleam catches your attention—a lone asteroid, adorned with visible ore deposits, emerges from the cosmic tapestry. The shimmering hues of precious minerals dance upon its rugged surface, promising a quick and lucrative mining opportunity. Do you mine the lone asteroid?',
    type: 'traveling',
    //@ts-ignore
    options: () => scenarioOptions7()
  },
]

export default scenarios;