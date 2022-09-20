import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {ContactItem, IUser} from './types'

export const fetchMoreContacts = createAsyncThunk(
    'contacts/fetchMoreContacts',
    async (params: {page: number, query: string}) => {
        const {page, query} = params
        const { data } = await axios.get(
            `http://localhost:3001/users?_limit=10&_page=${page}`
        )
        return data as ContactItem[]
    }
)

export const addNewContact = createAsyncThunk(
    'contacts/addNewContact',
    async ({phone, email, name}: IUser) => {
        const { data } = await axios.post(`http://localhost:3001/users`, {name, phone, email})
        return data as ContactItem[]
    }
)