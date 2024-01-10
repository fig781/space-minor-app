import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider';
import { InventoryItem } from '../utils/types/inventoryItem.interface';
import { Button } from 'react-native-paper';

interface Props {
  item: InventoryItem
  mainBtnText: string
  actionBtnPressed: Function
  canceBtnPressed: Function
}

const ItemCountSelection: React.FC<Props> = ({ item, mainBtnText, actionBtnPressed, canceBtnPressed }) => {
  const [itemCountValue, setItemCountValue] = React.useState<number>(0);

  return (
    <View style={styles.main}>
      <Slider
        style={styles.slider}
        step={1}
        value={itemCountValue}
        onValueChange={setItemCountValue}
        minimumValue={0}
        maximumValue={item?.count}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Button mode='outlined' onPress={() => canceBtnPressed()}>Cancel</Button>
      <Button mode='contained' disabled={itemCountValue === 0} onPress={() => actionBtnPressed(itemCountValue)}>{mainBtnText} {itemCountValue}</Button>
    </View>
  )
}

export default ItemCountSelection

const styles = StyleSheet.create({
  main: {
    padding: 10,
    borderColor: 'blue',
    borderWidth: 1
  },
  slider: {
    paddingBottom: 15,
    paddingTop: 5
  }
})