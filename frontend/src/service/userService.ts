import axios from "./api";
import { CartItem } from "../types";
import { UserData } from "../contexts/AuthContext";
import { ReservationFormData } from "../validations/reservation.schema";
import { ContactFormData } from "../validations/contact.schema";

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

export interface ReservationRequest extends ReservationFormData {
    userId: string
}
export interface ContactFormRequest extends ContactFormData {
    userId: string
}
export const placeOrder = async (order: OrderRequest): Promise<GeneralResponse> => {
    try {
        const response = await axios.post('/user/place-order', order);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Order placement failed';
    }
};
export const createReservation = async (reservation: ReservationRequest): Promise<GeneralResponse> => {
    try {
        const response = await axios.post('/user/create-reservation', reservation);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Reservation creation failed';
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


export const contactForm = async (data: ContactFormRequest): Promise<GeneralResponse> => {
    try {
        const response = await axios.post('/user/contact-form', data);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Failed to send contact form';
    }
};