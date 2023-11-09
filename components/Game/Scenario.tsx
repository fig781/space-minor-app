import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentScenario } from '../../reduxStore/slices/gameSlice'
import { Button, Text } from 'react-native-paper'
import { Option } from '../../utils/types/option.interface'
import { setCurrentScenario } from '../../reduxStore/slices/gameSlice'
import { Scenario as IScenario } from '../../utils/types/scenario.interface'
// when you conclude a scenario, you got to the planet screen

interface Props {
  scenario: IScenario
}

const Scenario: React.FC<Props> = ({ scenario }) => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = React.useState<null | Option>(null);

  // React.useEffect(() => {
  //   if(scenario.options.length === 0) {
  //     setSelectedOption({
  //       id: 0,
  //       text: '',
  //       followUpText: '',
  //       isVisible: () => true,
  //       action: () => { }
  //     })
  //   }
  // }, [scenario]);

  const actionBtnPressed = (option: Option) => {
    setSelectedOption(option)
    option.action();
  }

  const continueBtnPressed = () => {
    dispatch(setCurrentScenario(null));
  }

  const renderAfterOptionSelected = () => {
    if (selectedOption) {
      return (
        <View>
          <Text>{selectedOption.followUpText}</Text>
          {
            selectedOption?.discoveredItems?.map(i => {
              return (
                <View key={i.id}>
                  <Image source={i.iconPath} />
                  <Text>{i.name}</Text>
                </View>
              )
            })
          }
          <Button mode="contained" onPress={() => continueBtnPressed()}>Continue</Button>
        </View>
      )
    }
  }

  return (
    <View>
      <Text>{scenario.description}</Text>
      {
        //@ts-ignore
        scenario.options().map((o: Option) => {
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
      {selectedOption && renderAfterOptionSelected()}
    </View>
  )
}

export default Scenario

const styles = StyleSheet.create({})