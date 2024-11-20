import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../../context/LoginContext';

const DangNhap = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(LoginContext);

  const handleLogin = () => {
    // Xử lý đăng nhập (giả sử thành công)
    login(username, password);
  };

  return (
    <ImageBackground
      source={require('../../assets/bg-login.jpg')}  // Sửa lại ở đây
      style={styles.container}>
      <Text style={styles.title}>ĐĂNG NHẬP</Text>
      <TextInput
        label="Tài khoản"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Mật khẩu"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Đăng Nhập
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#3F51B5'
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
  link: {
    textAlign: 'center',
    color: '#6200EE',
    marginTop: 15,
  },
});

export default DangNhap;
