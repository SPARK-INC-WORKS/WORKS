import axios from "./api";
import { CartItem } from "../types";
import { UserData } from "../contexts/AuthContext";

export interface OrderRequest {
    userId: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    foodItemList: CartItem[];
    totalPrice: number;
}
export interface GeneralResponse {
    message: string;
    data: any;
}
export const placeOrder = async (order: OrderRequest): Promise<GeneralResponse> => {
    try {
        const response = await axios.post('/user/place-order', order);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Order placement failed';
    }
};

export const getUserDetails = async (userId: string): Promise<UserData> => {
    try {
        const response = await axios.get(`/user/${userId}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Failed to fetch user details';
    }
};