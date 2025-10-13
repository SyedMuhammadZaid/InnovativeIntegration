'use client';
import React, { useEffect, useState } from 'react'
import MyForm from './event-tiptap-form';
import useMessage from '@/Utils/hooks/useMessage';
import { apiClient } from '@/Utils/apiClient';
import { Spin } from 'antd';

const EventDetail = ({ params }: { params: { id: string } }) => {

    const { id } = params;
    const [selectedEventRecord, setSelectedEventRecord] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setSelectedEventRecord(JSON.parse(localStorage.getItem('eventRecord')!))
        }
    }, [id])

    const { errorMsg, contextHolder, successMsg } = useMessage()

    const eventEditHandler = async (data: any) => {
        const { id, ...rest } = selectedEventRecord;
        const payload = {
            ...rest,
            detailedContent: data?.detailedContent
        }
        try {
            setLoading(true)
            let res: any = await apiClient.put(`/event/update/${id}`, payload);
            if (res?.success) {
                successMsg('Event Updated Successfully!')
            }
        } catch (error: any) {
            errorMsg(error?.response?.data?.error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Spin spinning={loading} fullscreen />
            {contextHolder}
            <MyForm
                submitHandler={eventEditHandler}
                editData={selectedEventRecord}
            />
        </div>
    )
}

export default EventDetail