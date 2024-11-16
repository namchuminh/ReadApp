import React, {useEffect, useState} from 'react';
import { ScrollView, Image, StyleSheet, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Appbar, IconButton } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api/';
const BASE_URL = API_URL.split('/api/')[0];

const TrangChu = ({navigation}) => {
    const [slides, setSlides] = useState([]);
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recommendBook, setRecommendBook] = useState([]);
    const [topRead, setTopRead] = useState([]);

    const fetchSlides = async () => {
        try {
            const response = await axios.get(`${API_URL}slides`);
            setSlides(response.data); // Đảm bảo response trả về đúng định dạng danh sách
        } catch (error) {
            console.error('Lỗi khi tải slides:', error);
        }
    };

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}books?limit=6`);
            setBooks(response.data);
        } catch (error) {
            console.error('Lỗi khi tải sách mới:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}categories?limit=6`);
            setCategories(response.data);
        } catch (error) {
            console.error('Lỗi khi tải chuyên mục:', error);
        }
    };

    const fetchRecommendBook = async () => {
        try {
            const response = await axios.get(`${API_URL}recommendBook`);
            setRecommendBook(response.data);
        } catch (error) {
            console.error('Lỗi khi tải sách gợi ý:', error);
        }
    };

    const fetchTopRead = async () => {
        try {
            const response = await axios.get(`${API_URL}topRead`);
            setTopRead(response.data);
        } catch (error) {
            console.error('Lỗi khi tải sách đọc nhiều nhất:', error);
        }
    };

    useEffect(() => {
        fetchSlides();
        fetchBooks();
        fetchCategories();
        fetchRecommendBook();
        fetchTopRead();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
                <Appbar.Content title="Trang Chủ" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} color="#FFFFFF"/>
            </Appbar.Header>

            {/* Banner */}
            <View style={styles.bannerContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                >
                    {slides.map((slide) => (
                        <View key={slide.MaSlide} style={styles.banner}>
                            <Image
                                source={{ uri: `${BASE_URL}${slide.HinhAnh}` }}
                                style={styles.bannerImage}
                                resizeMode="stretch"
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Sách đăng gần đây */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sách Mới</Text>
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
                                <Text style={styles.cardTitle}>{item.TenSach}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    keyExtractor={(item) => item.MaSach.toString()}
                />
            </View>

            {/* Các chuyên mục */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Chuyên Mục</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('CategoryBook', {id: item.MaChuyenMuc})}>
                            <Image source={{ uri: `${BASE_URL}${item.HinhAnh}` }} style={styles.categoryImage} resizeMode="stretch" />
                            <Text style={styles.categoryTitle}>{item.TenChuyenMuc}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.MaChuyenMuc.toString()}
                />
            </View>
            

            {/* Học Tập: Hiển thị 2 cuốn sách mỗi hàng */}
            <View style={styles.sectionCategory}>
                <Text style={styles.sectionTitle}>Sách Cho Bạn</Text>
                <FlatList
                    data={recommendBook}
                    numColumns={2} // Hiển thị 2 cuốn sách mỗi hàng
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card style={styles.card} onPress={() => navigation.navigate('ReadBook', {id: item.MaSach})}>
                            <Image
                                source={{ uri: `${BASE_URL}${item.HinhAnh}` }}
                                style={styles.cardImageCategory}
                                resizeMode="stretch"
                            />
                            <Card.Content>
                                <Text style={styles.cardTitle}>{item.TenSach}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    keyExtractor={(item) => item.MaSach.toString()}
                />
            </View>

            {/* Sách đăng gần đây */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Đọc Nhiều Nhất</Text>
                <FlatList
                    data={topRead}
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
                                <Text style={styles.cardTitle}>{item.TenSach}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    keyExtractor={(item) => item.MaSach.toString()}
                />
                <FlatList
                    data={topRead}
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
                                <Text style={styles.cardTitle}>{item.TenSach}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    keyExtractor={(item) => item.MaSach.toString()}
                />
            </View>
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
        height: '200',
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
    readButton: {
        backgroundColor: '#3F51B5',
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
    header: {
        backgroundColor: '#3F51B5', // Màu xanh cho header
    },
    headerTitle: {
        color: '#FFFFFF', // Màu chữ trắng
    },
});

export default TrangChu;
