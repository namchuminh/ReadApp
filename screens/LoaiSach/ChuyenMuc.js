import React, {useEffect, useState} from 'react';
import { Image, StyleSheet, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api/';
const BASE_URL = API_URL.split('/api/')[0];

const ChuyenMuc = ({navigation}) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}categories?limit=${1000}`);
            setCategories(response.data);
        } catch (error) {
            console.error('Lỗi khi tải chuyên mục:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
                <Appbar.Content title="Chuyên Mục" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} color="#FFFFFF"/>
            </Appbar.Header>
            
            <View style={styles.section}>
                <FlatList
                    data={categories}
                    numColumns={2} // Hiển thị 2 chuyên mục mỗi hàng
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

        </View>
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
        flex: 1,
        marginTop: 10,
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
        marginTop: 15
    },
    readButton: {
        backgroundColor: '#3F51B5',
    },
    category: {
        flex: 1, // Đảm bảo mỗi chuyên mục chiếm toàn bộ chiều rộng của cột
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 20, // Đảm bảo có khoảng cách giữa các hàng
    },
    categoryImage: {
        width: '100%', // Đảm bảo ảnh chiếm toàn bộ chiều rộng của item
        height: 150, // Cố định chiều cao của ảnh
        borderRadius: 10, // Bo góc cho ảnh
    },
    categoryTitle: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#3F51B5', // Màu xanh cho header
    },
    headerTitle: {
        color: '#FFFFFF', // Màu chữ trắng
    },
});

export default ChuyenMuc;
