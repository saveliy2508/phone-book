import React, {ReactNode} from 'react';
import './style.scss'

const Container = ({children}: {children: ReactNode}) => {
    return (
        <div className='container'>
            {children}
        </div>
    );
};

export default Container;