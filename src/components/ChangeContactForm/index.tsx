import React, {FC, RefObject} from 'react';
import './style.scss'
import {Button, Form, Input} from "antd";
import {ContactItem} from "../../redux/slices/contacts/types";

type ChangeContactFormProps = {
    handleConfirm: ({id, phone, email, name}: ContactItem) => void,
    initialValue: { name: string, email: string, phone: string },
}

const ChangeContactForm: FC<ChangeContactFormProps> = ({handleConfirm, initialValue}) => {
    const [form] = Form.useForm()

    const formRef = React.useRef<HTMLFormElement>(null)

    React.useEffect(() => {
        formRef.current?.setFieldsValue(initialValue);
    }, [initialValue]);

    return (
        <Form
            name="changeContact"
            autoComplete="off"
            onFinish={(e) => handleConfirm({...e})}
            ref={formRef as RefObject<any>}
        >
            <Form.Item
                label="Name"
                name="name"
            >
                <Input value={'222'}/>
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
            >
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Change
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangeContactForm;