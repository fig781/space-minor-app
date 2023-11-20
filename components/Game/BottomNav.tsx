import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { toggleInventoryMenu, toggleOptionsMenu, toggleSolarSystemMenu } from '../../reduxStore/slices/gameMenuSlice';
export default function BottomNav() {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    // icons for inventory, missions, solarsystem map, equipment, options
    <Appbar
      style={[
        styles.bottom,
        {
          height: 55 + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      <Appbar.Action icon="email" onPress={() => dispatch(toggleSolarSystemMenu())} />
      <Appbar.Action icon="label" onPress={() => dispatch(toggleInventoryMenu())} />
      <Appbar.Action icon="delete" onPress={() => { }} />
      <Appbar.Action icon="delete" onPress={() => { }} />
    </Appbar>
  )
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  }
})