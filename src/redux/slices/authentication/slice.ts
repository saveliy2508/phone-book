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
        clearError(state) {
            state.errorMessage = ''
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
         * (так странно описаны, т.к. не получалось иначе достать сообщение о текущей ошибке)
         */
        builder.addCase(loginUser.pending, (state) => {
            state.waiting = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.status >= 400) {
                    if (typeof action.payload.data === 'string') {
                        state.errorMessage = action.payload.data
                    }
                } else if (action.payload.status >= 200) {
                    localStorage.setItem('userData', JSON.stringify(action.payload.data))
                    if (typeof action.payload.data === 'object') {
                        state.id = action.payload.data.user.id
                        state.email = action.payload.data.user.email
                        state.accessToken = action.payload.data.accessToken
                        state.isAuth = true
                        state.waiting = false
                        state.errorMessage = ''
                    }
                }
            }
        )
        builder.addCase(loginUser.rejected, (state, action) => {
            state.waiting = false
            state.errorMessage = 'Some error'
        })
    }
})

export const {restoreSession, endSession, clearError} = slice.actions

export default slice.reducer