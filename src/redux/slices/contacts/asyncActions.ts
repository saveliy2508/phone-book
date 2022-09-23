import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {ContactItem, IUser} from './types'

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async () => {
        const { data } = await axios.get(
            `http://localhost:3001/contacts`
        )
        return data as ContactItem[]
    }
)

export const addNewContact = createAsyncThunk(
    'contacts/addNewContact',
    async ({phone, email, name}: IUser) => {
        const { data } = await axios.post(`http://localhost:3001/contacts`, {name, phone, email})
        return data as ContactItem
    }
)

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id: number) => {
        await axios.delete(`http://localhost:3001/contacts/${id}`)
        return id
    }
)


export const changeContact = createAsyncThunk(
    'contacts/changeContact',
    async ({id, name, phone, email}: ContactItem) => {
        const { data } = await axios.patch(`http://localhost:3001/contacts/${id}`, {name, phone, email})
        return data
    }
)