import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Appbar, Card } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';

const API_URL = 'http://10.0.2.2:8000/api/';
const BASE_URL = API_URL.split('/api/')[0];
const TimKiem = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategories = async (search = "") => {
        try {
            const response = await axios.get(`${API_URL}categories?limit=6&search=${search}`);
            setCategories(response.data);
        } catch (error) {
            console.error('Lỗi khi tải chuyên mục:', error);
        }
    };

    const fetchBooks = async (search = "") => {
        try {
            const response = await axios.get(`${API_URL}books?limit=12&search=${search}`);
            setBooks(response.data);
        } catch (error) {
            console.error('Lỗi khi tải sách mới:', error);
        }
    };

    const fetchRecommendBook = async () => {
        try {
            const response = await axios.get(`${API_URL}recommendBook`);
            setBooks(response.data);
        } catch (error) {
            console.error('Lỗi khi tải sách gợi ý:', error);
        }
    };

    const fetchAllData = async () => {
        setIsLoading(true); // Bật trạng thái loading
        try {
            await Promise.all([
                fetchCategories(),
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

    const handleSearch = async (search) => {
        setSearchQuery(search);
        fetchCategories(search);
        fetchBooks(search)
    };

    return (
        <ScrollView style={styles.container}>
            <Spinner
                visible={isLoading} // Hiển thị spinner khi isLoading === true
                style={{ flex: 1, color: '#f2f2f2'}}
            />

            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
                <Appbar.Content title="Tìm Kiếm" titleStyle={styles.headerTitle} />
                <Appbar.Action />
            </Appbar.Header>

            {/* Thanh tìm kiếm */}
            <View style={styles.searchBox}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm ..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {
                categories.length >= 1 ?
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Chuyên Mục</Text>
                        <FlatList
                            data={categories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('CategoryBook', {id: item.MaChuyenMuc})}>
                                    <Image source={{ uri: `${BASE_URL}${item.HinhAnh}` }} style={styles.categoryImage} resizeMode="stretch"/>
                                    <Text style={styles.categoryTitle}>{item.TenChuyenMuc}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.MaChuyenMuc.toString()}
                        />
                    </View>
                :
                    null
            }
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{ !searchQuery ? "Sách Đề Xuất" : "Sách Tìm Kiếm" }</Text>
                {
                    books.length <= 0 && !isLoading ?
                        <Text style={{ textAlign: 'center' }}>Không tìm thấy sách nào!</Text>
                    :
                        <FlatList
                            data={books}
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
        </ScrollView>
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
    },
    searchBox: {
        marginTop: 15,
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    searchInput: {
        height: 45,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        alignItems: 'center', // Đặt nút tìm kiếm vào giữa
        paddingBottom: 20,
    },
    searchButton: {
        width: '50%', // Đặt chiều rộng nút tìm kiếm
    },

    section: {
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        flex: 1, // Cho phép Card chiếm diện tích theo kích thước màn hình
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    cardImage: {
        width: 150,
        height: 200,
    },
    cardTitle: {
        fontSize: 14,
        marginVertical: 5,
        marginTop: 15
    },
    sectionCategory: {
        marginTop: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    cardImageCategory:{
        height: 250,
    },
    cardTitle: {
        fontSize: 14,
        marginVertical: 5,
        marginTop: 15,
        fontWeight: 'bold'
    },
    category: {
        alignItems: 'center',
        marginRight: 10,
    },
    categoryImage: {
        width: 150,
        height: 150,
    },
    categoryTitle: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TimKiem;
