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
            name="addContact"
            autoComplete="off"
            onFinish={(e) => handleConfirm({...e})}
            initialValues={initialValue}
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
    );
};

export default AddContactForm;