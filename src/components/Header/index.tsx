import React, {FC} from 'react';
import './style.scss'
import {Divider, PageHeader} from "antd";

const Header: FC = () => {
    return (
        <header className='header'>
            <PageHeader
                title={<h1>Takeoff test task</h1>}
            />
            <Divider/>
        </header>
    );
};

export default Header;