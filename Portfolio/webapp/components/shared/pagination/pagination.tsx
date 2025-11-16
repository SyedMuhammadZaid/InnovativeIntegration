import React from 'react';
import { Pagination } from 'antd';

function CustomPagination({ current, total, pageSize, align, paginationChange }: { current: number, total: number, pageSize?: number, align?: "end" | "start" | "center", paginationChange: ((page: number, pageSize: number) => void) | undefined }) { return <Pagination pageSize={pageSize || 10} current={current} defaultCurrent={1} total={total} align={align || "end"} onChange={paginationChange} /> }

export default CustomPagination;