import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {AccountData, UsersData} from "./types";

export const loginUser = createAsyncThunk(
    'authentication/loginUser',
    async ({email, password} : AccountData) => {
        const {data} = await axios.post(`http://localhost:3001/login`, {email, password})
        return data as UsersData
    }
)