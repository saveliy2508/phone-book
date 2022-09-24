import React, {FC} from 'react';
import {Button, Divider, PageHeader} from "antd";

import './style.scss'

type HeaderProps = {
    isAuth: boolean,
    handleEndSession: () => void
}

const Header: FC<HeaderProps> = ({isAuth, handleEndSession}) => {
    return (
        <header className='header'>
            <PageHeader
                title={<h1>Takeoff test task</h1>}
                extra={isAuth &&
                  <Button type='primary' className='header_logoutButton' onClick={handleEndSession}>Logout</Button>}
            />
            <Divider/>
        </header>
    );
};

export default React.memo(Header);