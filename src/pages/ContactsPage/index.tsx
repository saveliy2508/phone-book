import React, {useCallback, useMemo} from 'react';
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {Button, Input, List, Spin} from "antd";
import {CloseOutlined, EditOutlined, UserOutlined} from '@ant-design/icons';
import {addNewContact, deleteContact, fetchContacts} from "../../redux/slices/contacts/asyncActions";
import {setQuery} from "../../redux/slices/contacts/slice";
import ModalComponent from '../../components/Modal'
import {IUser} from "../../redux/slices/contacts/types";

const ContactsPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {items, query, waiting} = useSelector(({contactsSlice}: RootState) => contactsSlice)

    const callbacks = {
        fetchContacts: useCallback(() => dispatch(fetchContacts()), [])
    }

    React.useEffect(() => {
        dispatch(() => callbacks.fetchContacts())
    }, []);

    const options = {
        items: useMemo(() => items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).reverse(), [items, query]),
    }

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleAddContact = ({phone, email, name}: IUser) => {
        dispatch(addNewContact({phone, email, name}))
    }

    const handleDeleteContact = (id: number) => {
        dispatch(deleteContact(id))
    }

    return (
        <>
            <header className='contacts_header'>
                <ModalComponent handleAddContact={handleAddContact} isModalOpen={isModalOpen}
                                setIsModalOpen={() => setIsModalOpen(false)}/>
                <div className='contacts_controls'>
                    <h2 className='contacts_title'>Contacts</h2>
                    <Button type='primary' onClick={() => setIsModalOpen(!isModalOpen)}>Add new contacts</Button>
                </div>
                <div className='contacts_filter'>
                    <Input
                        onChange={(e) => dispatch(setQuery(e.target.value))}
                        prefix={<UserOutlined/>}
                        size="large"
                        placeholder="Search by name..."
                    />
                </div>
            </header>
            <div
                className="contacts_list"
            >
                {!waiting ? <List
                    dataSource={options.items}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <div className='contacts_itemList'>
                                <div>{item.name}</div>
                                <div>{item.phone}</div>
                                <div>{item.email}</div>
                                <div className='contacts_controlItem'>
                                    <CloseOutlined onClick={() => handleDeleteContact(item.id)}/>
                                    <EditOutlined/>
                                </div>
                            </div>
                        </List.Item>
                    )}
                /> : <Spin/>}
            </div>
        </>
    );
};

export default ContactsPage;
