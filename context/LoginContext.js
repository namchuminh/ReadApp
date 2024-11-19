import React, { createContext, useState } from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

    const login = async (username, password) => {
        try {
            // Gửi yêu cầu POST đến API
            const response = await axios.post("http://10.0.2.2:8000/api/login", {
                username,
                password,
            });
    
            // Xử lý khi đăng nhập thành công
            const { token, message } = response.data;
            console.log("Đăng nhập thành công:", response.data);
    
            // Lưu token vào localStorage (hoặc AsyncStorage nếu dùng React Native)
            await AsyncStorage.setItem("token", token);
    
            setIsLoggedIn(true);
    
        } catch (error) {
            // Xử lý lỗi đăng nhập
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
            }
        }
    };

    const logout = () => setIsLoggedIn(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};
