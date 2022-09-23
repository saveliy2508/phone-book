import React, {FC} from 'react';
import './style.scss'
import {Button, Form, Input} from "antd";
import {ContactItem} from "../../redux/slices/contacts/types";

type AddContactFormProps = {
    handleConfirm: ({id, phone, email, name}: ContactItem) => void,
    initialValue: { name: string, email: string, phone: string },
}

const AddContactForm: FC<AddContactFormProps> = ({handleConfirm, initialValue}) => {
    return (
        <Form
            name="basic"
            autoComplete="off"
            onFinish={(e) => handleConfirm({...e})}
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
                <Input defaultValue={initialValue.name}/>
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
                <Input defaultValue={initialValue.phone}/>
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
                <Input defaultValue={initialValue.email}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddContactForm;