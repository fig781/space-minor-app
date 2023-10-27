import { StyleSheet, View } from 'react-native';
import { PaperProvider, Button, Text, BottomNavigation } from 'react-native-paper';
import theme from './utils/theme.json';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from './pages/Game/GameScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainMenuScreen from './pages/MainMenu/MainMenuScreen';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// TODO setup theme https://callstack.github.io/react-native-paper/docs/guides/theming

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <SafeAreaView style={{ height: '100%' }}>
            <MainMenuScreen />
          </SafeAreaView>
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}
