import { Option } from "../types/option.interface"

const scenarioOptions0: Option[] = [
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

export {
  scenarioOptions0,
}