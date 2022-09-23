import {createSlice} from '@reduxjs/toolkit'

import {UserSliceState} from "./types";
import {loginUser} from "./asyncActions";

const initialState: UserSliceState = {
    id: 0,
    email: '',
    isAuth: false,
    waiting: false,
    accessToken: '',
    errorMessage: ''
}

export const slice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        /**
         * Восстановление сессии
         */
        restoreSession(state) {
            const userData = localStorage.getItem('userData')
            if (userData) {
                const data = JSON.parse(userData)
                state.id = data.user.id
                state.email = data.user.email
                state.accessToken = data.accessToken
                state.isAuth = true
            }
        },

        /**
         * Завершение сессии
         */
        endSession(state) {
            localStorage.removeItem('userData')
            state.id = 0
            state.email = ''
            state.accessToken = ''
            state.isAuth = false
        },
    },
    extraReducers: (builder) => {
        /**
         * Редюссеры для loginUser
         */
        builder.addCase(loginUser.pending, (state) => {
            state.waiting = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            localStorage.setItem('userData', JSON.stringify(action.payload))
            state.id = action.payload.user.id
            state.email = action.payload.user.email
            state.accessToken = action.payload.accessToken
            state.isAuth = true
            state.waiting = false
            state.errorMessage = ''
        })
        builder.addCase(loginUser.rejected, (state) => {
            state.waiting = false
        })
    }
})

export const {restoreSession, endSession} = slice.actions

export default slice.reducer