import React, {FC} from 'react';
import './style.scss'
import {Button, Divider, PageHeader} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {endSession} from "../../redux/slices/authentication/slice";
import {RootState} from "../../redux/store";

const Header: FC = () => {
    const dispatch = useDispatch()

    const {isAuth} = useSelector(({authenticationSlice}: RootState) => authenticationSlice)

    const handleEndSession = () => {
        dispatch(endSession())
    }

    return (
        <header className='header'>
            <PageHeader
                title={<h1>Takeoff test task</h1>}
                extra={isAuth && <Button type='primary' className={'header_logoutButton'} onClick={handleEndSession}>Logout</Button>}
            />
            <Divider/>
        </header>
    );
};

export default Header;