'use client';
import useMessage from '@/Utils/hooks/useMessage';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { apiClient } from '@/Utils/apiClient';
import CaseStudyFrom from '../case-study-form';
import { ActionType } from '@/Utils/constants';

const EditCaseStudy = ({ params }: { params: { id: string } }) => {

    const { id } = params;
    const [selectedCaseStudyRecord, setselectedCaseStudyRecord] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setselectedCaseStudyRecord(JSON.parse(localStorage.getItem('caseStudyRecord')!))
        }
    }, [id]);

    console.log(selectedCaseStudyRecord)

    const { errorMsg, contextHolder, successMsg } = useMessage();

    const caseStudyUpdateHandler = async (data: any) => {

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
            imageUrl: imageUploadRes?.url || selectedCaseStudyRecord?.imageUrl || null,
        }

        try {
            let res: any = await apiClient.put(`/casestudy/update/${id}`, payload);
            if (res?.success) {
                successMsg('Case Study Updated Successfully!')
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
            <CaseStudyFrom
                submitHandler={caseStudyUpdateHandler}
                editData={selectedCaseStudyRecord}
                caseStudyFormType={ActionType.edit}
            />
        </div>
    )
}

export default EditCaseStudy