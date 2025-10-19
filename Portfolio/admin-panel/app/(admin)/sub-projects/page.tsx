'use client';
import AboutContainer from '@/components/about-container'
import CustomTable from '@/components/table';
import { Avatar, Button, Col, Row, TableColumnsType } from 'antd'
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import SecondLayerProjectModal from './secondlayerprojectmodal';
import { useRouter } from 'next/navigation';
import { ActionType, ParentLayerProjectsMapping } from '@/Utils/constants';
import { apiClient } from '@/Utils/apiClient';
import { IoMdEye } from "react-icons/io";


const Projects = () => {

    const [subProjectsRecords, setSubProjectsRecords] = useState([]);
    const [rowRecord, setRowRecord] = useState<null | any>(null);
    const [openProjectModal, setOpenProjectModal] = useState(false);
    const [modalState, setModalState] = useState('');
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
                title: 'Parent Category',
                dataIndex: 'mainCategoryId',
                render: ((text, record) => {
                    return (
                        <span title={ParentLayerProjectsMapping[text]}>{ParentLayerProjectsMapping[text]}</span>
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
                            <Avatar style={{ background: '#E5E7EB', padding: '3px' }} icon={<IoMdEye color='#3797BC' size={30} className='cursor-pointer' onClick={() => projectsHandler(record)} />} />
                        </div>

                    )
                })
            },
        ]
    ), [])

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                let res: any = await apiClient.get(`/project/sub-project/getAllSubProjects`);
                if (res?.success) {
                    setSubProjectsRecords(res.data)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [isRefresh])

    const subProjectCreateBtnHandler = () => {
        setOpenProjectModal(true);
        setModalState(ActionType.add)
    }

    const rowEditHandler = (record: any) => {
        setRowRecord(null)  // reset first
        setTimeout(() => {   // let React re-render
            setOpenProjectModal(true);
            setModalState(ActionType.edit)
            setRowRecord(record);
        }, 0);
    }

    const projectsHandler = (record: any) => {
        router.push(`sub-projects/projects/${record?.id}`)
    }


    return (
        <Row gutter={[16, 22]} className=''>
            <Col span={24}>
                <AboutContainer
                    heading='Sub Projects'
                    btnText='Create Sub Project'
                    btnClickHandler={subProjectCreateBtnHandler}
                />
            </Col>

            <Col span={24}>
                <CustomTable
                    columns={columns}
                    dataSource={subProjectsRecords}
                    uniqueKey={(record: any) => record.id}
                    isLoading={loading}
                />
            </Col>

            <SecondLayerProjectModal
                openProjectModal={openProjectModal}
                setOpenProjectModal={setOpenProjectModal}
                projectType={modalState}
                editData={rowRecord}
                fetchRecords={setIsRefresh}
                isRefresh={isRefresh}
                key={rowRecord?.id} // 👈 force remount when record changes
            />
        </Row>
    )
}

export default Projects