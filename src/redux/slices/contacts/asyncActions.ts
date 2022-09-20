import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {ContactItem, IUser} from './types'

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async () => {
        const { data } = await axios.get(
            `http://localhost:3001/users`
        )
        return data as ContactItem[]
    }
)

export const addNewContact = createAsyncThunk(
    'contacts/addNewContact',
    async ({phone, email, name}: IUser) => {
        const { data } = await axios.post(`http://localhost:3001/users`, {name, phone, email})
        return data as ContactItem
    }
)

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id: number) => {
        const { data } = await axios.delete(`http://localhost:3001/users/${id}`)
        return id
    }
)


export const changeContact = createAsyncThunk(
    'contacts/changeContact',
    async ({name, phone, }) => {
        const { data } = await axios.patch(`http://localhost:3001/users/${id}`, {name, phone, })
        return id
    }
)