import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet, View, FlatList, Text } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api/';
const BASE_URL = API_URL.split('/api/')[0];

const LoaiSach = ({ route, navigation }) => {
    const { id } = route.params;

    const [books, setBooks] = useState([]); // Danh sách sách đã tải
    const [limit, setLimit] = useState(6); // Số lượng sách tải mỗi lần
    const [totalBooks, setTotalBooks] = useState(0); // Tổng số sách
    const [loading, setLoading] = useState(false); // Trạng thái tải
    const [name, setName] = useState(''); // Tên chuyên mục

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_URL}bookByCategory?limit=${limit}&MaChuyenMuc=${id}`
            );

            const { books: newBooks, totalBooks, categoryName } = response.data;

            // Thêm sách mới vào danh sách cũ
            setBooks(newBooks);
            setTotalBooks(totalBooks); // Cập nhật tổng số sách
            setLoading(false);
            setName(categoryName)
        } catch (error) {
            console.error('Lỗi khi tải sách:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(); // Tải sách mỗi khi `limit` thay đổi
    }, [limit]); // Tải sách mới khi `limit` thay đổi

    const handleLoadMore = () => {
        // Kiểm tra nếu còn sách để tải thêm
        if (limit < totalBooks && !loading) {
            setLimit(limit + 6); // Tăng limit để tải thêm sách
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action
                    icon="home"
                    onPress={() => navigation.navigate('Home')}
                    color="#FFFFFF"
                />
                <Appbar.Content title={name} titleStyle={styles.headerTitle} />
                <Appbar.Action
                    icon="magnify"
                    onPress={() => navigation.navigate('Search')}
                    color="#FFFFFF"
                />
            </Appbar.Header>

            <View style={styles.sectionCategory}>
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

                {/* Nút Xem Thêm Sách */}
                {books.length < totalBooks && !loading && (
                    <View style={styles.loadMoreContainer}>
                        <Text onPress={handleLoadMore} style={{ color: '#3F51B5', fontWeight: '400' }}>
                            Xem Thêm Sách
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    sectionCategory: {
        marginTop: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    card: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    cardImageCategory: {
        height: 250,
    },
    cardTitle: {
        fontSize: 14,
        marginVertical: 5,
        marginTop: 15,
        fontWeight: 'bold',
    },
    loadMoreContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#3F51B5',
    },
    headerTitle: {
        color: '#FFFFFF',
    },
});

export default LoaiSach;
