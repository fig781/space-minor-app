import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import AppStyles from '../utils/globalStyles';
import { useDispatch } from 'react-redux';
import { toggleShowIntroPage } from '../reduxStore/slices/pagesStateSlice';

const IntroPage = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.main}>
      <Text>IntroPage</Text>
      <Button style={AppStyles.button} labelStyle={AppStyles.buttonText} mode="contained" onPress={() => dispatch(toggleShowIntroPage())}>Begin Your Journey</Button>
    </View>
  )
}

export default IntroPage

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: 'black',

  }
})