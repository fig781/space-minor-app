import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleOptionsMenu } from '../../reduxStore/slices/gameMenuSlice';
import { getMoney } from '../../reduxStore/slices/gameSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopNav() {
  const dispatch = useDispatch();
  const money = useSelector(getMoney);
  return (
    // show fuel, money and options icon
    <SafeAreaView>
      <View style={styles.main}>
        <Text style={styles.text}>Credits: {money}</Text>
        <IconButton icon="cog" onPress={() => dispatch(toggleOptionsMenu())} />
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    borderColor: 'grey',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: 'white'
  }
})