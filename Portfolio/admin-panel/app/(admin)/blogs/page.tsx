'use client';
import AboutContainer from '@/components/about-container'
import CustomTable from '@/components/table';
import { apiClient } from '@/Utils/apiClient';
import { Avatar, Button, Col, Row, TableColumnsType } from 'antd'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'

const Blogs = () => {

    const [isRefresh, setIsRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [blogRecords, setBlogRecords] = useState([]);
    const router = useRouter();

    const columns: TableColumnsType<any> = useMemo(() => (
        [
            {
                title: 'Image',
                dataIndex: 'previewImageUrl',
                render: ((text, record) => {
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
                dataIndex: 'previewHeading',
                render: ((text, record) => {
                    return (
                        <span title={text}>{text.slice(0, 50) + '...'}</span>
                    )
                })
            },
            {
                title: 'Date',
                dataIndex: 'updatedAt',
                render: ((text, record) => {
                    return (
                        <span>{moment.utc(text).local().format('YYYY-MM-DD') as any}</span>
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
                let res: any = await apiClient.get(`/blog/getAllBlogs`);
                if (res?.success) {
                    setBlogRecords(res.data)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [isRefresh])


    // for creating blog
    const blogCreateBtnHandler = () => {
        router.push('/blog/create')
    }

    // for editing blog
    const rowEditHandler = (record: any) => {
        localStorage.setItem('blogRecord', JSON.stringify(record))
        router.push(`/blog/${record.id}`)
    }

    return (
        <Row gutter={[16, 22]} className=''>
            <Col span={24}>
                <AboutContainer
                    heading='Blogs'
                    btnText='Create Blog'
                    btnClickHandler={blogCreateBtnHandler}
                />
            </Col>
            <Col span={24}>
                <CustomTable
                    columns={columns}
                    dataSource={blogRecords}
                    uniqueKey={(record: any) => record.id}
                    isLoading={loading}
                />
            </Col>
        </Row>
    )
}

export default Blogs