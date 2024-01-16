import { StyleSheet, Image, Pressable, View } from 'react-native'
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
      <View style={{ alignItems: "flex-end", width: "100%" }}>
        <Text style={{ paddingRight: 8 }}>{inventoryItem.count}</Text>
      </View>
    </Pressable>
  )
}

export default InventoryItem

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#262535',
    height: 50,
    width: 50
  }
})