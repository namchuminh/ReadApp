import React from 'react';
import { ScrollView, Image, StyleSheet, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Appbar, IconButton } from 'react-native-paper';

const TrangChu = ({navigation}) => {
    // Dữ liệu mẫu
    const banners = [
        { id: 1, image: 'https://via.placeholder.com/400x200', title: 'Banner 1' },
        { id: 2, image: 'https://via.placeholder.com/400x200', title: 'Banner 2' },
        { id: 3, image: 'https://via.placeholder.com/400x200', title: 'Banner 3' },
    ];

    const recentBooks = [
        { id: 1, image: 'https://via.placeholder.com/150x200', title: 'Book 1' },
        { id: 2, image: 'https://via.placeholder.com/150x200', title: 'Book 2' },
        { id: 3, image: 'https://via.placeholder.com/150x200', title: 'Book 3' },
        { id: 4, image: 'https://via.placeholder.com/150x200', title: 'Book 4' },
        { id: 5, image: 'https://via.placeholder.com/150x200', title: 'Book 5' },
        { id: 6, image: 'https://via.placeholder.com/150x200', title: 'Book 6' },
    ];

    const categories = [
        { id: 1, image: 'https://via.placeholder.com/150x150', title: 'Fiction' },
        { id: 2, image: 'https://via.placeholder.com/150x150', title: 'Science' },
        { id: 3, image: 'https://via.placeholder.com/150x150', title: 'History' },
        { id: 4, image: 'https://via.placeholder.com/150x150', title: 'Fiction' },
        { id: 5, image: 'https://via.placeholder.com/150x150', title: 'Science' },
        { id: 6, image: 'https://via.placeholder.com/150x150', title: 'History' },
    ];

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
                    {banners.map((banner) => (
                        <View key={banner.id} style={styles.banner}>
                            <Image
                                source={{ uri: banner.image }}
                                style={styles.bannerImage}
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Sách đăng gần đây */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sách Mới</Text>
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

            {/* Các chuyên mục */}
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
            

            {/* Học Tập: Hiển thị 2 cuốn sách mỗi hàng */}
            <View style={styles.sectionCategory}>
                <Text style={styles.sectionTitle}>Sách Cho Bạn</Text>
                <FlatList
                    data={recentBooks}
                    numColumns={2} // Hiển thị 2 cuốn sách mỗi hàng
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card style={styles.card} onPress={() => navigation.navigate('ReadBook')}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.cardImageCategory}
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

            {/* Sách đăng gần đây */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Đọc Nhiều Nhất</Text>
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
