import React from 'react';
import './style.scss'
import {Button, Form, Input, Modal} from "antd";
import {IUser} from "../../redux/slices/contacts/types";

const ModalComponent = ({
                            handleAddContact,
                            isModalOpen,
                            setIsModalOpen
                        }: { handleAddContact: ({phone, email, name}: IUser) => void, isModalOpen: boolean, setIsModalOpen: () => void }) => {
    return (
        <Modal title="Add new contact" open={isModalOpen} onCancel={setIsModalOpen} footer={null}>
            <Form
                name="basic"
                autoComplete="off"
                onFinish={(e) => handleAddContact({...e})}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input name!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input phone!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input email!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalComponent;