"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Button, Col, Row, TableColumnsType, Tag } from 'antd';
import AboutContainer from '@/components/about-container';
import CustomTable from '@/components/table';
import EventModal from './eventModal';
import { ActionType } from '@/Utils/constants';
import { apiClient } from '@/Utils/apiClient';
import Image from 'next/image';
import moment from 'moment';
import { eventStatus } from '@innovative-integration/shared';
import { useRouter } from 'next/navigation';

const Events = () => {

    const [rowRecord, setRowRecord] = useState<null | any>(null);
    const [openEventModal, setOpenEventModal] = useState(false);
    const [modalState, setModalState] = useState('');
    const [isRefresh, setIsRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [eventRecords, setEventRecords] = useState([]);
    const router = useRouter();


    const columns: TableColumnsType<any> = useMemo(() => (
        [
            {
                title: 'Image',
                dataIndex: 'imageUrl',
                render: ((text, record) => {
                    console.log(`image url complete: ${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${text}`)
                    return (
                        <Avatar
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${text}`}
                            alt='eventImage'
                            shape='square'
                            style={{ width: '60px', height: '60px' }}
                        />
                    )
                })
            },
            {
                title: 'Title',
                dataIndex: 'title',
                render: ((text, record) => {
                    return (
                        <span title={text}>{text.slice(0, 14) + '...'}</span>
                    )
                })
            },
            {
                title: 'Desc',
                dataIndex: 'description',
                render: ((text, record) => {
                    return (
                        <span title={text}>{text.slice(0, 14) + '...'}</span>
                    )
                })
            },
            {
                title: 'Date',
                dataIndex: 'eventDate',
                render: ((text, record) => {
                    return (
                        <span>{moment.utc(text).local().format('YYYY-MM-DD') as any}</span>
                    )
                })

            },
            {
                title: 'Time',
                dataIndex: 'eventTime',
                render: ((text, record) => {
                    return (
                        <span>{moment.utc(text).local().format('hh:mm A') as any}</span>
                    )
                })
            },
            {
                title: 'Location',
                dataIndex: 'location',
                render: ((text, record) => {
                    return (
                        <span title={text}>{text.slice(0, 14) + '...'}</span>
                    )
                })
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render: ((text, record) => {
                    return (
                        <Tag color={text == 'COMPLETED' ? "#87d068" : text == 'CANCELLED' ? "#f50" : "#2db7f5"}>{text}</Tag>
                    )
                })
            },
            {
                title: 'Action',
                dataIndex: '',
                render: ((text, record) => {
                    return (
                        <Button type="primary" className='primary-btn' size='large' onClick={() => rowEditHandler(record)}>
                            Edit
                        </Button>
                    )
                })
            },
        ]
    ), [])


    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                let res: any = await apiClient.get(`/event/getAllEvents`);
                if (res?.success) {
                    setEventRecords(res.data)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [isRefresh])

    useEffect(() => {
        if (rowRecord) {
            // check the status of event if UPCOMING then we need to open a modal or else tiptap screen.
            if (rowRecord.status == eventStatus.UPCOMING || rowRecord.status == eventStatus.CANCELLED) {
                setOpenEventModal(true)
                setModalState(ActionType.edit)
            }
            else {
                localStorage.setItem('eventRecord', JSON.stringify(rowRecord))
                router.push(`/events/${rowRecord.id}`)
            }

        }
    }, [rowRecord])

    const eventCreateBtnHandler = () => {
        setOpenEventModal(true)
        setModalState(ActionType.add)
    }

    const rowEditHandler = (record: any) => {
        setRowRecord(null)  // reset first
        setTimeout(() => {          // let React re-render
            setRowRecord(record);
        }, 0);
    }

    return (
        <Row gutter={[16, 22]} className=''>
            <Col span={24}>
                <AboutContainer
                    heading='Events'
                    btnText='Create Event'
                    btnClickHandler={eventCreateBtnHandler}
                />
            </Col>
            <Col span={24}>
                <CustomTable
                    columns={columns}
                    dataSource={eventRecords}
                    uniqueKey={(record: any) => record.id}
                    isLoading={loading}
                />
            </Col>

            <EventModal
                openEventModal={openEventModal}
                setOpenEventModal={setOpenEventModal}
                eventType={modalState}
                editData={rowRecord}
                fetchRecords={setIsRefresh}
                isRefresh={isRefresh}
                key={rowRecord?.id} // 👈 force remount when record changes
            />
        </Row>
    );
};

export default Events;
