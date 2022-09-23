export interface ContactItem {
    id: number,
    name: string,
    email: string,
    phone: string
}

export interface ContactsSliceState {
    items: ContactItem[],
    waiting: boolean,
    query: string
}

export interface IUser {
    name: string,
    email: string,
    phone: string
}