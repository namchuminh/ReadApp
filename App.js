import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { LoginProvider } from './context/LoginContext'; // Import LoginProvider
import MainNavigator from './navigation/MainNavigator'; // Import MainNavigator

export default function App() {
  return (
    <PaperProvider>
      <LoginProvider>
        <MainNavigator />
      </LoginProvider>
    </PaperProvider>
  );
}
