import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentInGameInventory,
  getCurrentScenario,
} from '../../reduxStore/slices/gameSlice';
import { Button, Text } from 'react-native-paper';
import {
  Option,
  RoleModifier,
  RoleResult,
  ScenarioOutcome,
} from '../../utils/types/option.interface';
import { setCurrentScenario } from '../../reduxStore/slices/gameSlice';
import { Scenario as IScenario } from '../../utils/types/scenario.interface';
import { generateOutcomeText } from '../../utils/functions';
import { CRIT_FAIL, CRIT_SUCCESS } from '../../utils/constants';
// when you conclude a scenario, you got to the planet screen

interface Props {
  scenario: IScenario;
}

const Scenario: React.FC<Props> = ({ scenario }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = React.useState<null | Option>(null);
  const [role, setRole] = React.useState<RoleResult | null>(null);
  const [outcome, setOutcome] = React.useState<ScenarioOutcome | null>(null);
  const [showContinueBtn, setShowContinueBtn] = React.useState(false);
  const [roleOutcomeText, setRoleOutcomeText] = React.useState('');

  const actionBtnPressed = (option: Option) => {
    setSelectedOption(option);
    if (Object.hasOwn(option, 'generateRole')) {
      runRoleEvent(option);
    } else {
      setOutcome(option.generateOutcome());
      setShowContinueBtn(true);
    }
  };

  const runRoleEvent = (option: Option) => {
    const roleResult = option.generateRole!();
    setRole(roleResult);

    // do the actual data changes after the role animations
    setTimeout(() => {
      setOutcome(
        option.generateOutcome(generateOutcomeTextBasedOnRole(roleResult, option))
      );
      setShowContinueBtn(true);
    }, 2000);
  };

  const continueBtnPressed = () => {
    dispatch(setCurrentScenario(null));
  };

  // const renderAfterBasicOptionSelected = () => {
  //   if (selectedOption) {
  //     return (
  //       <View>
  //         <Text>{selectedOption.followUpText}</Text>
  //         {
  //           selectedOption?.discoveredItems?.map(i => {
  //             return (
  //               <View key={i.id}>
  //                 <Image source={i.iconPath} />
  //                 <Text>{i.name}</Text>
  //               </View>
  //             )
  //           })
  //         }
  //       </View>
  //     )
  //   }
  // }

  const generateOutcomeTextBasedOnRole = (
    _role: RoleResult,
    _selectedOption: Option
  ): string => {
    if (!_role || !_selectedOption?.successNumber) return '';

    const isBaseCrit = _role.baseRole >= CRIT_SUCCESS || _role.baseRole <= CRIT_FAIL;
    let roleOutcomeText;

    if (isBaseCrit)
      roleOutcomeText = generateOutcomeText(
        _role?.baseRole,
        _selectedOption?.successNumber
      );
    else
      roleOutcomeText = generateOutcomeText(
        _role?.modifiedRole,
        _selectedOption?.successNumber
      );
    return roleOutcomeText;
  };

  const renderAfterRoleOptionSelected = () => {
    if (!role || !selectedOption?.successNumber) return '';

    const roleOutcomeText = generateOutcomeTextBasedOnRole(role, selectedOption);
    const isBaseCrit = role.baseRole < CRIT_SUCCESS && role.baseRole > CRIT_FAIL;

    return (
      <View>
        <Text>Difficulty: {selectedOption?.successNumber}</Text>
        <Text>Role Value: {role?.baseRole}</Text>
        {isBaseCrit &&
          role?.modifiers.map((m, i: number) => {
            let modDisplay = m.number > 0 ? `+${m.number}` : `-${m.number}`;
            return (
              <View key={i}>
                <Text>
                  {m.name}: {modDisplay}
                </Text>
              </View>
            );
          })}
        {isBaseCrit && <Text>Final Value: {role?.modifiedRole}</Text>}
        <Text>{roleOutcomeText}</Text>
      </View>
    );
  };

  const renderOutcome = () => {
    if (!outcome) return;

    return (
      <View>
        <Text>{outcome.text}</Text>
        {outcome.changes.map((c, i) => {
          return (
            <View key={i}>
              {c?.icon && <Image source={c.icon} />}
              <Text>
                {c.text}: {c?.count}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text>{scenario.description}</Text>
      {
        //@ts-ignore
        scenario.options().map((o: Option) => {
          if (o.isVisible()) {
            return (
              <Button
                onPress={() => actionBtnPressed(o)}
                key={o.id}
                mode='contained'
                disabled={selectedOption ? true : false}>
                {o.text}
              </Button>
            );
          }
        })
      }
      {role && renderAfterRoleOptionSelected()}
      {/* {(selectedOption && selectedOption?.followUpText) && renderAfterBasicOptionSelected()} */}
      {outcome && renderOutcome()}
      {showContinueBtn && (
        <Button mode='contained' onPress={() => continueBtnPressed()}>
          Continue
        </Button>
      )}
    </View>
  );
};

export default Scenario;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    height: '100%',
  },
});
