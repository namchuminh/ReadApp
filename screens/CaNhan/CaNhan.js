import React, {useContext} from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { LoginContext } from '../../context/LoginContext';

const CaNhan = ({ navigation }) => {
    const { logout } = useContext(LoginContext);
    const handleLogout = () => {
        logout();
    };
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
                <Appbar.Content title="Nguyễn Văn An" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="square-edit-outline" onPress={() => navigation.navigate('Home')} color="#FFFFFF" />
            </Appbar.Header>

            {/* Avatar Image */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Thay đổi URL hình ảnh avatar ở đây
                    style={styles.avatar}
                />
            </View>

            {/* Thông Tin cá nhân */}
            <Text style={styles.sectionTitle}>Thông Tin Cá Nhân</Text>
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Họ Tên:</Text>
                    <Text style={styles.infoText}>Nguyễn Văn A</Text>
                </View>
                <View style={styles.separator}></View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tài Khoản:</Text>
                    <Text style={styles.infoText}>nguyenvana</Text>
                </View>
                <View style={styles.separator}></View>

                <View style={styles.row}>
                    <Text style={styles.label}>Số Điện Thoại:</Text>
                    <Text style={styles.infoText}>0123456789</Text>
                </View>
                <View style={styles.separator}></View>

                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.infoText}>nguyenvana@example.com</Text>
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
        borderWidth: 3,
        borderColor: '#3F51B5',
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
