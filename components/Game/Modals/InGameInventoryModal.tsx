import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Modal, Button, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../../reduxStore/slices/pagesStateSlice';
import { getShowInventoryMenu, toggleInventoryMenu } from '../../../reduxStore/slices/gameMenuSlice';
import { getCurrentInGameInventory } from '../../../reduxStore/slices/gameSlice';
import { InventoryItem as IInventoryItem } from '../../../utils/types/inventoryItem.interface';
import InventoryItem from '../../InventoryItem';

export default function InGameInventoryModal() {
  const dispatch = useDispatch();
  const showInGameInventoryModal: boolean = useSelector((state: any) => state.gameMenu.showInventoryMenu);
  const currentInGameInventory: IInventoryItem[] = useSelector(getCurrentInGameInventory);

  const [selectedItem, setSelectedItem] = React.useState<null | IInventoryItem>(null);

  React.useEffect(() => {
    setSelectedItem(null);
  }, [showInGameInventoryModal])

  const itemSelected = (inventoryItem: IInventoryItem) => {
    setSelectedItem(inventoryItem);
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
    <Modal visible={showInGameInventoryModal}
      onDismiss={() => dispatch(toggleInventoryMenu())}
      contentContainerStyle={styles.modal}>
      <View style={styles.main}>
        {
          currentInGameInventory.map((item: IInventoryItem) => {
            return <InventoryItem key={item.id} inventoryItem={item} itemSelected={itemSelected} />
          })
        }
      </View>
      {
        selectedItem && itemDetailsDisplay()
      }
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'grey',
    padding: 10,
    height: '60%',
    justifyContent: 'space-between'
  },
  main: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'

  },
  details: {
    backgroundColor: 'lightblue'
  }
});