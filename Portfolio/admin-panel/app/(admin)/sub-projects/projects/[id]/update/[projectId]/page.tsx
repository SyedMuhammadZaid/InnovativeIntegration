'use client';
import useMessage from '@/Utils/hooks/useMessage';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiClient } from '@/Utils/apiClient';
import { ActionType } from '@/Utils/constants';
import ProjectForm from '../../project-form';

const EditProject = ({ params }: { params: { projectId: string, id: string } }) => {

    const { projectId, id } = params;
    const [selectedProjectRecord, setselectedProjectRecord] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (projectId) {
            setselectedProjectRecord(JSON.parse(localStorage.getItem('projectRecord')!))
        }
    }, [projectId]);


    const { errorMsg, contextHolder, successMsg } = useMessage();

    const projectUpdateHandler = async (data: any) => {

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
            imageUrl: imageUploadRes?.url || selectedProjectRecord?.imageUrl || null,
        }

        try {
            let res: any = await apiClient.put(`/project/update/${projectId}`, payload);
            if (res?.success) {
                successMsg('Project Updated Successfully!')
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
                submitHandler={projectUpdateHandler}
                editData={selectedProjectRecord}
                projectFormType={ActionType.edit}
            />
        </div>
    )
}

export default EditProject