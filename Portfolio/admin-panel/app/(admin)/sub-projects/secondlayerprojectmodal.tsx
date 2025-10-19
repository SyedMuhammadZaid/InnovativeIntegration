import { apiClient } from '@/Utils/apiClient';
import { ActionType, ParentLayerProjects } from '@/Utils/constants';
import useMessage from '@/Utils/hooks/useMessage';
import { Button, Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';


interface subProjectModalInterface {
    openProjectModal: boolean,
    setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>,
    projectType: string,
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

const SecondLayerProjectModal = (
    { openProjectModal, setOpenProjectModal, projectType, editData, fetchRecords, isRefresh }: subProjectModalInterface
) => {

    const [form] = Form.useForm();
    const { successMsg, errorMsg, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any>([]);

    const projectSubmitHandler = async (data: any) => {

        setLoading(true);
        const { imageUrl, ...rest } = data;
        let imageUploadRes: any = null;
        let payload;

        // ⬇️ Handle image upload
        if (imageUrl && imageUrl[0]?.originFileObj) {
            const fileObj = imageUrl[0]?.originFileObj;
            const formData = new FormData();
            formData.append("file", fileObj);
            imageUploadRes = await apiClient.post("/image/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }

        payload = {
            ...rest,
            mainCategoryId: String(data?.mainCategoryId),
            imageUrl: imageUploadRes?.url || editData?.imageUrl || null,
        };

        try {
            if (projectType == ActionType.add) {

                let res: any = await apiClient.post("/project/sub-project/create", payload);
                if (res?.success) {
                    successMsg('Sub Project Created Successfully!')
                }
            } else {
                let res: any = await apiClient.put(`/project/sub-project/update/${editData.id}`, payload);
                if (res?.success) {
                    successMsg('Sub Project Updated Successfully!')
                }
            }
            form.resetFields()
            setOpenProjectModal(false);
            fetchRecords(!isRefresh);
        }
        catch (error: any) {
            errorMsg(error?.response?.data?.error)
        }
        finally {
            setLoading(false)
        }

    };

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
                name: editData.name,
                imageUrl: imageFileList,
                mainCategoryId: Number(editData.mainCategoryId)
            });
            setFileList(imageFileList); // ✅ keep Upload in sync
        }
    }, [editData, form]);

    return (
        <>
            {contextHolder}
            <Modal
                title={projectType == ActionType.add ? 'Add Sub Project' : 'Edit Sub Project'}
                centered
                onCancel={() => {
                    setOpenProjectModal(false);
                    form.resetFields()
                }}
                open={openProjectModal}
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
                    onFinish={projectSubmitHandler}
                    initialValues={{ variant: 'filled' }}
                    className='flex items-center justify-center'>
                    <Row className='w-full' justify={'space-between'}>
                        <Col md={11}>
                            <Form.Item label="Sub Project Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col md={11}>
                            <Form.Item
                                label="Parent Project"
                                name="mainCategoryId"
                                getValueProps={(value) => ({ value })} // ✅ ensures value is kept
                                preserve
                                rules={[{ required: true, message: 'Please select!' }]}
                            >
                                <Select
                                    options={ParentLayerProjects} />
                            </Form.Item>
                        </Col>

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

                        <Col span={24} className='w-full'>
                            <Form.Item style={{ margin: 0 }} className='flex justify-end'>
                                <Button loading={loading} className='primary-btn' size='large' type="primary" htmlType="submit">
                                    {projectType == ActionType.add ? 'Create Sub Project' : 'Edit Sub Project'}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>

    )
}
export default SecondLayerProjectModal