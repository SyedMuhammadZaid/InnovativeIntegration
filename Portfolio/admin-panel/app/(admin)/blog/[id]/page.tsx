'use client';
import useMessage from '@/Utils/hooks/useMessage';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import MyForm from '../blog-tiptap-form';
import { apiClient } from '@/Utils/apiClient';

const EditBlog = ({ params }: { params: { id: string } }) => {

    const { id } = params;
    const [selectedBlogRecord, setSelectedBlogRecord] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setSelectedBlogRecord(JSON.parse(localStorage.getItem('blogRecord')!))
        }
    }, [id]);

    console.log(selectedBlogRecord)

    const { errorMsg, contextHolder, successMsg } = useMessage();

    const blogUpdateHandler = async (data: any) => {

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
            previewImageUrl: imageUploadRes?.url || selectedBlogRecord?.previewImageUrl || null,
        }

        try {
            let res: any = await apiClient.put(`/blog/update/${id}`, payload);
            if (res?.success) {
                successMsg('Blog Updated Successfully!')
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
                submitHandler={blogUpdateHandler}
                editData={selectedBlogRecord}
            />
        </div>
    )
}

export default EditBlog