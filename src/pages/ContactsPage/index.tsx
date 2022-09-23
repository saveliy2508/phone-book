import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {Button, Input, List, Spin} from "antd";
import {CloseOutlined, EditOutlined, UserOutlined} from '@ant-design/icons';
import {addNewContact, changeContact, deleteContact, fetchContacts} from "../../redux/slices/contacts/asyncActions";
import {setQuery} from "../../redux/slices/contacts/slice";
import ModalComponent from '../../components/Modal'
import {ContactItem, IUser} from "../../redux/slices/contacts/types";
import AddContactForm from "../../components/AddContactForm";
import ChangeContactForm from "../../components/ChangeContactForm";

const ContactsPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {items, query, waiting} = useSelector(({contactsSlice}: RootState) => contactsSlice)

    const callbacks = {
        fetchContacts: useCallback(() => dispatch(fetchContacts()), [])
    }

    useEffect(() => {
        dispatch(() => callbacks.fetchContacts())
    }, []);

    const options = {
        items: useMemo(() => items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).reverse(), [items, query]),
    }

    const [isModalOpen, setIsModalOpen] = useState<'addModal' | 'changeModal' | ''>('');

    const [initialValue, setInitialValue] = useState({id: 0, name: '', phone: '', email: ''});

    const handleAddContact = ({phone, email, name}: IUser) => {
        dispatch(addNewContact({phone, email, name}))
    }

    const handleDeleteContact = (id: number) => {
        dispatch(deleteContact(id))
    }

    const handleOpenChangeModal = ({id, name, phone, email}: ContactItem) => {
        setInitialValue({id, name, phone, email})
        setIsModalOpen('changeModal')
    }

    const handleChangeContact = ({name, phone, email}: IUser) => {
        // dispatch(changeContact({id, name, phone, email}))
        // console.log(initialValue.id, name, phone, email)
    }

    console.log(isModalOpen)

    return (
        <>
            <header className='contacts_header'>
                <ModalComponent
                    isModalOpen={isModalOpen}
                    closeModal={() => setIsModalOpen('')}
                    title={isModalOpen === 'addModal' ? 'Add new contact' : `Change contact ${initialValue.name}`}>
                    {isModalOpen === 'addModal' ?
                        <AddContactForm
                            handleConfirm={handleAddContact}
                            initialValue={{name: '', phone: '', email: ''}}/> :
                     isModalOpen === 'changeModal' ?
                         <ChangeContactForm
                            handleConfirm={handleChangeContact}
                            initialValue={initialValue}/>
                         : null}
                </ModalComponent>
                <div className='contacts_controls'>
                    <h2 className='contacts_title'>Contacts</h2>
                    <Button type='primary' onClick={() => setIsModalOpen('addModal')}>Add new contacts</Button>
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
                                    <EditOutlined onClick={() => handleOpenChangeModal(item)}/>
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
