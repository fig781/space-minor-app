import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { List } from 'react-native-paper';

const ItemOptions = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  /**
   *  - for each unique item in the inventory, make a btn option
   *  - when the btn is pressed, check if there are any events that
   *    fit the event/location and item id
   * 
   * 
   * 
   * 
   * 
   */
  return (
    <List.Section>
      <List.Accordion title="Use Item" expanded={expanded} onPress={handlePress}>

      </List.Accordion>
    </List.Section>
  )
}

export default ItemOptions

const styles = StyleSheet.create({})