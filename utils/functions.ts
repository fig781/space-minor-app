import scenarios from "./data/scenarios"

const generateScenario = (type: 'traveling' | 'mining' | 'scanning') => {
  // takes in many params and returns a scenario from the list of them
  const filteredScenarios = scenarios.filter(s => type === s.type);
  const scenarioId = Math.floor(Math.random() * filteredScenarios.length);

  return filteredScenarios[scenarioId];
}

const getScenarioById = (scenarioId: number) => {
  return scenarios.find(s => s.id === scenarioId);
}

export {
  generateScenario,
  getScenarioById
}