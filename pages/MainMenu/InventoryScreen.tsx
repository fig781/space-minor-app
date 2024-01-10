import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import InventoryItem from '../../components/InventoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { getMainInventory, removeFromMainInventory } from '../../reduxStore/slices/mainMenuSlice';
import { InventoryItem as IInventoryItem } from '../../utils/types/inventoryItem.interface';
import Slider from '@react-native-community/slider';
import ItemCountSelection from '../../components/ItemCountSelection';
import { changeMoney } from '../../reduxStore/slices/gameSlice';
import { store } from '../../reduxStore/store';

export default function InventoryScreen() {
  const dispatch = useDispatch();
  const mainInventory: IInventoryItem[] = useSelector(getMainInventory);
  const [selectedItem, setSelectedItem] = React.useState<null | IInventoryItem>(null);
  const [showSellInput, setShowSellInput] = React.useState<boolean>(false);

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

  // const refreshSelectedItem = (inventoryItem: IInventoryItem | undefined) => {
  //   if (!inventoryItem) {
  //     setSelectedItem(null);
  //   } else if (selectedItem?.id === inventoryItem?.id) {
  //     setSelectedItem(inventoryItem);
  //   } else {
  //     setSelectedItem(null);
  //   }
  // }

  const sellItemsCancelPress = () => {
    setShowSellInput(false);
  }

  const sellItemsSellPress = (count: number) => {
    const data = store.getState();

    console.log(selectedItem)
    if (!count || !selectedItem) return;
    // let updatedItem = selectedItem;
    // updatedItem.count = count;
    // setSelectedItem(updatedItem)
    console.log(mainInventory)
    dispatch(removeFromMainInventory([{ item: selectedItem, count: count }]));
    console.log(mainInventory)
    setTimeout(() => {
      // const invItem = mainInventory.find(item => item.id === selectedItem.id);
      // console.log(invItem)
      // setSelectedItem(invItem ?? null);
      console.log(data.mainMenu.mainInventory)
    }, 5000);


    dispatch(changeMoney(count * selectedItem?.item.value!));
    // check if 
    setShowSellInput(false);
  }

  const itemDetailsDisplay = () => {
    console.log(selectedItem?.count);
    return (
      <View style={styles.details}>
        <Image source={selectedItem?.item.icon} />
        <Text>{selectedItem?.item.name}</Text>
        <Text>{selectedItem?.count}</Text>
        <Text>{selectedItem?.item.description}</Text>
        {!showSellInput && <Button mode='contained' onPress={() => setShowSellInput(!showSellInput)}>Sell</Button>}
        {
          showSellInput && (
            <ItemCountSelection
              item={selectedItem!}
              mainBtnText='Sell'
              canceBtnPressed={sellItemsCancelPress}
              actionBtnPressed={sellItemsSellPress} />
          )
        }
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