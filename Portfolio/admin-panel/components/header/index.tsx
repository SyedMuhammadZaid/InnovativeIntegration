import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react'


const CustomHeader = () => {
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: '#3797BC'
      }}
    >
      <div className="demo-logo" />
    </Header>
  )
}

export default CustomHeader