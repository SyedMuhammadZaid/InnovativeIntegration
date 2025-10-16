'use client';
import AboutContainer from '@/components/about-container'
import CustomTable from '@/components/table';
import { Avatar, Button, Col, Row, TableColumnsType } from 'antd'
import moment from 'moment';
import React, { useMemo, useState } from 'react'
import SecondLayerProjectModal from './secondlayerprojectmodal';
import { useRouter } from 'next/navigation';
import { ActionType } from '@/Utils/constants';

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
                        <span title={text}>{text.slice(0, 14) + '...'}</span>
                    )
                })
            },
            {
                title: 'Parent Category',
                dataIndex: 'projectMainCategory',
                render: ((text, record) => {
                    return (
                        <span title={text}>{record?.name.slice(0, 14) + '...'}</span>
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

    const subProjectCreateBtnHandler = () => {
        setOpenProjectModal(true);
        setModalState(ActionType.add)
    }

    const rowEditHandler = (record: any) => { }

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