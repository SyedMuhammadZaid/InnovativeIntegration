'use client'
import { apiClient } from '@/Utils/apiClient'
import { ActionType } from '@/Utils/constants'
import useMessage from '@/Utils/hooks/useMessage'
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'


interface CareerModalInterface {
    openCareerModal: boolean,
    setOpenCareerModal: React.Dispatch<React.SetStateAction<boolean>>,
    careerType: string,
    editData: any,
    fetchRecords: React.Dispatch<React.SetStateAction<boolean>>,
    key: number | string,
    isRefresh: boolean
}

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

const CareerModal = (
    { openCareerModal, setOpenCareerModal, careerType, editData, fetchRecords, isRefresh }: CareerModalInterface
) => {

    const [form] = Form.useForm();
    const { successMsg, errorMsg, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                title: editData.title,
                tagline: editData.tagline,
            });
        }
    }, [editData, form]);


    const careerSubmitHandler = async (data: any) => {
        setLoading(true);
        try {
            if (careerType == ActionType.add) {
                let res: any = await apiClient.post("/career/create", data);
                if (res?.success) {
                    successMsg('Career Created Successfully!')
                }
            } else {
                let res: any = await apiClient.put(`/career/update/${editData.id}`, data);
                if (res?.success) {
                    successMsg('Career Updated Successfully!')
                }
            }
            form.resetFields()
            setOpenCareerModal(false);
            fetchRecords(!isRefresh);
        }
        catch (error: any) {
            errorMsg(error?.response?.data?.error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={careerType == ActionType.add ? 'Add Career' : 'Edit Career'}
                centered
                onCancel={() => {
                    setOpenCareerModal(false);
                    form.resetFields()
                }}
                open={openCareerModal}
                footer={false}
                maskClosable={false}  // 👈 disables closing by clicking outside
                keyboard={false}      // 👈 disables closing with ESC key
                destroyOnHidden={true}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >

                <Form
                    {...formItemLayout}
                    form={form}
                    variant={'filled'}
                    onFinish={careerSubmitHandler}
                    initialValues={{ variant: 'filled' }}
                    className='flex items-center justify-center'>
                    <Row className='w-full' justify={'space-between'}>
                        <Col span={24}>
                            <Form.Item label="Job Name" name="title" rules={[{ required: true, message: 'Please input!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Description"
                                name="tagline"
                            // rules={[{ required: true, message: 'Please input!' }]}
                            >
                                <Input.TextArea rows={5} />
                            </Form.Item>
                        </Col>
                        <Col span={24} className='w-full'>
                            <Form.Item style={{ margin: 0 }} className='flex justify-end'>
                                <Button loading={loading} className='primary-btn' size='large' type="primary" htmlType="submit">
                                    {careerType == ActionType.add ? 'Create Job' : 'Edit Job'}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default CareerModal