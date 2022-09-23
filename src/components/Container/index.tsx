import React, {FC, ReactNode} from 'react';

import './style.scss'

type ContainerProps = {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({children}) => {
    return (
        <div className='container'>
            {children}
        </div>
    );
};

export default Container;