import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, List, Spin} from "antd";
import {CloseOutlined, EditOutlined, UserOutlined} from '@ant-design/icons';

import './style.scss';

import ModalComponent from '../../components/Modal';

import {addNewContact, changeContact, deleteContact, fetchContacts} from "../../redux/slices/contacts/asyncActions";
import {setQuery} from "../../redux/slices/contacts/slice";
import {AppDispatch, RootState} from "../../redux/store";

import {Modal} from "./types";
import {ContactItem, IUser} from "../../redux/slices/contacts/types";
import ContactForm from "../../components/ContactModalForm";

const ContactsPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {items, query, waiting} = useSelector(({contactsSlice}: RootState) => contactsSlice)

    const [isModalOpen, setIsModalOpen] = useState<Modal>('');
    const [initialValue, setInitialValue] = useState<ContactItem>({id: 0, name: '', phone: '', email: ''});

    const callbacks = {
        handleFetchContacts: useCallback(() => dispatch(fetchContacts()), []),
        handleAddContact: useCallback(({phone, email, name}: IUser) => {
            dispatch(addNewContact({phone, email, name}))
            setIsModalOpen('')
        }, []),
        handleDeleteContact: useCallback((id: number) => {
            dispatch(deleteContact(id))
        }, []),
        handleOpenChangeModal: useCallback(({id, name, phone, email}: ContactItem) => {
            setInitialValue({id, name, phone, email})
            setIsModalOpen('changeModal')
        }, []),
        handleChangeContact: useCallback(({name, phone, email}: ContactItem) => {
            dispatch(changeContact({id: initialValue.id, name, phone, email}))
            setIsModalOpen('')
        }, [initialValue]),
        handleCloseModal: useCallback(() => {
            setIsModalOpen('')
        }, []),
        handleOpenAddContactModal: useCallback(() => {
            setIsModalOpen('addModal')
        }, []),
        handleSetQuery: useCallback((e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setQuery(e.target.value))
        }, [])
    }

    const options = {
        items: useMemo(() => items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).reverse(), [items, query]),
    }

    useEffect(() => {
        callbacks.handleFetchContacts()
    }, []);

    return (
        <div className='contacts_container'>
            <header className='contacts_header'>
                <ModalComponent
                    isModalOpen={isModalOpen}
                    closeModal={callbacks.handleCloseModal}
                    title={isModalOpen === 'addModal' ? 'Add new contact' : `Change contact ${initialValue.name}`}>
                        <ContactForm
                            handleConfirm={
                                isModalOpen === 'addModal' ? callbacks.handleAddContact: callbacks.handleChangeContact}
                            initialValue={isModalOpen === 'addModal' ? {name: '', phone: '', email: ''}: initialValue}
                            submitButtonText={isModalOpen === 'addModal' ? 'Add': 'Change'}
                        />
                </ModalComponent>
                <div className='contacts_controls'>
                    <h2 className='contacts_title'>Contacts</h2>
                    <Button type='primary' onClick={callbacks.handleOpenAddContactModal}>Add new contacts</Button>
                </div>
                <div className='contacts_filter'>
                    <Input
                        onChange={(e) => callbacks.handleSetQuery(e)}
                        prefix={<UserOutlined/>}
                        size="large"
                        placeholder="Search by name..."
                    />
                </div>
            </header>
            <div className="contacts_list">
                {!waiting ? <List
                        dataSource={options.items}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                                <div className='contacts_itemList'>
                                    <div>{item.name}</div>
                                    <div>{item.phone}</div>
                                    <div>{item.email}</div>
                                    <div className='contacts_controlItem'>
                                        <CloseOutlined onClick={() => callbacks.handleDeleteContact(item.id)}/>
                                        <EditOutlined onClick={() => callbacks.handleOpenChangeModal(item)}/>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    /> :
                    <div className="contacts_spinWrapper">
                        <Spin size='large'/>
                    </div>}
            </div>
        </div>
    );
};

export default ContactsPage;
