"use client"

import { Table } from 'antd'
import React from 'react'

interface CustomTableInterface {
    columns: any,
    dataSource: any,
    onRowClick?: any,
    isLoading: boolean,
    uniqueKey: any
}

const CustomTable = ({ columns, dataSource, onRowClick, isLoading, uniqueKey }: CustomTableInterface) => {


    return (
        <>
            <Table<any>
                columns={columns}
                dataSource={dataSource}
                onRow={onRowClick}
                loading={isLoading}
                rowKey={uniqueKey} // 👈 the field in your data that’s unique for each record
            />
        </>
    )
}

export default CustomTable