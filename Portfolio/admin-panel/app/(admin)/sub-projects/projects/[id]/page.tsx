'use client';
import AboutContainer from '@/components/about-container';
import CustomTable from '@/components/table';
import { apiClient } from '@/Utils/apiClient';
import { Avatar, Button, Col, Row, TableColumnsType } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'

const ProjectsListing = ({ params }: { params: { id: string } }) => {

    const { id } = params;

    const [projectsRecords, setProjectsRecords] = useState([]);
    const [rowRecord, setRowRecord] = useState<null | any>(null);
    const [isRefresh, setIsRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const columns: TableColumnsType<any> = useMemo(() => (
        [
            {
                title: 'Image',
                dataIndex: 'imageUrl',
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
                title: 'Name',
                dataIndex: 'name',
                render: ((text, record) => {
                    return (
                        <span title={text}>{text.slice(0, 35) + '...'}</span>
                    )
                })
            },
            {
                title: 'Sub-Project',
                dataIndex: 'projectSubCategory',
                render: ((text, record) => {
                    return (
                        <span title={record?.projectSubCategory?.name}>{record?.projectSubCategory?.name.slice(0, 35) + '...'}</span>
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
                        <div className='flex items-center gap-5'>
                            <Button type="primary" className='primary-btn' size='large' onClick={() => rowEditHandler(record)}>
                                Edit
                            </Button>
                        </div>
                    )
                })
            },
        ]
    ), [])

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    setLoading(true)
                    let res: any = await apiClient.get(`/project/getProjectsBySubProjectId/${id}`);
                    if (res?.success) {
                        setProjectsRecords(res.data)
                    }
                } catch (error) {
                    console.log(error)
                }
                finally {
                    setLoading(false)
                }
            })()
        }
    }, [id])

    const projectCreateBtnHandler = () => {
        router.push(`/sub-projects/projects/${id}/create`);
    }

    // for editing case study
    const rowEditHandler = (record: any) => {
        localStorage.setItem('projectRecord', JSON.stringify(record))
        router.push(`/sub-projects/projects/${id}/update/${record.id}`)
    }


    const backHandler = () => {
        router.push('/sub-projects')
    }

    return (
        <Row gutter={[16, 22]} className=''>
            <Col span={24}>
                <AboutContainer
                    heading='Projects'
                    btnText='Create Project'
                    btnClickHandler={projectCreateBtnHandler}
                    backHandler={backHandler}
                />
            </Col>

            <Col span={24}>
                <CustomTable
                    columns={columns}
                    dataSource={projectsRecords}
                    uniqueKey={(record: any) => record.id}
                    isLoading={loading}
                />
            </Col>
        </Row>
    )
}

export default ProjectsListing