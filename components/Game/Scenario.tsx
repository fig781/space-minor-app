import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentScenario } from '../../reduxStore/slices/gameSlice'
import { Button, Text } from 'react-native-paper'
import { Option } from '../../utils/types/option.interface'
import { setCurrentScenario } from '../../reduxStore/slices/gameSlice'
// when you conclude a scenario, you got to the planet screen

const Scenario = () => {
  const dispatch = useDispatch()
  const currentScenario = useSelector(getCurrentScenario);
  const [selectedOption, setSelectedOption] = React.useState<null | Option>(null);

  const actionBtnPressed = (option: Option) => {
    setSelectedOption(option)
    option.action();
  }

  const continueBtnPressed = () => {
    dispatch(setCurrentScenario(null));
  }

  return (
    <View>
      <Text>{currentScenario.description}</Text>
      {
        selectedOption && <Text>{selectedOption.followUpText}</Text>
      }
      {
        currentScenario.options.map((o: Option) => {
          if (o.isVisible()) {
            return (
              <Button
                onPress={() => actionBtnPressed(o)}
                key={o.id}
                mode="contained"
                disabled={selectedOption ? true : false}>
                {o.text}
              </Button>
            )
          }
        })
      }
      {
        selectedOption && <Button mode="contained" onPress={() => continueBtnPressed()}>Continue</Button>
      }
    </View>
  )
}

export default Scenario

const styles = StyleSheet.create({})