import { CRIT_FAIL, CRIT_SUCCESS } from "./constants";
import scenarios from "./data/scenarios"
import { RoleModifier } from "./types/option.interface";

const generateScenario = (type: 'traveling' | 'mining' | 'scanning') => {
  // takes in many params and returns a scenario from the list of them
  const filteredScenarios = scenarios.filter(s => type === s.type);
  const scenarioId = Math.floor(Math.random() * filteredScenarios.length);

  return filteredScenarios[scenarioId];
}

const getScenarioById = (scenarioId: number) => {
  return scenarios.find(s => s.id === scenarioId);
}

const generateRole = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const calculateModifiedRole = (baseRole: number, modifiers: RoleModifier[]) => {
  if (modifiers.length === 0) return baseRole;
  const roleNumbers = modifiers.map(m => m.number);
  roleNumbers.push(baseRole);

  return roleNumbers.reduce((a, b) => a + b);
}

const generateOutcomeText = (role: number, roleNeeded: number, critSuccess = CRIT_SUCCESS, critFail = CRIT_FAIL): string => {
  if (role >= critSuccess) {
    return 'Critical Success'
  } else if (role >= roleNeeded) {
    return 'Success'
  } else if (role <= critFail) {
    return 'Critical Failure'
  } else {
    return 'Failure'
  }
}

const showDiceIconByDifficulty = (difficulty: number | undefined): string | undefined => {
  if (!difficulty) return undefined;

  if (difficulty <= 16) {
    return "dice-1"
  } else if (difficulty <= 32) {
    return "dice-2"
  } else if (difficulty <= 48) {
    return "dice-3"
  } else if (difficulty <= 64) {
    return "dice-4"
  } else if (difficulty <= 80) {
    return "dice-5"
  } else if (difficulty <= 96) {
    return "dice-6"
  }
}

export {
  generateScenario,
  getScenarioById,
  generateRole,
  calculateModifiedRole,
  generateOutcomeText,
  showDiceIconByDifficulty,
}