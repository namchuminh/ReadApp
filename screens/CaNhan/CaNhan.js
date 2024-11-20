import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { LoginContext } from '../../context/LoginContext';
import CryptoJS from 'crypto-js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';

const decodeJWT = (token) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT không hợp lệ');
    }
    
    const payload = parts[1];
    const decoded = CryptoJS.enc.Base64.parse(payload);
    return JSON.parse(decoded.toString(CryptoJS.enc.Utf8));
};

const API_URL = 'http://10.0.2.2:8000/api/';
const BASE_URL = API_URL.split('/api/')[0];

const CaNhan = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { logout } = useContext(LoginContext);
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = decodeJWT(token);
        try {
            // Gửi yêu cầu GET đến API
            const response = await axios.get(`${API_URL}profile/${decodedToken.MaNguoiDung}`);
    
            setData(response.data)
    
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
            }
        }
    }

    const fetchAllData = async () => {
        setIsLoading(true); // Bật trạng thái loading
        try {
            await Promise.all([
                fetchData(),
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

            {/* Header */}
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
                <Appbar.Content title="Cá Nhân" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="square-edit-outline" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
            </Appbar.Header>

            {/* Avatar Image */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://i.pinimg.com/736x/ac/67/4d/ac674d2be5f98abf1c189c75de834155.jpg' }} // Thay đổi URL hình ảnh avatar ở đây
                    style={styles.avatar}
                />
            </View>

            {/* Thông Tin cá nhân */}
            <Text style={styles.sectionTitle}>Thông Tin Cá Nhân</Text>
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Họ Tên:</Text>
                    <Text style={styles.infoText}>{data.HoTen}</Text>
                </View>
                <View style={styles.separator}></View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tài Khoản:</Text>
                    <Text style={styles.infoText}>{data.TaiKhoan}</Text>
                </View>
                <View style={styles.separator}></View>

                <View style={styles.row}>
                    <Text style={styles.label}>Số Điện Thoại:</Text>
                    <Text style={styles.infoText}>{data.SoDienThoai}</Text>
                </View>
                <View style={styles.separator}></View>

                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.infoText}>{data.Email}</Text>
                </View>
                <View style={styles.separator}></View>

                <View style={styles.buttonContainer}>
                    <Button title="Đăng Xuất" onPress={() => handleLogout()} color="#FF5722" style={styles.button} />
                </View>
            </View>

            {/* Buttons for Changing Password and Logging Out */}
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
    avatarContainer: {
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    avatar: {
        width: 120,  // Thay đổi kích thước avatar
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
        marginLeft: 10,
    },
    infoContainer: {
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginTop: 10
    },
    row: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,  // Tăng khoảng cách giữa các thông tin
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        fontSize: 16,
        color: '#555',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 15,  // Khoảng cách giữa các gạch ngang
    },
    buttonContainer: {
        paddingHorizontal: 20,
    },
    button: {
        marginBottom: 15,  // Khoảng cách giữa các nút
    },
});

export default CaNhan;
