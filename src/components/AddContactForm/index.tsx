import React, {FC, RefObject} from 'react';
import './style.scss'
import {Button, Form, Input} from "antd";
import {ContactItem, IUser} from "../../redux/slices/contacts/types";

type AddContactFormProps = {
    handleConfirm: ({id, phone, email, name}: ContactItem) => void,
    initialValue: IUser,
}

const AddContactForm: FC<AddContactFormProps> = ({handleConfirm, initialValue}) => {
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
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddContactForm;