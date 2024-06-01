import { API } from '@constants/index';
import axios, { AxiosResponse } from 'axios';
import { CartInfo } from '../model/internal/cart-info';

const baseUrl = API.dev;

export class CartService {
    static getCart(): Promise<AxiosResponse<CartInfo>> {
        return axios.get(baseUrl + '/api/v1/cart');
    }
}
