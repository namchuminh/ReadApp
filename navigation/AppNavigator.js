import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Các màn hình của bạn
import DangNhap from '../screens/DangNhap/DangNhap';
import DangKy from '../screens/DangNhap/DangKy';
import TrangChu from '../screens/TrangChu/TrangChu';
import LoaiSach from '../screens/LoaiSach/LoaiSach';
import ChuyenMuc from '../screens/LoaiSach/ChuyenMuc';
import TimKiem from '../screens/TimKiem/TimKiem';
import CaNhan from '../screens/CaNhan/CaNhan';
import ThuVien from '../screens/ThuVien/ThuVien';
import DocSach from '../screens/DocSach/DocSach';


// Tạo Stack Navigator cho Đăng Nhập và Đăng Ký
const Stack = createStackNavigator();

// Stack cho Profile
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile">
      {props => <CaNhan {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Login">
      {props => <DangNhap {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Register">
      {props => <DangKy {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const CategoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Category">
      {props => <ChuyenMuc {...props} />}
    </Stack.Screen>
    <Stack.Screen name="CategoryBook">
      {props => <LoaiSach {...props} />}
    </Stack.Screen>
    <Stack.Screen name="ReadBook">
      {props => <DocSach {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home">
      {props => <TrangChu {...props} />}
    </Stack.Screen>
    <Stack.Screen name="CategoryBook">
      {props => <LoaiSach {...props} />}
    </Stack.Screen>
    <Stack.Screen name="ReadBook">
      {props => <DocSach {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Search">
      {props => <TimKiem {...props} />}
    </Stack.Screen>
    <Stack.Screen name="CategoryBook">
      {props => <LoaiSach {...props} />}
    </Stack.Screen>
    <Stack.Screen name="ReadBook">
      {props => <DocSach {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const LibraryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Library">
      {props => <ThuVien {...props} />}
    </Stack.Screen>
    <Stack.Screen name="ReadBook">
      {props => <DocSach {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

// Tạo Bottom Tab Navigator cho các màn hình chính
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#3F51B5',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Trang Chủ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      >
        {props => <HomeStack {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Category"
        options={{
          tabBarLabel: 'Chuyên Mục',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      >
        {props => <CategoryStack {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: 'Tìm Kiếm',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      >
        {props => <SearchStack {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Library"
        options={{
          tabBarLabel: 'Thư Viện',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      >
        {props => <LibraryStack {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Setting"
        options={{
          tabBarLabel: 'Cá Nhân',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      >
        {props => <ProfileStack {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppNavigator;
