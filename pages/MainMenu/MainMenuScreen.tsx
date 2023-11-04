import { StyleSheet, View } from 'react-native'
import { PaperProvider, Button, Text, BottomNavigation, Portal } from 'react-native-paper';
import theme from '../../utils/theme.json';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EquipmentScreen from './EquipmentScreen';
import FactoryScreen from './FactoryScreen';
import InventoryScreen from './InventoryScreen';
import MissionsScreen from './MissionsScreen';
import SkillsScreen from './SkillsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpeditionSelectScreen from './ExpeditionSelectScreen';
import TopNav from '../../components/MainMenu/TopNav';

export default function MainMenuScreen() {

  const { colors } = theme;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'expeditions', title: 'Expeditions', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'missions', title: 'Missions', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'equipment', title: 'Equipment', focusedIcon: 'album' },
    { key: 'inventory', title: 'Inventory', focusedIcon: 'history' },
    { key: 'factory', title: 'Factory', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    { key: 'skills', title: 'Skills', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    expeditions: ExpeditionSelectScreen,
    missions: MissionsScreen,
    equipment: EquipmentScreen,
    inventory: InventoryScreen,
    factory: FactoryScreen,
    skills: SkillsScreen,
  });

  return (
    <Portal>
      <TopNav />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </Portal>

  )
}

const styles = StyleSheet.create({})