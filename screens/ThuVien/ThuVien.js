import React, {useEffect, useState} from 'react';
import { ScrollView, Image, StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { Text, Card, Appbar, Button } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from 'crypto-js';

const API_URL = 'http://10.0.2.2:8000/api/';
const BASE_URL = API_URL.split('/api/')[0];

const decodeJWT = (token) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT không hợp lệ');
    }
    
    const payload = parts[1];
    const decoded = CryptoJS.enc.Base64.parse(payload);
    return JSON.parse(decoded.toString(CryptoJS.enc.Utf8));
};
const ThuVien = ({navigation}) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [bookRecommendBook, setBookRecommendBook] = useState([]);

    const fetchBooks = async () => {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = decodeJWT(token);
        try {
            const response = await axios.get(`${API_URL}library/${decodedToken.MaNguoiDung}`);
            setBooks(response.data.data);
        } catch (error) {
            console.error('Lỗi khi tải sách mới:', error);
        }
    };

    const fetchRecommendBook = async () => {
        try {
            const response = await axios.get(`${API_URL}recommendBook`);
            setBookRecommendBook(response.data);
        } catch (error) {
            console.error('Lỗi khi tải sách gợi ý:', error);
        }
    };

    const fetchAllData = async () => {
        setIsLoading(true); // Bật trạng thái loading
        try {
            await Promise.all([
                fetchBooks(),
                fetchRecommendBook()
            ]);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
        } finally {
            setIsLoading(false); // Tắt trạng thái loading
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [isFocused]);


    return (
        <ScrollView style={styles.container}>
            <Spinner
                visible={isLoading} // Hiển thị spinner khi isLoading === true
                style={{ flex: 1, color: '#f2f2f2'}}
            />
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
                <Appbar.Content title="Thư Viện" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} color="#FFFFFF"/>
            </Appbar.Header>
            
            {/* Hiển thị danh sách sách trong thư viện */}
            <View style={styles.sectionLibrary}>
                {
                    books.length <= 0 && !isLoading ?
                        <>
                            <Text style={styles.emptyText}>Không tìm thấy sách nào trong thư viện!</Text>
                        </>
                    :
                    <FlatList
                        data={books}
                        numColumns={2} // Hiển thị 2 cuốn sách mỗi hàng
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Card
                                style={styles.card}
                                onPress={() => navigation.navigate('ReadBook', { id: item.MaSach })}
                            >
                                <Image
                                    source={{ uri: `${BASE_URL}${item.HinhAnh}` }}
                                    style={styles.cardImageLibrary}
                                    resizeMode="stretch"
                                />
                                <Card.Content>
                                    <Text style={styles.cardTitle}>{item.TenSach.length > 20 ? `${item.TenSach.substring(0, 20)} ...` : item.TenSach}</Text>
                                    <Text style={{ fontSize: 12 }}>{item.TacGia.length > 35 ? `${item.TacGia.substring(0, 35)} ...` : item.TacGia}</Text>
                                </Card.Content>
                            </Card>
                        )}
                        keyExtractor={(item) => item.MaSach}
                    />
                }
            </View>
            
            {
                books.length <= 0 && !isLoading ?
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sách Đề Xuất</Text>
                        {
                            bookRecommendBook.length <= 0 && !isLoading ?
                                <Text style={{ textAlign: 'center' }}>Không tìm thấy sách nào!</Text>
                            :
                                <FlatList
                                    data={bookRecommendBook}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <Card style={styles.card} onPress={() => navigation.navigate('ReadBook', {id: item.MaSach})}>
                                            <Image
                                                source={{ uri: `${BASE_URL}${item.HinhAnh}` }}
                                                style={styles.cardImage}
                                                resizeMode="stretch"
                                            />
                                            <Card.Content>
                                                <Text style={styles.cardTitle}>{item.TenSach.length > 15 ? `${item.TenSach.substring(0, 15)} ...` : item.TenSach}</Text>
                                                <Text style={{ fontSize: 12 }}>{item.TacGia.length > 30 ? `${item.TacGia.substring(0, 30)} ...` : item.TacGia}</Text>
                                            </Card.Content>
                                        </Card>
                                    )}
                                    keyExtractor={(item) => item.MaSach.toString()}
                                />
                        }
                    </View>
                :
                    null
            }
        </ScrollView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    bannerContainer: {
        height: 220,
        marginBottom: 20,
    },
    banner: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerImage: {
        width: '100%',
        height: 200,
    },
    sectionLibrary: {
        marginTop: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    card: {
        flex: 1, // Cho phép Card chiếm diện tích theo kích thước màn hình
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    cardImageLibrary: {
        height: 250,
    },
    cardImage:{
        width: 150,
        height: 200,
    },
    cardTitle: {
        fontSize: 14,
        marginVertical: 5,
        marginTop: 15,
        fontWeight: 'bold'
    },
    header: {
        backgroundColor: '#3F51B5', // Màu xanh cho header
    },
    headerTitle: {
        color: '#FFFFFF', // Màu chữ trắng
    },
    emptyText: {
        fontSize: 16,
        color: '#333', // Màu chữ
        textAlign: 'center', // Căn giữa chữ
        marginTop: 20
    },
    searchButton: {
        backgroundColor: '#3F51B5', // Màu nền nút
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    sectionTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15
    },
    section: {
        marginBottom: 30,
        paddingHorizontal: 10,
    },
});

export default ThuVien;
