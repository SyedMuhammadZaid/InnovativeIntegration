import RichTextEditor from "@/components/text-editor";
import { apiClient } from "@/Utils/apiClient";
import useMessage from "@/Utils/hooks/useMessage";
import { Form, Button, Row, Col, Input, Upload } from "antd";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

const MyForm = ({ editData, submitHandler }: { editData?: any, submitHandler: (data: any) => void }) => {

    const [form] = Form.useForm();
    const [editorContent, setEditorContent] = useState<any>(null);
    const [fileList, setFileList] = useState<any>([]);

    const { errorMsg, contextHolder } = useMessage();


    useEffect(() => {
        if (editData) {
            console.log(editData)
            const imageFileList = editData?.previewImageUrl
                ? [
                    {
                        uid: '-1',
                        name: editData.previewImageUrl.split('/').pop() || 'existing_image.png',
                        status: 'done',
                        url: `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${editData.previewImageUrl}`,
                    },
                ]
                : [];

            form.setFieldsValue({
                previewHeading: editData?.previewHeading,
                previewImageUrl: imageFileList
            })

            setFileList(imageFileList); // ✅ keep Upload in sync
            setEditorContent(editData?.description ?? null); // prepopulate JSON for edit
        }

    }, [editData, form]);

    const onFinish = (values: any) => {
        const payload =
        {
            ...values,
            description: editorContent, // JSON format
        }
        submitHandler(payload)
    };

    const imageUploadHandler = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const imageUploadRes: any = await apiClient.post("/image/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return imageUploadRes?.url
        }
        catch (error: any) {
            errorMsg(error?.response?.data?.error)
            console.log(error)
        }
    }

    const handleImageDelete = async (file: string) => {
        try {
            const imageUploadRes: any = await apiClient.delete("/image/delete", { file });
            return imageUploadRes
        }
        catch (error: any) {
            errorMsg(error?.response?.data?.error)
            console.log(error)
        }
    }

    return (
        <>
            {contextHolder}
            <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
                variant={'filled'}
                initialValues={{ variant: 'filled' }}
            >
                <Row className='w-full' justify={'start'}>
                    <Col span={10}>
                        <Form.Item label="Blog Title" name="previewHeading" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="previewImageUrl" // 👈 REQUIRED for AntD to include in form values
                            label="Preview Image"
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
                </Row>

                <Form.Item label="Detailed Content">
                    <RichTextEditor
                        content={editorContent}
                        onChange={setEditorContent}
                        onImageUpload={imageUploadHandler}
                        onImageDelete={handleImageDelete}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>

    );
};

export default MyForm;
