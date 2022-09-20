import React, {useCallback, useMemo} from 'react';
import './style.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";
import {Button, Input, List} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {addNewContact, fetchMoreContacts} from "../../redux/slices/contacts/asyncActions";
import {setQuery} from "../../redux/slices/contacts/slice";
import ModalComponent from '../../components/Modal'
import {IUser} from "../../redux/slices/contacts/types";

const ContactsPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {items, page, query} = useSelector(({contactsSlice}: RootState) => contactsSlice)

    const callbacks = {
        fetchContacts: useCallback(() => dispatch(fetchMoreContacts({page, query})), [page, query],
        ),
    }

    React.useEffect(() => {
        dispatch(() => callbacks.fetchContacts())
    }, []);

    const options = {
        items: useMemo(() => items.filter((item) => item.name.includes(query)), [items, query, page]),
    }

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleAddContact = ({phone, email, name}: IUser) => {
        dispatch(addNewContact({phone, email, name}))
    }

    return (
        <>
            <header className='contacts_header'>
                <ModalComponent handleAddContact={handleAddContact} isModalOpen={isModalOpen} setIsModalOpen={() => setIsModalOpen(false)}/>
                <div className='contacts_controls'>
                    <h2 className='contacts_title'>Contacts</h2>
                    <Button type='primary' onClick={()=>setIsModalOpen(!isModalOpen)}>Add new contacts</Button>
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
                id='scrollableDiv'
                className="contacts_scrollableBlock"
            >
                <InfiniteScroll
                    dataLength={options.items.length}
                    next={callbacks.fetchContacts}
                    hasMore={options.items.length < 10000}
                    loader={<></>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={options.items}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                                <div>{item.name}</div>
                                <div>{item.phone}</div>
                                <div>{item.email}</div>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </>
    );
};

export default ContactsPage;
