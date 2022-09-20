export type ContactItem = {
    id: number,
    name: string,
    email: string,
    phone: string
}

export interface ContactsSliceState {
    items: ContactItem[],
    waiting: boolean,
    page: number,
    query: string
}

export interface IUser {
    name: string,
    email: string,
    phone: string
}