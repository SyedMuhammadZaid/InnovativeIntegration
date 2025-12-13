'use client';
import AboutContainer from '@/components/about-container'
import CustomTable from '@/components/table';
import { apiClient } from '@/Utils/apiClient';
import { Button, Col, Row, TableColumnsType } from 'antd'
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import CareerModal from './careerModal'
import { ActionType } from '@/Utils/constants';
import { useRouter } from 'next/navigation';

const Careers = () => {

  const [loading, setLoading] = useState(false);
  const [careersRecords, setCareersRecords] = useState([]);
  const [rowRecord, setRowRecord] = useState<null | any>(null);
  const [openCareerModal, setOpenCareerModal] = useState(false);
  const [modalState, setModalState] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();


  const columns: TableColumnsType<any> = useMemo(() => (
    [
      {
        title: 'Title',
        dataIndex: 'title',
        render: ((text, record) => {
          return (
            <span title={text}>{text.slice(0, 30) + '...'}</span>
          )
        })
      },
      {
        title: 'Tagline',
        dataIndex: 'tagline',
        render: ((text, record) => {
          return (
            <span title={text}>{text.slice(0, 50) + '...'}</span>
          )
        })
      },
      {
        title: 'Description',
        dataIndex: 'description',
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
            <div className='flex gap-3'>
              <Button type="primary" className='primary-btn' size='large' onClick={() => rowEditHandler(record)}>
                Edit
              </Button>
              <Button type="primary" className='primary-btn bg-red-500!' size='large' onClick={() => rowDeleteHandler(record)}>
                Delete
              </Button>
            </div>
          )
        })
      },
    ]
  ), [isRefresh])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        let res: any = await apiClient.get(`/career/getAllCareers`);
        if (res?.success) {
          setCareersRecords(res.data)
        }
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    })()
  }, [isRefresh])


  const jobCreateBtnHandler = () => {
    setOpenCareerModal(true)
    setModalState(ActionType.add)
  }

  const rowEditHandler = (record: any) => {
    setRowRecord(null)  // reset first
    setTimeout(() => {          // let React re-render
      setRowRecord(record);
      setOpenCareerModal(true)
      setModalState(ActionType.edit)
    }, 0);
  }

  const rowDeleteHandler = async (record: any) => {
    try {
      setLoading(true)
      let res: any = await apiClient.delete(`/career/delete/${record?.id}`);
      if (res?.success) {
        setIsRefresh(!isRefresh)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  const backHandler = () => {
    router.push('/home')
  }


  return (
    <Row gutter={[16, 22]} className=''>
      <Col span={24}>
        <AboutContainer
          heading='Careers'
          btnText='Create Job'
          btnClickHandler={jobCreateBtnHandler}
          backHandler={backHandler}
        />
      </Col>
      <Col span={24}>
        <CustomTable
          columns={columns}
          dataSource={careersRecords}
          uniqueKey={(record: any) => record.id}
          isLoading={loading}
        />
      </Col>

      <CareerModal
        openCareerModal={openCareerModal}
        setOpenCareerModal={setOpenCareerModal}
        careerType={modalState}
        editData={rowRecord}
        fetchRecords={setIsRefresh}
        isRefresh={isRefresh}
        key={rowRecord?.id} // 👈 force remount when record changes
      />
    </Row>
  )
}

export default Careers