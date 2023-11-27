import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import InventoryItem from '../../components/InventoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { getMainInventory } from '../../reduxStore/slices/mainMenuSlice';
import { InventoryItem as IInventoryItem } from '../../utils/types/inventoryItem.interface';

export default function InventoryScreen() {
  const dispatch = useDispatch();
  const mainInventory = useSelector(getMainInventory);
  const [selectedItem, setSelectedItem] = React.useState<null | IInventoryItem>(null);

  React.useEffect(() => {
    setSelectedItem(null);
  }, [])

  const itemSelected = (inventoryItem: IInventoryItem) => {
    if (selectedItem?.id === inventoryItem.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(inventoryItem);
    }
  }

  const itemDetailsDisplay = () => {
    return (
      <View style={styles.details}>
        <Image source={selectedItem?.item.icon} />
        <Text>{selectedItem?.item.name}</Text>
        <Text>{selectedItem?.count}</Text>
        <Text>{selectedItem?.item.description}</Text>
      </View>
    )
  }

  return (
    <View >
      <View style={styles.invGrid}>
        {
          mainInventory.map((item: IInventoryItem) => {
            return <InventoryItem key={item.id} inventoryItem={item} itemSelected={itemSelected} />
          })
        }
      </View>
      {
        selectedItem && itemDetailsDisplay()
      }
    </View>

  )
}

const styles = StyleSheet.create({
  invGrid: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'

  },
  details: {
    backgroundColor: 'grey'
  }
})