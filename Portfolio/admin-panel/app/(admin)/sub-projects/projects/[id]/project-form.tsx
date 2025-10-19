'use client';
import { ActionType } from '@/Utils/constants';
import { Button, Col, Form, Input, Row, Upload } from 'antd'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { FaCircleMinus } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";


interface ProjectFormInterface {
    projectFormType: string,
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


const ProjectForm = ({ projectFormType, editData, submitHandler }: ProjectFormInterface) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any>([]);
    const [approachPointers, setapproachPointers] = useState<string[]>([]);
    const [impactPointers, setImpactPointers] = useState<string[]>([]);
    const router = useRouter()

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
                name: editData?.name,
                clientName: editData?.clientName,
                result: editData?.result,
                challenge: editData?.challenge,
                solution: editData?.solution,
                imageUrl: imageFileList,
            })
            setFileList(imageFileList); // ✅ keep Upload in sync
            setapproachPointers(editData?.approach || [])
            setImpactPointers(editData?.impact || [])
        }
    }, [editData, form])

    const projectSubmitHandler = (data: any) => {
        const payload = {
            ...data,
            approach: approachPointers,
            impact: impactPointers
        }
        submitHandler(payload)
    }

    const approachAddHandler = () => {
        let value = form.getFieldValue('approach');
        if (value as string) {
            setapproachPointers(prev => [...prev, value])
            form.setFieldValue('approach', '')
        }
    }

    const impactAddHandler = () => {
        let value = form.getFieldValue('impact');
        if (value as string) {
            setImpactPointers(prev => [...prev, value])
            form.setFieldValue('impact', '')
        }
    }

    const approachRemoveHandler = (index: any) => {
        setapproachPointers(() => {
            let pointers = [...approachPointers];
            pointers.splice(index, 1)
            return pointers
        })
    }

    const impactRemoveHandler = (index: any) => {
        setImpactPointers(() => {
            let pointers = [...impactPointers];
            pointers.splice(index, 1)
            return pointers
        })
    }

    const subProjectRedirectHandler = () => {
        router.back()
    }

    return (
        <Row className='flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
                <IoArrowBackOutline size={25} color='#4a5565' className='cursor-pointer' onClick={subProjectRedirectHandler} />
                <h2 className='primary-heading'>{projectFormType == ActionType.add ? 'Create Project' : 'Edit Project'}</h2>
            </div>
            <Form
                {...formItemLayout}
                form={form}
                variant={'filled'}
                onFinish={projectSubmitHandler}
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
                        <Form.Item label="Title" name="name" rules={[{ required: true, message: 'Please input!' }]}>
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
                            label="Challenge"
                            name="challenge"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea rows={7} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Solution"
                            name="solution"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea rows={7} />
                        </Form.Item>
                    </Col>
                    <Row className='w-full flex items-center'>
                        <Col span={11} className='flex'>
                            <Form.Item
                                label="Approach Points"
                                name="approach"
                                rules={[{ required: approachPointers?.length > 0 ? false : true, message: 'Please input!' }]}
                                className='w-full'
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Button className='inline-block mt-1 ml-4 primary-btn' onClick={approachAddHandler}>Add</Button>
                        </Col>
                        {/* approach pointers */}
                        <Col span={24} className='mt-[-10px] mb-2'>
                            <div className='flex flex-col gap-2'>
                                {
                                    approachPointers?.length > 0 ?
                                        approachPointers.map((result, index) => {
                                            return (
                                                <div className='flex items-center gap-5'>
                                                    <span className='w-[550px] text-wrap break-all'>{result}</span>
                                                    <span>
                                                        <FaCircleMinus className='cursor-pointer' size={20} color='red' onClick={() => approachRemoveHandler(index)} />
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
                            label="Result"
                            name="result"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea rows={5} />
                        </Form.Item>
                    </Col>

                    <Row className='w-full flex items-center'>
                        <Col span={11} className='flex'>
                            <Form.Item
                                label="Impact Points"
                                name="impact"
                                rules={[{ required: impactPointers?.length > 0 ? false : true, message: 'Please input!' }]}
                                className='w-full'
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Button className='inline-block mt-1 ml-4 primary-btn' onClick={impactAddHandler}>Add</Button>
                        </Col>
                        {/* approach pointers */}
                        <Col span={24} className='mt-[-10px] mb-2'>
                            <div className='flex flex-col gap-2'>
                                {
                                    impactPointers?.length > 0 ?
                                        impactPointers.map((result, index) => {
                                            return (
                                                <div className='flex items-center gap-5'>
                                                    <span className='w-[550px] text-wrap break-all'>{result}</span>
                                                    <span>
                                                        <FaCircleMinus className='cursor-pointer' size={20} color='red' onClick={() => impactRemoveHandler(index)} />
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
                    <Col span={24} className='w-full'>
                        <Form.Item style={{ margin: 0 }} className='flex justify-end'>
                            <Button className='primary-btn' size='large' type="primary" htmlType="submit">
                                {projectFormType == ActionType.add ? 'Create Project' : 'Edit Project'}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form >
        </Row >
    )
}

export default ProjectForm