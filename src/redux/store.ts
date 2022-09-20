import { configureStore } from '@reduxjs/toolkit'

import contactsSlice from './slices/contacts/slice'

export const store = configureStore({
    reducer: {
        contactsSlice
    }
})

// получение типа всего хранилища
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch