'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { apiClient } from '@/Utils/apiClient';
import useMessage from '@/Utils/hooks/useMessage';
import { useRouter } from 'next/navigation';


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};

const LoginPage = () => {

    const [form] = Form.useForm();
    const { successMsg, errorMsg, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const onFinish = async (values: any) => {
        const payload = {
            email: values?.email,
            password: values?.password
        }
        try {
            setLoading(true)
            let res: any = await apiClient.post('/login', payload);
            if (res?.success) {
                localStorage.setItem("token", res?.data?.token);
                localStorage.setItem("user", JSON.stringify(res?.data?.user));
                successMsg('Login Successfully!');
                router.push('/home')
            }
            console.log(res)
        } catch (error: any) {
            errorMsg(error?.response?.data?.error)
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {contextHolder}
            <Row className="min-h-screen">
                {/* Left Side - Image and Branding */}
                <Col xs={0} md={12} className="relative overflow-hidden">
                    <div className="h-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex flex-col justify-center items-center p-8 relative">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
                            <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
                            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
                        </div>

                        {/* Main Content */}
                        <div className="relative z-10 text-center text-white">
                            {/* Security Icon/Image Placeholder */}
                            <div className="mb-8">
                                <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="!text-white !mb-4 text-2xl font-semibold">
                                Innovative Integration Portal
                            </h1>
                            <p className="text-blue-100 text-lg block mb-6">
                                Your data security is our top priority. Access your dashboard with confidence.
                            </p>

                            {/* Features List */}
                            {/* <div className="space-y-3 text-justify mx-auto flex flex-col justify-start items-center border w-full">
                                {[
                                    '🔒 End-to-end encryption',
                                    '🛡️ Multi-factor authentication',
                                    '📊 Real-time monitoring',
                                    '🔐 Advanced security protocols'
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 text-blue-100">
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    </div>
                </Col>

                {/* Right Side - Login Form */}
                <Col xs={24} md={12} className="flex items-center justify-center p-8">
                    <div className="w-full max-w-md mx-auto mt-[60px]">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="!text-gray-800 !mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600 text-base">
                                Sign in to your account to continue
                            </p>
                        </div>

                        {/* Login Form */}
                        <Form
                            {...formItemLayout}
                            variant={'filled'}
                            initialValues={{ variant: 'filled' }}
                            form={form}
                            name="login"
                            onFinish={onFinish}
                            layout="vertical"
                            size="large"
                            className="space-y-4"
                        >
                            <Form.Item
                                name="email"
                                label={<span className="text-gray-700 font-medium">Email Address</span>}
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="text-gray-400" />}
                                    placeholder="Enter your email"
                                    className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label={<span className="text-gray-700 font-medium">Password</span>}
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="Enter your password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    className="h-12 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
                                />
                            </Form.Item>

                            {/* Remember Me & Forgot Password */}
                            {/* <div className="flex items-center justify-between mb-6">
                                <Form.Item name="remember" valuePropName="checked" className="!mb-0">
                                    <Checkbox className="text-gray-600">Remember me</Checkbox>
                                </Form.Item>
                                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                    Forgot password?
                                </a>
                            </div> */}

                            {/* Login Button */}
                            <Form.Item className="!mb-6">
                                <Button
                                    type='primary'
                                    htmlType="submit"
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 rounded-lg font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
                                    loading={loading}
                                >
                                    Sign In
                                </Button>
                            </Form.Item>

                            {/* Divider */}
                            {/* <Divider className="!my-6">
                                <span className="text-gray-500 text-sm">Or continue with</span>
                            </Divider> */}

                            {/* Social Login Buttons */}
                            {/* <div className="grid grid-cols-2 gap-3">
                                <Button
                                    className="h-12 border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </Button>
                                <Button
                                    className="h-12 border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </Button>
                            </div> */}

                            {/* Sign Up Link */}
                            {/* <div className="text-center mt-6">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                        Sign up here
                                    </a>
                                </p>
                            </div> */}
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
