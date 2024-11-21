import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Appbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { useIsFocused } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';

const decodeJWT = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('JWT không hợp lệ');
  }

  const payload = parts[1];
  const decoded = CryptoJS.enc.Base64.parse(payload);
  return JSON.parse(decoded.toString(CryptoJS.enc.Utf8));
};

const API_URL = 'http://10.0.2.2:8000/api/';
const BASE_URL = API_URL.split('/api/')[0];

const DocSach = ({ route, navigation }) => {
  const { id } = route.params;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({}); 

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${API_URL}books/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Lỗi khi tải sách gợi ý:', error);
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true); // Bật trạng thái loading
    try {
      await Promise.all([
        fetchBook(),
      ]);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  // Khi component mount, kiểm tra trạng thái đã lưu
  useEffect(() => {
    fetchAllData();
  }, [isFocused]);

  const handleBookMark = async () => {
    const token = await AsyncStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    try {
      // Gửi yêu cầu GET đến API
      const response = await axios.post(`${API_URL}library`, {
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
      <Spinner
        visible={isLoading} // Hiển thị spinner khi isLoading === true
        style={{ flex: 1, color: '#f2f2f2' }}
      />
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
        <Appbar.Content title={data.TenSach} titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon="bookmark-outline"
          onPress={() => handleBookMark()}
          color="#FFFFFF"
        />
      </Appbar.Header>

      {/* WebView hiển thị file PDF */}
      <WebView
        source={{ uri: BASE_URL+data.TepTin }}
        javaScriptEnabled={true}
        originWhitelist={['*']}
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
