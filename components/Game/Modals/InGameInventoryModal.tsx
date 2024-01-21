import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Modal, Button, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIsInGame } from '../../../reduxStore/slices/pagesStateSlice';
import { getShowInventoryMenu, toggleInventoryMenu } from '../../../reduxStore/slices/gameMenuSlice';
import { getCurrentInGameInventory } from '../../../reduxStore/slices/gameSlice';
import { InventoryItem as IInventoryItem } from '../../../utils/types/inventoryItem.interface';
import InventoryItem from '../../InventoryItem';
import ItemCountSelection from '../../ItemCountSelection';
import { removeFromCurrentInventory } from '../../../reduxStore/slices/gameSlice';
import AppStyles from '../../../utils/globalStyles';

export default function InGameInventoryModal() {
  const dispatch = useDispatch();
  const showInGameInventoryModal: boolean = useSelector((state: any) => state.gameMenu.showInventoryMenu);
  const currentInGameInventory: IInventoryItem[] = useSelector(getCurrentInGameInventory);

  const [selectedItem, setSelectedItem] = React.useState<null | IInventoryItem>(null);
  const [showJettisonInput, setShowJettisonInput] = React.useState<boolean>(false);

  React.useEffect(() => {
    setSelectedItem(null);
  }, [showInGameInventoryModal])

  const itemSelected = (inventoryItem: IInventoryItem) => {
    if (selectedItem?.id === inventoryItem.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(inventoryItem);
    }
  }

  const jettisonItemsCancelPress = () => {
    setShowJettisonInput(false);
  }

  const jettisonItemsPress = (count: number) => {
    if (!count || !selectedItem) return;
    if (selectedItem.count - count === 0) {
      setSelectedItem(null);
    } else {
      setSelectedItem({ ...selectedItem, count: selectedItem.count - count });
    }

    dispatch(removeFromCurrentInventory([{ item: selectedItem, count: count }]));
    setShowJettisonInput(false);
  }

  const itemDetailsDisplay = () => {
    return (
      <View style={styles.details}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={selectedItem?.item.icon} />
            <Text style={{ fontSize: 20, paddingLeft: 8, color: 'white' }}>
              {selectedItem?.item.name}
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: 'white' }}>{selectedItem?.count}</Text>
        </View>
        <Text style={[AppStyles.paragraph, { color: 'white' }]}>
          {selectedItem?.item.description}
        </Text>
        {!showJettisonInput && (
          <Button
            style={AppStyles.button}
            labelStyle={AppStyles.buttonText}
            mode='contained'
            onPress={() => setShowJettisonInput(!showJettisonInput)}>
            Jettison
          </Button>
        )}
        {showJettisonInput && (
          <ItemCountSelection
            item={selectedItem!}
            mainBtnText='Jettison'
            canceBtnPressed={jettisonItemsCancelPress}
            actionBtnPressed={jettisonItemsPress}
          />
        )}
      </View>
    )
  }

  return (
    <Modal visible={showInGameInventoryModal}
      onDismiss={() => dispatch(toggleInventoryMenu())}
      contentContainerStyle={styles.modal}>
      <Text style={styles.title}>Cargo</Text>
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
    padding: 10,
    margin: 10,
    backgroundColor: '#212529',
    height: "55%",
    justifyContent: 'space-between',
  },
  main: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 35
  },
  details: {
    // backgroundColor: 'black'
  },
  title: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    left: 10,
    top: 10,
  },
});