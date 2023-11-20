import { StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { InventoryItem as IInventoryItem } from '../utils/types/inventoryItem.interface'
import { Text } from 'react-native-paper'

interface Props {
  inventoryItem: IInventoryItem,
  itemSelected: any
}

const InventoryItem: React.FC<Props> = ({ inventoryItem, itemSelected }) => {

  return (
    <Pressable style={styles.main} onPress={() => itemSelected(inventoryItem)}>
      <Image source={inventoryItem.item.icon} />
      <Text>{inventoryItem.count}</Text>
    </Pressable>

  )
}

export default InventoryItem

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'green',
    height: 60,
    width: 60
  }
})