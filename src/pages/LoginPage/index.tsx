import React, {useCallback} from 'react';
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";

import './style.scss'

import {loginUser} from "../../redux/slices/authentication/asyncActions";

import {AccountData} from "../../redux/slices/authentication/types";
import {AppDispatch} from "../../redux/store";

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const callbacks = {
        handleLogin: useCallback((values: AccountData) => {
            dispatch(loginUser(values))
        }, [])
    }

    return (
        <div className='loginPage_container'>
            <Form
                name="loginForm"
                onFinish={callbacks.handleLogin}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;