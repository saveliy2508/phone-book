import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

import {AccountData, UserData} from "./types";

/**
 * Отправка логина и пароля для авторизации
 */
export const loginUser = createAsyncThunk(
    'authentication/loginUser',
    async ({email, password} : AccountData) => {
        const {data} = await axios.post(`http://localhost:3001/login`, {email, password})
        return data as UserData
    }
)