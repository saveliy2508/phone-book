import React, {useCallback} from 'react';
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";

import './style.scss'

import {loginUser} from "../../redux/slices/authentication/asyncActions";

import {AccountData} from "../../redux/slices/authentication/types";
import {AppDispatch, RootState} from "../../redux/store";
import {clearError} from "../../redux/slices/authentication/slice";

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {errorMessage} = useSelector(({authenticationSlice}: RootState) => authenticationSlice)

    const callbacks = {
        handleLogin: useCallback((values: AccountData) => {
            dispatch(loginUser(values))
        }, []),
        handleClearError: useCallback(() => {
            if (errorMessage) {
                dispatch(clearError())
            }
        }, [errorMessage])
    }

    return (
        <div className='loginPage_container'>
            <Form
                name="loginForm"
                onFinish={callbacks.handleLogin}
                autoComplete="off"
                onChange={callbacks.handleClearError}
                labelCol={{
                    span: 4,
                }}
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
                <div className={'loginPage_errorMessage'}>{errorMessage}</div>
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