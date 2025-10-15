'use client';
import AboutContainer from '@/components/about-container'
import CustomTable from '@/components/table';
import { apiClient } from '@/Utils/apiClient';
import { Avatar, Button, Col, Row, TableColumnsType } from 'antd'
import moment from 'moment';
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

const CaseStudies = () => {

  const [isRefresh, setIsRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caseStudiesRecords, setCaseStudiesRecords] = useState([]);
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
        title: 'Title',
        dataIndex: 'title',
        render: ((text, record) => {
          return (
            <span title={text}>{text.slice(0, 30) + '...'}</span>
          )
        })
      },
      {
        title: 'Client Name',
        dataIndex: 'clientName',
        render: ((text, record) => {
          return (
            <span title={text}>{text.slice(0, 40) + '...'}</span>
          )
        })
      },
      {
        title: 'Description',
        dataIndex: 'description',
        render: ((text, record) => {
          return (
            <span title={text}>{text.slice(0, 30) + '...'}</span>
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
        let res: any = await apiClient.get(`/casestudy/getAllCaseStudies`);
        if (res?.success) {
          setCaseStudiesRecords(res.data)
        }
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    })()
  }, [isRefresh])

  // for creating case study
  const caseStudyCreateBtnHandler = () => {
    router.push('/casestudies/create')
  }

  // for editing case study
  const rowEditHandler = (record: any) => {
    localStorage.setItem('caseStudyRecord', JSON.stringify(record))
    router.push(`/casestudies/${record.id}`)
  }


  return (
    <Row gutter={[16, 22]} className=''>
      <Col span={24}>
        <AboutContainer
          heading='Case Studies'
          btnText='Create Case Study'
          btnClickHandler={caseStudyCreateBtnHandler}
        />
      </Col>
      <Col span={24}>
        <CustomTable
          columns={columns}
          dataSource={caseStudiesRecords}
          uniqueKey={(record: any) => record.id}
          isLoading={loading}
        />
      </Col>
    </Row>
  )
}

export default CaseStudies