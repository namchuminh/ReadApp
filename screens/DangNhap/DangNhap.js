import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginTop: 10,
  },
});

export default DangNhap;
