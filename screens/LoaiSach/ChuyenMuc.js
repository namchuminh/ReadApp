import React from 'react';
import { ScrollView, Image, StyleSheet, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Appbar, IconButton } from 'react-native-paper';

const ChuyenMuc = ({navigation}) => {

    const categories = [
        { id: 1, image: 'https://via.placeholder.com/150x150', title: 'Fiction' },
        { id: 2, image: 'https://via.placeholder.com/150x150', title: 'Science' },
        { id: 3, image: 'https://via.placeholder.com/150x150', title: 'History' },
        { id: 4, image: 'https://via.placeholder.com/150x150', title: 'Fiction' },
        { id: 5, image: 'https://via.placeholder.com/150x150', title: 'Science' },
        { id: 6, image: 'https://via.placeholder.com/150x150', title: 'History' },
    ];

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
                        <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('CategoryBook')}>
                            <Image source={{ uri: item.image }} style={styles.categoryImage} />
                            <Text style={styles.categoryTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
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
