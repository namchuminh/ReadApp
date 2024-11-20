import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Appbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CryptoJS from 'crypto-js';

const decodeJWT = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
      throw new Error('JWT không hợp lệ');
  }
  
  const payload = parts[1];
  const decoded = CryptoJS.enc.Base64.parse(payload);
  return JSON.parse(decoded.toString(CryptoJS.enc.Utf8));
};

const DocSach = ({ route, navigation }) => {
  const [pdfUri, setPdfUri] = useState('http://10.0.2.2:8000/uploads/book/pdf/1731683046775.pdf'); // URL mặc định của PDF
  const { id } = route.params;

  // Khi component mount, kiểm tra trạng thái đã lưu
  useEffect(() => {
    console.log(id)
  }, []);

  const handleBookMark = async () => {
    const token = await AsyncStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    try {
        // Gửi yêu cầu GET đến API
        const response = await axios.post(`http://10.0.2.2:8000/api/library`, {
          MaNguoiDung: decodedToken.MaNguoiDung,
          MaSach: id
        });

        alert(response.data.message)

    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
        }
    }
  }

  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
        <Appbar.Content title="Sách Mẫu - Tập 1" titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon="bookmark-outline"
          onPress={() => handleBookMark()}
          color="#FFFFFF"
        />
      </Appbar.Header>

      {/* WebView hiển thị file PDF */}
      <WebView
        source={{ uri: 'http://10.0.2.2:8000/uploads/book/pdf/1731683046775.pdf' }}
        javaScriptEnabled={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#3F51B5',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  webview: {
    flex: 1,
  },
});

export default DocSach;
