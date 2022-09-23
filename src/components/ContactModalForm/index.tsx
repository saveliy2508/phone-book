import React, {FC, RefObject} from 'react';
import {Button, Form, Input} from "antd";

import './style.scss';

import {ContactItem, IUser} from "../../redux/slices/contacts/types";

type ContactFormProps = {
    handleConfirm: ({id, phone, email, name}: ContactItem) => void,
    initialValue: IUser,
    submitButtonText: string
}

const ContactForm: FC<ContactFormProps> = ({handleConfirm, initialValue, submitButtonText}) => {
    const formRef = React.useRef<HTMLFormElement>(null)

    React.useEffect(() => {
        formRef.current?.setFieldsValue(initialValue);
    }, [initialValue]);

    return (
        <Form
            name="addContact"
            autoComplete="off"
            onFinish={(e) => handleConfirm({...e})}
            ref={formRef as RefObject<any>}
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
                    {submitButtonText}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ContactForm;