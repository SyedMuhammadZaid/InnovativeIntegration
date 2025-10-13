import RichTextEditor from "@/components/text-editor";
import { apiClient } from "@/Utils/apiClient";
import useMessage from "@/Utils/hooks/useMessage";
import { Form, Button } from "antd";
import { useState, useEffect } from "react";

const MyForm = ({ editData, submitHandler }: { editData?: any, submitHandler: (data: any) => void }) => {

    const [editorContent, setEditorContent] = useState<any>(null);
    const { errorMsg, contextHolder } = useMessage()

    useEffect(() => {
        if (editData?.detailedContent) {
            console.log(editData?.detailedContent)
            setEditorContent(editData.detailedContent); // prepopulate JSON for edit
        }
    }, [editData]);

    const onFinish = (values: any) => {
        const payload =
        {
            ...values,
            detailedContent: editorContent, // JSON format
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
            <Form layout="vertical" onFinish={onFinish}>

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
