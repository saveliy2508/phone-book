import React, {FC, ReactNode} from 'react';
import './style.scss'
import {Modal} from "antd";

type ModalComponent = {
    children: ReactNode,
    isModalOpen: string,
    title: string,
    closeModal: () => void
}

const ModalComponent: FC<ModalComponent> = ({
                                                isModalOpen,
                                                closeModal,
                                                title,
                                                children
                                            }) => {
    return (
        <Modal title={title} open={!!isModalOpen}
               onCancel={closeModal} footer={null}>
            {children}
        </Modal>
    );
};

export default ModalComponent;