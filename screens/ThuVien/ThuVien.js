import React from 'react';
import { ScrollView, Image, StyleSheet, View, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Appbar, IconButton } from 'react-native-paper';

const ThuVien = ({navigation}) => {
    // Dữ liệu mẫu cho các sách trong thư viện
    const booksInLibrary = [
        { id: 1, image: 'https://via.placeholder.com/150x200', title: 'Book A' },
        { id: 2, image: 'https://via.placeholder.com/150x200', title: 'Book B' },
        { id: 3, image: 'https://via.placeholder.com/150x200', title: 'Book C' },
        { id: 4, image: 'https://via.placeholder.com/150x200', title: 'Book D' },
        { id: 5, image: 'https://via.placeholder.com/150x200', title: 'Book E' },
        { id: 6, image: 'https://via.placeholder.com/150x200', title: 'Book F' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
                <Appbar.Content title="Thư Viện" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} color="#FFFFFF"/>
            </Appbar.Header>
            
            {/* Hiển thị danh sách sách trong thư viện */}
            <View style={styles.sectionLibrary}>
                <FlatList
                    data={booksInLibrary}
                    numColumns={2} // Hiển thị 2 sách mỗi hàng
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.cardImageLibrary}
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
    cardTitle: {
        fontSize: 14,
        marginVertical: 5,
        marginTop: 15,
    },
    header: {
        backgroundColor: '#3F51B5', // Màu xanh cho header
    },
    headerTitle: {
        color: '#FFFFFF', // Màu chữ trắng
    },
});

export default ThuVien;
