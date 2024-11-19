import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Appbar } from 'react-native-paper';

const DocSach = ({ navigation }) => {
  const [pdfUri, setPdfUri] = useState('http://10.0.2.2:8000/uploads/book/pdf/1731683046775.pdf'); // URL mặc định của PDF

  // Khi component mount, kiểm tra trạng thái đã lưu
  useEffect(() => {

  }, []);


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
