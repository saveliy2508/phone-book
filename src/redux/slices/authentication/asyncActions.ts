import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

import {AccountData, UserFulfilledResponse, UserRejectedResponse} from "./types";

/**
 * Отправка логина и пароля для авторизации
 */

export const loginUser = createAsyncThunk(
    'authentication/loginUser',
    async ({email, password}: AccountData) => {
        let responseData;
        await axios.post(`http://localhost:3001/login`, {email, password})
            .then(resp => {
                const {data, status} = resp
                responseData = {data, status}
            })
            .catch(resp => {
                const {data, status} = resp.response
                responseData = {data, status}
            })
        return responseData as unknown as UserRejectedResponse | UserFulfilledResponse
    }
)