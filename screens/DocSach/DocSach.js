import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DocSach = ({ navigation }) => {
  const [pdfUri, setPdfUri] = useState('https://www.pdf995.com/samples/pdf.pdf'); // URL mặc định của PDF

  // Khi component mount, kiểm tra trạng thái đã lưu
  useEffect(() => {
    const loadSavedPage = async () => {
      const savedUri = await AsyncStorage.getItem('lastPdfPage');
      if (savedUri) {
        setPdfUri(savedUri);
      }
    };
    loadSavedPage();
  }, []);

  // Lưu trạng thái PDF mỗi khi URL thay đổi
  const saveCurrentPage = async (newUri) => {
    try {
      await AsyncStorage.setItem('lastPdfPage', newUri);
    } catch (error) {
      console.error('Lỗi khi lưu trạng thái PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
        <Appbar.Content title="Sách Mẫu - Tập 1" titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon="bookmark-outline"
          onPress={() => alert('Chức năng đánh dấu trang sẽ thêm sau.')}
          color="#FFFFFF"
        />
      </Appbar.Header>

      {/* WebView hiển thị file PDF */}
      <WebView
        source={{ uri: pdfUri }}
        javaScriptEnabled={true}
        onNavigationStateChange={(navState) => {
          saveCurrentPage(navState.url); // Lưu URL trang hiện tại
        }}
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
