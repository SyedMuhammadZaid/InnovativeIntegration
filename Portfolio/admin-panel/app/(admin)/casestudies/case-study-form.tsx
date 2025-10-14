'use client';
import { ActionType } from '@/Utils/constants';
import { Button, Col, Form, Input, Row, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { FaCircleMinus } from "react-icons/fa6";


interface CaseStudyFromInterface {
    caseStudyFormType: string,
    editData?: any,
    submitHandler: (data: any) => void
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


const CaseStudyFrom = ({ caseStudyFormType, editData, submitHandler }: CaseStudyFromInterface) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any>([]);
    const [resultsPointers, setResultPointers] = useState<string[]>([]);

    useEffect(() => {
        if (editData) {
            const imageFileList = editData.imageUrl
                ? [
                    {
                        uid: '-1',
                        name: editData.imageUrl.split('/').pop() || 'existing_image.png',
                        status: 'done',
                        url: `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${editData.imageUrl}`,
                    },
                ]
                : [];
            form.setFieldsValue({
                title: editData?.title,
                clientName: editData?.clientName,
                description: editData?.description,
                challenge: editData?.challenge,
                solution: editData?.solution,
                advantage: editData?.advantage,
                imageUrl: imageFileList,
            })
            setFileList(imageFileList); // ✅ keep Upload in sync
            setResultPointers(editData?.result || [])
        }
    }, [editData, form])

    const caseStudySubmitHandler = (data: any) => {
        const payload = {
            ...data,
            result: resultsPointers
        }
        submitHandler(payload)
    }

    const resultAddHandler = () => {
        let value = form.getFieldValue('result');
        if (value as string) {
            setResultPointers(prev => [...prev, value])
            form.setFieldValue('result', '')
        }
    }

    const resultRemoveHandler = (index: any) => {
        setResultPointers(() => {
            let pointers = [...resultsPointers];
            pointers.splice(index, 1)
            return pointers
        })
    }

    return (
        <Row className='flex flex-col gap-4'>
            <h2 className='primary-heading'>{caseStudyFormType == ActionType.add ? 'Create Case Study' : 'Edit Case Study'}</h2>
            <Form
                {...formItemLayout}
                form={form}
                variant={'filled'}
                onFinish={caseStudySubmitHandler}
                initialValues={{ variant: 'filled' }}
                className='w-full'>

                <Row className='w-full' justify={'space-between'}>
                    <Col span={24}>
                        <Form.Item
                            name="imageUrl" // 👈 REQUIRED for AntD to include in form values
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e && e.fileList.slice(-1)} // ensures only 1 file
                            rules={[{ required: true, message: 'Please select Image!' }]}
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList} // ✅ manually controlled
                                onChange={({ fileList: newList }) => setFileList(newList)} // keep in sync
                                showUploadList={{ showPreviewIcon: false }}
                                maxCount={1}
                                beforeUpload={() => false}
                                accept="image/*"
                            >
                                {/* {fileList.length >= 1 ? null : ( */}
                                <button
                                    type="button"
                                    className="flex flex-col items-center justify-center cursor-pointer"
                                >
                                    <FaPlus />
                                    <div>Upload</div>
                                </button>
                                {/* )} */}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col md={11}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={11}>
                        <Form.Item label="Client Name" name="clientName" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Description"
                            name="description"
                        // rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea rows={5} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Challenge"
                            name="challenge"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea rows={5} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Solution"
                            name="solution"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea rows={5} />
                        </Form.Item>
                    </Col>
                    <Row className='w-full flex items-center'>
                        <Col span={11} className='flex'>
                            <Form.Item
                                label="Result Points"
                                name="result"
                                rules={[{ required: resultsPointers?.length > 0 ? false : true, message: 'Please input!' }]}
                                className='w-full'
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Button className='inline-block mt-1 ml-4 primary-btn' onClick={resultAddHandler}>Add</Button>
                        </Col>
                        {/* result pointers */}
                        <Col span={24} className='mt-[-10px] mb-2'>
                            <div className='flex flex-col gap-2'>
                                {
                                    resultsPointers?.length > 0 ?
                                        resultsPointers.map((result, index) => {
                                            return (
                                                <div className='flex items-center gap-5'>
                                                    <span className='w-[550px] text-wrap break-all'>{result}</span>
                                                    <span>
                                                        <FaCircleMinus className='cursor-pointer' size={20} color='red' onClick={() => resultRemoveHandler(index)} />
                                                    </span>
                                                </div>
                                            )
                                        })
                                        :
                                        <></>
                                }
                            </div>
                        </Col>
                    </Row>
                    <Col span={24}>
                        <Form.Item
                            label="Advantage Of Innovative Integration"
                            name="advantage"
                        // rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea rows={5} />
                        </Form.Item>
                    </Col>

                    <Col span={24} className='w-full'>
                        <Form.Item style={{ margin: 0 }} className='flex justify-end'>
                            <Button className='primary-btn' size='large' type="primary" htmlType="submit">
                                {caseStudyFormType == ActionType.add ? 'Create Case Study' : 'Edit Case Study'}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form >
        </Row >
    )
}

export default CaseStudyFrom