import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginContext } from '../context/LoginContext';

// Import các màn hình
import DangNhap from '../screens/DangNhap/DangNhap';
import DangKy from '../screens/DangNhap/DangKy';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppNavigator /> // Hiển thị AppNavigator nếu đã đăng nhập
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={DangNhap} />
          <Stack.Screen name="Register" component={DangKy} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
