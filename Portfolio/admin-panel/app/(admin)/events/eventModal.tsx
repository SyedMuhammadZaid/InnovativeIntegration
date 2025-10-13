import { ActionType } from '@/Utils/constants'
import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Segmented, Select, TimePicker, Upload } from 'antd'
import { FaPlus } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import { apiClient } from '@/Utils/apiClient';
import { eventStatus } from '@innovative-integration/shared';
import moment from 'moment';
import useMessage from '@/Utils/hooks/useMessage';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface EventModalInterface {
    openEventModal: boolean,
    setOpenEventModal: React.Dispatch<React.SetStateAction<boolean>>,
    eventType: string,
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


const EventModal = ({ openEventModal, setOpenEventModal, eventType, editData, fetchRecords, isRefresh }: EventModalInterface) => {

    const [form] = Form.useForm();
    const { successMsg, errorMsg, contextHolder } = useMessage();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any>([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs());

    const eventSubmitHandler = async (data: any) => {

        setLoading(true);
        const { imageUrl, eventDate, eventTime, ...rest } = data;
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
        const timeMoment = data.eventTime.clone();
        const eventTimeUTC = timeMoment.utc().toISOString();
        payload = {
            ...rest,
            status: eventType == ActionType.add ? eventStatus.UPCOMING : data?.status,
            imageUrl: imageUploadRes?.url || editData?.imageUrl || null,
            eventDate: eventType == ActionType.add ? startDate.toISOString() : startDate,
            eventTime: eventTimeUTC,
        };

        try {
            if (eventType == ActionType.add) {

                let res: any = await apiClient.post("/event/create", payload);
                if (res?.success) {
                    successMsg('Event Created Successfully!')
                }
            } else {
                let res: any = await apiClient.put(`/event/update/${editData.id}`, payload);
                if (res?.success) {
                    successMsg('Event Updated Successfully!')
                }
            }
            form.resetFields()
            setOpenEventModal(false);
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
                title: editData.title,
                description: editData.description,
                eventDate: moment.utc(editData.eventDate).local(),
                eventTime: moment.utc(editData.eventTime).local(),
                location: editData.location,
                imageUrl: imageFileList,
                status: editData.status
            });

            setFileList(imageFileList); // ✅ keep Upload in sync
            setStartDate(editData.eventDate)
            // setStartTime(dayjs.utc(editData.eventTime).local());
        }
    }, [editData, form]);

    console.log(startTime)

    return (
        <>
            {contextHolder}
            <Modal
                title={eventType == ActionType.add ? 'Add Event' : 'Edit Event'}
                centered
                onCancel={() => {
                    setOpenEventModal(false);
                    form.resetFields()
                }}
                open={openEventModal}
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
                    onFinish={eventSubmitHandler}
                    initialValues={{ variant: 'filled' }}
                    className='flex items-center justify-center'>
                    <Row className='w-full' justify={'space-between'}>
                        <Col md={8}>
                            <Form.Item label="Event Name" name="title" rules={[{ required: true, message: 'Please input!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col md={7}>
                            <Form.Item
                                label="Event Date"
                                name="eventDate"
                                rules={[{ required: true, message: 'Please input!' }]}
                            >
                                <DatePicker defaultPickerValue={dayjs(new Date())} value={startDate} onChange={(date) => setStartDate(date)} className='w-full' format={'YYYY-MM-DD'} />
                            </Form.Item>
                        </Col>

                        <Col md={7}>
                            <Form.Item
                                label="Event Time"
                                name="eventTime"
                                rules={[{ required: true, message: 'Please input!' }]}
                            // valuePropName="value" // important when using state

                            >
                                <TimePicker
                                    // value={startTime ? dayjs(startTime) : null}  // convert to Dayjs
                                    // onChange={(time) => setStartTime(time)}
                                    use12Hours className='w-full' format={'hh:mm A'} />
                            </Form.Item>
                        </Col>


                        <Col span={24}>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>

                        <Col md={11}>
                            <Form.Item label="Event Location" name="location" rules={[{ required: true, message: 'Please input!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col md={11}>
                            <Form.Item
                                label="Event status"
                                name="status"
                                getValueProps={(value) => ({ value })} // ✅ ensures value is kept
                                preserve
                            >
                                <Select
                                    disabled={eventType == ActionType.add}
                                    defaultValue={eventStatus.UPCOMING}
                                    options={[
                                        {
                                            label: 'Upcoming',
                                            value: eventStatus.UPCOMING
                                        },
                                        {
                                            label: 'Completed',
                                            value: eventStatus.COMPLETED
                                        },
                                        {
                                            label: 'Cancelled',
                                            value: eventStatus.CANCELLED
                                        },
                                    ]} />
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
                                    {eventType == ActionType.add ? 'Create Event' : 'Edit Event'}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default EventModal