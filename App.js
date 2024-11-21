import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { LoginProvider } from './context/LoginContext'; // Import LoginProvider
import MainNavigator from './navigation/MainNavigator'; // Import MainNavigator
import { LogBox } from 'react-native'; // Import LogBox

// Vô hiệu hóa cảnh báo VirtualizedLists
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

export default function App() {
  return (
    <PaperProvider>
      <LoginProvider>
        <MainNavigator />
      </LoginProvider>
    </PaperProvider>
  );
}
