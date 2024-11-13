import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const DangNhap = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Xử lý đăng nhập (giả sử thành công)
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
