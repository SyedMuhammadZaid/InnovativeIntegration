'use client';
import useMessage from '@/Utils/hooks/useMessage';
import React, { useState } from 'react'
import { apiClient } from '@/Utils/apiClient';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import MyForm from '../blog-tiptap-form';

const CreateBlog = () => {

    const { errorMsg, contextHolder, successMsg } = useMessage()
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const blogCreateHandler = async (data: any) => {

        setLoading(true);
        const { previewImageUrl, ...rest } = data;
        let imageUploadRes: any = null;
        let payload;

        // ⬇️ Handle image upload
        if (previewImageUrl && previewImageUrl[0]?.originFileObj) {
            const fileObj = previewImageUrl[0]?.originFileObj;
            const formData = new FormData();
            formData.append("file", fileObj);
            imageUploadRes = await apiClient.post("/image/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }

        payload = {
            ...rest,
            previewImageUrl: imageUploadRes?.url || null,
        }

        try {
            let res: any = await apiClient.post("/blog/create", payload);
            if (res?.success) {
                successMsg('Blog Created Successfully!')
                router.push('/blogs')
            }
        }
        catch (error: any) {
            errorMsg(error?.response?.data?.error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {contextHolder}
            <Spin spinning={loading} fullscreen />
            <MyForm
                submitHandler={blogCreateHandler}
            />
        </div>
    )
}

export default CreateBlog