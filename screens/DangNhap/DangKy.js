import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../../context/LoginContext';
import axios from "axios";

const DangKy = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login } = useContext(LoginContext);

  // Hàm validate tài khoản
  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]+$/; // Kiểm tra tài khoản chỉ bao gồm chữ và số, không có dấu cách
    return regex.test(username);
  };

  // Hàm validate email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  // Hàm validate số điện thoại
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(0[3|5|7|8|9])([0-9]{8})$/; // Kiểm tra số điện thoại Việt Nam (10-11 chữ số)
    return regex.test(phoneNumber);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    if (!validateUsername(username)) {
      alert("Tài khoản không hợp lệ!");
      return;
    }

    if (!validateEmail(email)) {
      alert("Email không hợp lệ.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert("Số điện thoại không hợp lệ.");
      return;
    }

    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post("http://10.0.2.2:8000/api/register", {
        HoTen: name,
        TaiKhoan: username,
        SoDienThoai: phoneNumber,
        Email: email,
        MatKhau: password,
      });

      login(username, password);
    } catch (error) {
      // Xử lý lỗi đăng ký
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo Tài Khoản</Text>

      {/* Họ tên */}
      <TextInput
        label="Họ và Tên"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
        mode="outlined"
      />

      {/* Tài khoản */}
      <TextInput
        label="Tài khoản"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
        mode="outlined"
      />

      {/* Số điện thoại */}
      <TextInput
        label="Số điện thoại"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
      />

      {/* Email */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
      />

      {/* Mật khẩu */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />

      {/* Xác nhận mật khẩu */}
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />

      {/* Nút Đăng Ký */}
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Đăng Ký
      </Button>

      {/* Nút quay về */}
      <Button
        mode="text"
        onPress={() => navigation.navigate('Login')}
        style={styles.backButton}
      >
        Quay về Đăng Nhập
      </Button>
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
  backButton: {
    marginTop: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  genderLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
  },
});

export default DangKy;
