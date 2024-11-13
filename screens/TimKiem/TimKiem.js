import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Appbar, Card } from 'react-native-paper';

const TimKiem = ({ navigation }) => {
    const categories = [
        { id: 1, image: 'https://via.placeholder.com/150x150', title: 'Fiction' },
        { id: 2, image: 'https://via.placeholder.com/150x150', title: 'Science' },
        { id: 3, image: 'https://via.placeholder.com/150x150', title: 'History' },
        { id: 4, image: 'https://via.placeholder.com/150x150', title: 'Fiction' },
        { id: 5, image: 'https://via.placeholder.com/150x150', title: 'Science' },
        { id: 6, image: 'https://via.placeholder.com/150x150', title: 'History' },
    ];

    const recentBooks = [
        { id: 1, image: 'https://via.placeholder.com/150x200', title: 'Book 1' },
        { id: 2, image: 'https://via.placeholder.com/150x200', title: 'Book 2' },
        { id: 3, image: 'https://via.placeholder.com/150x200', title: 'Book 3' },
        { id: 4, image: 'https://via.placeholder.com/150x200', title: 'Book 4' },
        { id: 5, image: 'https://via.placeholder.com/150x200', title: 'Book 5' },
        { id: 6, image: 'https://via.placeholder.com/150x200', title: 'Book 6' },
    ];

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate('KetQuaTimKiem', { query: searchQuery });
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
                <Appbar.Content title="Tìm Kiếm" titleStyle={styles.headerTitle} />
                <Appbar.Action />
            </Appbar.Header>

            {/* Thanh tìm kiếm */}
            <View style={styles.searchBox}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sách..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Nút tìm kiếm ở giữa */}
            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handleSearch} style={styles.searchButton}>
                    Tìm kiếm
                </Button>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Chuyên Mục</Text>
                <FlatList
                    data={categories}
                    horizontal
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
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sách Đề Xuất</Text>
                <FlatList
                    data={recentBooks}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card style={styles.card} onPress={() => navigation.navigate('ReadBook')}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <Card.Content>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
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
        marginTop: 15
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
