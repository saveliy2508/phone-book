export interface UserSliceState {
    id: number,
    email: string,
    isAuth: boolean,
    waiting: boolean,
    accessToken: string,
    errorMessage: string
}

export type UserRejectedResponse = {
    status: number,
    data: string
}

export type UserFulfilledResponse = {
    status: number,
    data: {
        user: {
            id: number,
            email: string
        }
        accessToken: string
    }
}

export type AccountData = {
    email: string,
    password: string
}