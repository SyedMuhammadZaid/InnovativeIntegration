'use client';
import React, { useState } from 'react'
import { ActionType } from '@/Utils/constants';
import { Spin } from 'antd';
import useMessage from '@/Utils/hooks/useMessage';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/Utils/apiClient';
import ProjectForm from '../project-form';

const CreateProject = ({ params }: { params: { id: string } }) => {

    const { errorMsg, contextHolder, successMsg } = useMessage()
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { id } = params;

    const projectCreateHandler = async (data: any) => {

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
            projectSubCategoryId: Number(id),
            imageUrl: imageUploadRes?.url || null,
        }

        try {
            let res: any = await apiClient.post("/project/create", payload);
            if (res?.success) {
                successMsg('Project Created Successfully!')
                router.back()
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
            <ProjectForm
                projectFormType={ActionType.add}
                submitHandler={projectCreateHandler}
            />
        </div>
    )
}

export default CreateProject